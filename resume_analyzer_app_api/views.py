from django.db.migrations import serializer
from django.shortcuts import render
# Create your views here.
from rest_framework import viewsets
from .models import User
# from .serializers import  UserSerializer

from rest_framework import generics 
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer

from rest_framework.permissions import IsAuthenticated 
from .serializers import UserSerializer 

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomEmailTokenObtainPairSerializer

from .serializers import GoogleLoginSerializer

# Imports Needed For Forgot-Password-Reset Implementation
from .serializers import ForgotPasswordSerializer
from rest_framework import status
from .serializers import ResetPasswordSerializer

from rest_framework.response import Response

class CurrentUserView(generics.RetrieveAPIView): 
    serializer_class = UserSerializer 
    permission_classes = [ IsAuthenticated ] 

    def get_object(self): 
        return self.request.user
    
class CustomEmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomEmailTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView): 
    serializer_class = RegisterSerializer 
    permission_classes = [ AllowAny ]

class GoogleLoginView(generics.GenericAPIView):

    serializer_class = GoogleLoginSerializer

    permission_classes = [
        AllowAny
    ]

    def post(self, request):

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        return Response(
            serializer.validated_data
        )

class ForgotPasswordView(generics.GenericAPIView): 
    serializer_class = ForgotPasswordSerializer 
    permission_classes = [ AllowAny ] 

    def post(self, request): 
        serializer = self.get_serializer( data=request.data ) 
        serializer.is_valid( raise_exception=True ) 
        serializer.save() 
        return Response( 
            { 
                "message": 
                ( 
                    "If an account exists, " 
                    "a password reset email " 
                    "has been sent." 
                ) 
            },
              status=status.HTTP_200_OK, 
        )

class ResetPasswordView(generics.GenericAPIView): 
    serializer_class = ResetPasswordSerializer 
    permission_classes = [ AllowAny ] 
    
    def post(self, request): 
        serializer = self.get_serializer( data=request.data ) 
        serializer.is_valid( raise_exception=True ) 
        serializer.save() 
        return Response( { "message": "Password has been successfully reset." }, status=status.HTTP_200_OK, )