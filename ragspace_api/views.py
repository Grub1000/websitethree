# Imports Needed For Multiple Views
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated


# Imports Needed for KnowledgeBase ViewSet
from .models import KnowledgeBase
from .serializers import KnowledgeBaseSerializer


# Imports Needed for Document ViewSet
from .models import Document
from .serializers import DocumentSerializer
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from .services.s3_service import (
    generate_presigned_upload,
    verify_uploaded_object,
)




class KnowledgeBaseViewSet(viewsets.ModelViewSet):
    serializer_class = KnowledgeBaseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return KnowledgeBase.objects.filter(
            user=self.request.user
        ).order_by("-updated_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)










class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            Document.objects
            .filter(user=self.request.user)
            .select_related("knowledge_base")
            .order_by("-created_at")
        )

    @action(detail=False, methods=["post"])
    def presign(self, request):
        knowledge_base_id = request.data.get("knowledge_base")
        filename = request.data.get("filename")
        content_type = request.data.get("content_type")
        file_size = request.data.get("file_size")

        if not all([
            knowledge_base_id,
            filename,
            content_type,
            file_size,
        ]):
            return Response(
                {"detail": "Missing required upload information."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            file_size = int(file_size)
        except (TypeError, ValueError):
            return Response(
                {"detail": "Invalid file size."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if file_size > 10 * 1024 * 1024:
            return Response(
                {"detail": "PDF files cannot exceed 10 MB."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not filename.lower().endswith(".pdf"):
            return Response(
                {"detail": "Only PDF files are supported."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if content_type != "application/pdf":
            return Response(
                {"detail": "Invalid content type."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            knowledge_base = KnowledgeBase.objects.get(
                id=knowledge_base_id,
                user=request.user,
            )
        except KnowledgeBase.DoesNotExist:
            return Response(
                {"detail": "Space not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        presigned = generate_presigned_upload(
            user_id=request.user.id,
            knowledge_base_id=knowledge_base.id,
            filename=filename,
            content_type=content_type,
        )

        document = Document.objects.create(
            user=request.user,
            knowledge_base=knowledge_base,
            filename=filename,
            s3_key=presigned["s3_key"],
            file_size=file_size,
            status=Document.Status.UPLOADING,
        )

        return Response(
            {
                "document_id": document.id,
                "upload_url": presigned["upload_url"],
                "s3_key": document.s3_key,
            },
            status=status.HTTP_201_CREATED,
        )

    @action(detail=True, methods=["post"])
    def complete(self, request, pk=None):
        document = self.get_object()

        try:
            s3_object = verify_uploaded_object(document.s3_key)
        except Exception:
            return Response(
                {"detail": "Uploaded file could not be verified in S3."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        actual_size = s3_object.get("ContentLength", 0)
        actual_content_type = s3_object.get("ContentType")

        if actual_size != document.file_size:
            document.status = Document.Status.FAILED
            document.save(update_fields=["status", "updated_at"])

            return Response(
                {"detail": "Uploaded file size does not match expected size."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if actual_content_type != "application/pdf":
            document.status = Document.Status.FAILED
            document.save(update_fields=["status", "updated_at"])

            return Response(
                {"detail": "Uploaded object is not a valid PDF content type."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        document.status = Document.Status.PROCESSING
        document.save(
            update_fields=[
                "status",
                "updated_at",
            ]
        )

        return Response(
            DocumentSerializer(document).data,
            status=status.HTTP_200_OK,
        )
