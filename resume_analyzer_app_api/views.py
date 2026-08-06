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


# Imports Needed For Resume Upload Request Validation
import uuid
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Resume
from .serializers import ResumeUploadRequestSerializer
from .services.s3_service import generate_resume_upload

# Imports Needed For Resume Upload Completion Validation
from django.shortcuts import get_object_or_404
from django.utils import timezone
from .serializers import (
    ResumeUploadCompleteSerializer,
)
from .services.s3_service import (
    resume_object_exists,
)



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



class ResumeUploadRequestView(
    generics.GenericAPIView
):

    serializer_class = (
        ResumeUploadRequestSerializer
    )

    permission_classes = [
        IsAuthenticated,
    ]


    def post(self, request):

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        filename = (
            serializer.validated_data["filename"]
        )

        content_type = (
            serializer.validated_data["content_type"]
        )

        file_size = (
            serializer.validated_data["file_size"]
        )

        extension = (
            serializer.validated_data["extension"]
        )


        resume_public_id = uuid.uuid4()

        upload_prefix = (
            settings.AWS_S3_UPLOAD_PREFIX.strip("/")
        )

        s3_key = (
            f"{upload_prefix}/"
            f"{request.user.id}/"
            f"{resume_public_id}/"
            f"original{extension}"
        )


        try:

            presigned_post = generate_resume_upload(
                s3_key=s3_key,
                content_type=content_type,
            )

        except RuntimeError:

            return Response(
                {
                    "detail": (
                        "The upload service is currently "
                        "unavailable. Please try again."
                    )
                },
                status=(
                    status.HTTP_503_SERVICE_UNAVAILABLE
                ),
            )


        resume = Resume.objects.create(
            public_id=resume_public_id,
            owner=request.user,
            original_filename=filename,
            s3_key=s3_key,
            content_type=content_type,
            file_size=file_size,
            status=Resume.Status.PENDING_UPLOAD,
        )


        return Response(
            {
                "resume_id": str(
                    resume.public_id
                ),

                "status": resume.status,

                "upload": {
                    "url": presigned_post["url"],
                    "fields": presigned_post["fields"],
                    "expires_in": (
                        settings
                        .RESUME_UPLOAD_URL_EXPIRATION
                    ),
                },
            },
            status=status.HTTP_201_CREATED,
        )




class ResumeUploadCompleteView(
    generics.GenericAPIView
):
    serializer_class = (
        ResumeUploadCompleteSerializer
    )

    permission_classes = [
        IsAuthenticated,
    ]

    def post(self, request):
        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        resume_id = (
            serializer.validated_data["resume_id"]
        )

        resume = get_object_or_404(
            Resume,
            public_id=resume_id,
            owner=request.user,
        )

        if (
            resume.status != Resume.Status.PENDING_UPLOAD
        ):
            return Response(
                {
                    "detail": (
                        "This résumé is not waiting "
                        "for an upload."
                    )
                },
                status=status.HTTP_409_CONFLICT,
            )

        try:
            object_exists = resume_object_exists(
                s3_key=resume.s3_key
            )

        except RuntimeError:
            return Response(
                {
                    "detail": (
                        "The upload could not be "
                        "verified. Please try again."
                    )
                },
                status=(
                    status.HTTP_503_SERVICE_UNAVAILABLE
                ),
            )

        if not object_exists:
            return Response(
                {
                    "detail": (
                        "The résumé file was not found "
                        "in storage."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        resume.status = Resume.Status.UPLOADED
        resume.uploaded_at = timezone.now()

        resume.save(
            update_fields=[
                "status",
                "uploaded_at",
                "updated_at",
            ]
        )

        return Response(
            {
                "resume_id": str(
                    resume.public_id
                ),
                "status": resume.status,
                "uploaded_at": (
                    resume.uploaded_at
                ),
            },
            status=status.HTTP_200_OK,
        )