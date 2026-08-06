import token

from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from .models import User
from .models import PasswordResetToken
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer
)

from google.oauth2 import id_token
from google.auth.transport import requests

from rest_framework_simplejwt.tokens import RefreshToken

# Imports Needed For Password Reset Implementation of Token Expirations and Email Handling.
from django.utils import timezone
from datetime import timedelta
from .utils import send_password_reset_email

# Imports Needed For Resume Upload Request Validation
from pathlib import Path
from django.conf import settings

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
        ]



class RegisterSerializer(serializers.ModelSerializer): 
    password = serializers.CharField( write_only=True, min_length=8)  # Sets a minimum length for the password of 8 characters

    class Meta: 
        model = User 
        fields = [   
            "email", 
            "password", 
        ] 

    def create(self, validated_data): 

        username_base = validated_data["email"].split("@")[0]
        username = username_base
        counter = 1

        while User.objects.filter(username=username).exists():
            username = (
                f"{username_base}{counter}"
            )
            counter += 1

        user = User.objects.create_user( 
            username=username, 
            email=validated_data["email"], 
            password=validated_data["password"], 
        ) 
        
        return user


class CustomEmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    email = serializers.EmailField()

    # def post(self, request, *args, **kwargs):
    #     print("CUSTOM LOGIN VIEW HIT")
    #     return super().post(request, *args, **kwargs)
    
    def __init__(self, *args, **kwargs):

        super().__init__(*args, **kwargs)

        self.fields.pop(
            "username",
            None
        )
    def validate(self, attrs):

        email = attrs.get("email")
        password = attrs.get("password")


        try:

            user = User.objects.get(
                email=email
            )

        except User.DoesNotExist:

            raise serializers.ValidationError(
                "Invalid email or password"
            )


        user = authenticate(
            username=user.username,
            password=password
        )


        if user is None:

            raise serializers.ValidationError(
                "Invalid email or password"
            )


        self.user = user


        refresh = self.get_token(user)


        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }


class GoogleLoginSerializer(serializers.Serializer):

    credential = serializers.CharField()


    def validate(self, attrs):

        credential = attrs["credential"]

        try:
            google_user = id_token.verify_oauth2_token(
                credential,
                requests.Request(),
            )

        except Exception:
            raise serializers.ValidationError(
                "Invalid Google credential"
            )


        email = google_user.get("email")
        first_name = google_user.get("given_name", "")
        last_name = google_user.get("family_name", "")


        if not email:
            raise serializers.ValidationError(
                "Google account has no email"
            )


        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                "username": email.split("@")[0],
                "first_name": first_name,
                "last_name": last_name,
            }
        )


        refresh = RefreshToken.for_user(user)


        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }


class ForgotPasswordSerializer(serializers.Serializer): 
    email = serializers.EmailField() 
    def save(self): 
        email = self.validated_data["email"] 
        try: 
            user = User.objects.get(email=email) 
        except User.DoesNotExist: 
            # Always return successfully so attackers 
            # cannot determine whether an email exists. 
            return None
        PasswordResetToken.objects.filter( user=user, used=False, ).delete()
        token = PasswordResetToken.objects.create( user=user, expires_at=( timezone.now() + timedelta(hours=1) ))
        send_password_reset_email(user, token) # Email the user with the reset link
        return token

class ResetPasswordSerializer(serializers.Serializer): 
    token = serializers.UUIDField() 
    password = serializers.CharField( write_only=True, min_length=8, ) 
    
    def save(self): 
        token_value = self.validated_data["token"] 
        password = self.validated_data["password"] 

        try: 
            reset_token = PasswordResetToken.objects.get( token=token_value, ) 
        except PasswordResetToken.DoesNotExist: 
            raise serializers.ValidationError( { "token": "Invalid password reset token." } ) 

        if reset_token.used: 
            raise serializers.ValidationError( { "token": "This password reset token has already been used." } ) 

        if reset_token.expires_at < timezone.now(): 
            raise serializers.ValidationError( { "token": "This password reset token has expired." } ) 

        user = reset_token.user 
        user.set_password( password ) 
        user.save() 
        reset_token.used = True 
        reset_token.save() 

        return user





class ResumeUploadRequestSerializer(serializers.Serializer):

    filename = serializers.CharField(
        max_length=255,
    )

    content_type = serializers.CharField(
        max_length=100,
    )

    file_size = serializers.IntegerField(
        min_value=1,
    )


    def validate_filename(self, value):

        # Remove any directory information supplied by the browser.
        clean_filename = Path(value).name.strip()

        if not clean_filename:
            raise serializers.ValidationError(
                "A valid filename is required."
            )

        return clean_filename


    def validate_file_size(self, value):

        if value > settings.RESUME_MAX_FILE_SIZE:
            max_size_mb = (
                settings.RESUME_MAX_FILE_SIZE
                // (1024 * 1024)
            )

            raise serializers.ValidationError(
                f"Résumé files cannot exceed {max_size_mb} MB."
            )

        return value


    def validate(self, attrs):

        filename = attrs["filename"]
        content_type = attrs["content_type"]

        expected_extension = (
            settings.RESUME_ALLOWED_CONTENT_TYPES.get(
                content_type
            )
        )

        if expected_extension is None:
            raise serializers.ValidationError(
                {
                    "content_type": (
                        "Only PDF and DOCX résumé files "
                        "are currently supported."
                    )
                }
            )

        actual_extension = (
            Path(filename).suffix.lower()
        )

        if actual_extension != expected_extension:
            raise serializers.ValidationError(
                {
                    "filename": (
                        "The filename extension does not "
                        "match the submitted content type."
                    )
                }
            )

        attrs["extension"] = expected_extension

        return attrs


class ResumeUploadCompleteSerializer(
    serializers.Serializer
):
    resume_id = serializers.UUIDField()