from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import KnowledgeBase
from .serializers import KnowledgeBaseSerializer


class KnowledgeBaseViewSet(viewsets.ModelViewSet):
    serializer_class = KnowledgeBaseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return KnowledgeBase.objects.filter(
            user=self.request.user
        ).order_by("-updated_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
