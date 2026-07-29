from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from .models import User
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer
)

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


User = get_user_model()

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