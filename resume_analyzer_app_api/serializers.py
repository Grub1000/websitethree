from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from .models import User
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer
)

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
    password = serializers.CharField( write_only=True ) 




    class Meta: 
        model = User 

        fields = [ "username", 
                  "email", 
                  "password", 
        ] 

    def create(self, validated_data): 

        user = User.objects.create_user( 
            username=validated_data["username"], 
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


from google.oauth2 import id_token
from google.auth.transport import requests

from rest_framework_simplejwt.tokens import RefreshToken

# from django.contrib.auth import get_user_model


# User = get_user_model()


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