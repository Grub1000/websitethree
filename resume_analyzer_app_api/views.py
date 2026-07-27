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

class CurrentUserView(generics.RetrieveAPIView): 
    serializer_class = UserSerializer 
    permission_classes = [ IsAuthenticated ] 

    def get_object(self): 
        return self.request.user

class RegisterView(generics.CreateAPIView): 
    serializer_class = RegisterSerializer 
    permission_classes = [ AllowAny ]