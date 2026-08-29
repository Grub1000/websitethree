# Imports Needed For Multiple Views
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated


# Imports Needed for KnowledgeBase ViewSet
from .models import KnowledgeBase
from .serializers import KnowledgeBaseSerializer


# Imports Needed for Document ViewSet
from .models import Document
from .serializers import DocumentSerializer







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
        return Document.objects.filter(
            user=self.request.user
        ).select_related("knowledge_base").order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user
        )
