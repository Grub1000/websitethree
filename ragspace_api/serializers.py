# Import Needed For All Serializers
from rest_framework import serializers

# Import Needed For KnowledgeBase
from .models import KnowledgeBase

# Import Needed For Document Serializer
from .models import Document


class KnowledgeBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = KnowledgeBase
        fields = [
            "id",
            "name",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]














class DocumentSerializer(serializers.ModelSerializer):
    knowledge_base = serializers.PrimaryKeyRelatedField(
        queryset=KnowledgeBase.objects.none()
    )

    class Meta:
        model = Document
        fields = [
            "id",
            "knowledge_base",
            "filename",
            "s3_key",
            "file_size",
            "page_count",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "s3_key",
            "file_size",
            "page_count",
            "status",
            "created_at",
            "updated_at",
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        request = self.context.get("request")
        
        # This dynamic queryset is important: a user can only select one of their own Spaces.
        if request and request.user.is_authenticated:
            self.fields["knowledge_base"].queryset = (
                KnowledgeBase.objects.filter(user=request.user)
            )