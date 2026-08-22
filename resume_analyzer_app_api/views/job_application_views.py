from django.shortcuts import get_object_or_404

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from ..models import (
    JobApplication,
    Resume,
    ResumeAnalysis,
)

from ..serializers import (
    JobApplicationSerializer,
)


class JobApplicationViewSet(
    viewsets.ModelViewSet
):
    serializer_class = (
        JobApplicationSerializer
    )

    permission_classes = [
        IsAuthenticated,
    ]

    lookup_field = "public_id" # Changed Default Primary Key Lookup Behavior to Instead Lookup By Public_id UUID Field
    lookup_url_kwarg = "application_id"


    def get_queryset(self):
        return (
            JobApplication.objects
            .filter(owner=self.request.user)
            .select_related(
                "resume",
                "resume_analysis",
            )
            .order_by("-created_at")
        )


    def perform_create(
        self,
        serializer,
    ):
        resume = None
        resume_analysis = None

        resume_id = (
            serializer.validated_data.pop(
                "resume_id",
                None,
            )
        )

        resume_analysis_id = (
            serializer.validated_data.pop(
                "resume_analysis_id",
                None,
            )
        )


        if resume_id:
            resume = get_object_or_404(
                Resume,
                public_id=resume_id,
                owner=self.request.user,
            )


        if resume_analysis_id:
            resume_analysis = get_object_or_404(
                ResumeAnalysis,
                public_id=resume_analysis_id,
                resume__owner=self.request.user,
            )


        serializer.save(
            owner=self.request.user,
            resume=resume,
            resume_analysis=resume_analysis,
        )

    def perform_update(
    self,
    serializer,
    ):
        resume = serializer.instance.resume

        resume_analysis = (
            serializer.instance.resume_analysis
        )


        if "resume_id" in serializer.validated_data:
            resume_id = (
                serializer.validated_data.pop(
                    "resume_id"
                )
            )

            if resume_id is None:
                resume = None

            else:
                resume = get_object_or_404(
                    Resume,
                    public_id=resume_id,
                    owner=self.request.user,
                )


        if (
            "resume_analysis_id"
            in serializer.validated_data
        ):
            resume_analysis_id = (
                serializer.validated_data.pop(
                    "resume_analysis_id"
                )
            )

            if resume_analysis_id is None:
                resume_analysis = None

            else:
                resume_analysis = (
                    get_object_or_404(
                        ResumeAnalysis,
                        public_id=(
                            resume_analysis_id
                        ),
                        resume__owner=(
                            self.request.user
                        ),
                    )
                )


        serializer.save(
            resume=resume,
            resume_analysis=resume_analysis,
        )