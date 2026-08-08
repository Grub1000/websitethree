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

# Imports Needed For Resume Text Extraction
from .services.extraction_service import (
    ResumeExtractionError,
    extract_resume_text,
)
from .services.s3_service import download_resume_file

# Imports Needed For Resume Analysis
from .models import ResumeAnalysis
from .serializers import (
    ResumeAnalysisRequestSerializer,
)
from .services.analysis_service import (
    ResumeAnalysisError,
)
from .services.analysis_service import (
    parse_analysis_result,
)

from .services.llm_service import (
    ResumeLLMError,
    analyze_resume_with_llm,
)

# Imports Needed For Resume Thumbnail Generation
from .services.s3_service import (
    upload_resume_thumbnail,
)

from .services.thumbnail_service import (
    ResumeThumbnailError,
    generate_pdf_thumbnail,
)

# Import Needed For Secure Resume Thumbnail Retrieval
from .services.s3_service import (
    generate_presigned_thumbnail_url,
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

class ResumeExtractTextView(generics.GenericAPIView):
    permission_classes = [
        IsAuthenticated,
    ]

    def post(
        self,
        request,
        resume_id,
    ):
        resume = get_object_or_404(
            Resume,
            public_id=resume_id,
            owner=request.user,
        )

        allowed_statuses = {
            Resume.Status.UPLOADED,
            Resume.Status.EXTRACTED,
            Resume.Status.FAILED,
        }

        if resume.status not in allowed_statuses:
            return Response(
                {
                    "detail": (
                        "This résumé is not ready "
                        "for text extraction."
                    ),
                    "current_status": resume.status,
                },
                status=status.HTTP_409_CONFLICT,
            )

        resume.status = Resume.Status.PROCESSING
        resume.extraction_error = ""

        resume.save(
            update_fields=[
                "status",
                "extraction_error",
                "updated_at",
            ]
        )

        try:
            file_buffer = download_resume_file(
                s3_key=resume.s3_key,
            )

            extracted_text = extract_resume_text(
                file_buffer=file_buffer,
                content_type=resume.content_type,
            )

        except (
            RuntimeError,
            ResumeExtractionError,
        ) as error:
            resume.status = Resume.Status.FAILED
            resume.extraction_error = str(error)

            resume.save(
                update_fields=[
                    "status",
                    "extraction_error",
                    "updated_at",
                ]
            )

            return Response(
                {
                    "resume_id": str(
                        resume.public_id
                    ),
                    "status": resume.status,
                    "detail": str(error),
                },
                status=status.HTTP_422_UNPROCESSABLE_ENTITY,
            )

        resume.extracted_text = extracted_text
        resume.extraction_error = ""
        resume.status = Resume.Status.EXTRACTED

        resume.save(
            update_fields=[
                "extracted_text",
                "extraction_error",
                "status",
                "updated_at",
            ]
        )

        return Response(
            {
                "resume_id": str(
                    resume.public_id
                ),
                "status": resume.status,
                "character_count": len(
                    resume.extracted_text
                ),
                "word_count": len(
                    resume.extracted_text.split()
                ),
                "preview": (
                    resume.extracted_text[:500]
                ),
            },
            status=status.HTTP_200_OK,
        )

class ResumeAnalyzeView(
    generics.GenericAPIView
):
    serializer_class = (
        ResumeAnalysisRequestSerializer
    )

    permission_classes = [
        IsAuthenticated,
    ]

    def post(
        self,
        request,
        resume_id,
    ):
        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        resume = get_object_or_404(
            Resume,
            public_id=resume_id,
            owner=request.user,
        )

        if (
            resume.status != Resume.Status.EXTRACTED
        ):
            return Response(
                {
                    "detail": (
                        "This résumé must have "
                        "extracted text before analysis."
                    ),
                    "current_status": resume.status,
                },
                status=status.HTTP_409_CONFLICT,
            )

        analysis = ResumeAnalysis.objects.create(
            resume=resume,

            status=(
                ResumeAnalysis.Status.PENDING
            ),

            job_title=(
                serializer.validated_data.get(
                    "job_title",
                    "",
                )
            ),

            job_description=(
                serializer.validated_data.get(
                    "job_description",
                    "",
                )
            ),
        )
        analysis.status = (ResumeAnalysis.Status.PROCESSING)
        analysis.save(
            update_fields=[
                "status",
            ]
        )

        try:
            llm_result = analyze_resume_with_llm(
                resume_text=resume.extracted_text,

                job_title=analysis.job_title,

                job_description=(
                    analysis.job_description
                ),
            )

            parsed_result = parse_analysis_result(llm_result)

        except (
            ResumeLLMError,
            ResumeAnalysisError,
        ) as error:

            analysis.status = (
                ResumeAnalysis.Status.FAILED
            )

            analysis.error_message = str(error)

            analysis.save(
                update_fields=[
                    "status",
                    "error_message",
                ]
            )

            return Response(
                {
                    "analysis_id": str(
                        analysis.public_id
                    ),

                    "status": analysis.status,

                    "detail": str(error),
                },

                status=(
                    status.HTTP_502_BAD_GATEWAY
                ),
            )
        
        analysis.overall_score = (
            parsed_result.overall_score
        )

        analysis.ats_score = (
            parsed_result.ats_score
        )

        analysis.keyword_score = (
            parsed_result.keyword_score
        )

        analysis.experience_score = (
            parsed_result.experience_score
        )

        analysis.skills_score = (
            parsed_result.skills_score
        )

        analysis.strengths = (
            parsed_result.strengths
        )

        analysis.weaknesses = (
            parsed_result.weaknesses
        )

        analysis.missing_keywords = (
            parsed_result.missing_keywords
        )

        analysis.recommendations = (
            parsed_result.recommendations
        )

        analysis.raw_result = (
            parsed_result.raw_result
        )

        analysis.model_provider = "OpenAI"

        analysis.model_name = (
            settings.OPENAI_RESUME_MODEL
        )

        analysis.prompt_version = "1.0"

        analysis.status = (
            ResumeAnalysis.Status.COMPLETED
        )

        analysis.completed_at = timezone.now()

        analysis.error_message = ""

        analysis.save()

        return Response(
        {
        "analysis_id": str(
            analysis.public_id
        ),

        "resume_id": str(
            resume.public_id
        ),

        "status": analysis.status,

        "scores": {
            "overall": (
                analysis.overall_score
            ),

            "ats": (
                analysis.ats_score
            ),

            "keywords": (
                analysis.keyword_score
            ),

            "experience": (
                analysis.experience_score
            ),

            "skills": (
                analysis.skills_score
            ),
        },

        "strengths": (
            analysis.strengths
        ),

        "weaknesses": (
            analysis.weaknesses
        ),

        "missing_keywords": (
            analysis.missing_keywords
        ),

        "recommendations": (
            analysis.recommendations
        ),
        },

        status=status.HTTP_200_OK,
        )



class ResumeThumbnailView(
    generics.GenericAPIView
):
    permission_classes = [
        IsAuthenticated,
    ]

    def post(
        self,
        request,
        resume_id,
    ):
        resume = get_object_or_404(
            Resume,
            public_id=resume_id,
            owner=request.user,
        )

        if resume.content_type != "application/pdf":
            return Response(
                {
                    "detail": (
                        "Thumbnail generation currently "
                        "supports PDF résumés only."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            file_buffer = download_resume_file(
                s3_key=resume.s3_key,
            )

            pdf_bytes = file_buffer.getvalue()

            thumbnail_bytes = generate_pdf_thumbnail(
                pdf_bytes=pdf_bytes,
            )

            thumbnail_key = (
                f"{settings.AWS_S3_UPLOAD_PREFIX.strip('/')}/"
                f"{request.user.id}/"
                f"{resume.public_id}/"
                f"thumbnail.jpg"
            )

            upload_resume_thumbnail(
                s3_key=thumbnail_key,
                image_bytes=thumbnail_bytes,
            )

        except (
            RuntimeError,
            ResumeThumbnailError,
        ) as error:
            return Response(
                {
                    "detail": str(error),
                },
                status=status.HTTP_422_UNPROCESSABLE_ENTITY,
            )

        resume.thumbnail_s3_key = thumbnail_key

        resume.save(
            update_fields=[
                "thumbnail_s3_key",
                "updated_at",
            ]
        )

        return Response(
            {
                "resume_id": str(resume.public_id),
                "thumbnail_created": True,
            },
            status=status.HTTP_200_OK,
        )


class ResumeThumbnailURLView(
    generics.GenericAPIView
):
    permission_classes = [
        IsAuthenticated,
    ]

    def get(
        self,
        request,
        resume_id,
    ):
        resume = get_object_or_404(
            Resume,
            public_id=resume_id,
            owner=request.user,
        )

        if not resume.thumbnail_s3_key:
            return Response(
                {
                    "detail": (
                        "This résumé does not have "
                        "a thumbnail yet."
                    )
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        try:
            thumbnail_url = (
                generate_presigned_thumbnail_url(
                    s3_key=resume.thumbnail_s3_key,
                    expires_in=300,
                )
            )

        except RuntimeError as error:
            return Response(
                {
                    "detail": str(error),
                },
                status=(
                    status.HTTP_503_SERVICE_UNAVAILABLE
                ),
            )

        return Response(
            {
                "resume_id": str(
                    resume.public_id
                ),
                "thumbnail_url": thumbnail_url,
                "expires_in": 300,
            },
            status=status.HTTP_200_OK,
        )