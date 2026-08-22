from django.urls import path, include
from .views.views import CurrentUserView, ResumeAnalyzeView, ResumeListView, ResumeThumbnailURLView, ResumeThumbnailView, ResumeUploadRequestView, ResumeUploadCompleteView, ResumeExtractTextView, ResumeDeleteView, ResumeAnalysisListView
from .views.job_application_views import (
    JobApplicationViewSet,
)


urlpatterns = [
    path(
        "auth/",
        include("resume_analyzer_app_api.auth_urls")
    ),
    path(
        "user/me/",
        CurrentUserView.as_view(),
        name="current-user",
    ),
    path(
        "resumes/upload-request/",
        ResumeUploadRequestView.as_view(),
        name="resume-upload-request",
    ),
    path(
        "resumes/upload-complete/",
        ResumeUploadCompleteView.as_view(),
        name="resume-upload-complete",
        ),
    path(
        "resumes/<uuid:resume_id>/extract/",
        ResumeExtractTextView.as_view(),
        name="resume-extract-text",
    ),
    path(
        "resumes/<uuid:resume_id>/analyze/",
        ResumeAnalyzeView.as_view(),
        name="resume-analyze",
    ),
    path(
        "resumes/<uuid:resume_id>/thumbnail/",
        ResumeThumbnailView.as_view(),
        name="resume-thumbnail",
    ),
    path(
        "resumes/<uuid:resume_id>/thumbnail-url/",
        ResumeThumbnailURLView.as_view(),
        name="resume-thumbnail-url",
    ),
    path(
        "resumes/",
        ResumeListView.as_view(),
        name="resume-list",
    ),
        path(
        "resumes/<uuid:resume_id>/",
        ResumeDeleteView.as_view(),
        name="resume-delete",
    ),
    path(
        "resumes/<uuid:resume_id>/analyses/",
        ResumeAnalysisListView.as_view(),
        name="resume-analysis-list",
),

]


from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(
    r"job-applications",
    JobApplicationViewSet,
    basename="job-application",
)
# Automatically Gives Us: 
# 
# GET     /job-applications/
# POST    /job-applications/
# 
# GET     /job-applications/<uuid>/
# PUT     /job-applications/<uuid>/
# PATCH   /job-applications/<uuid>/
# DELETE  /job-applications/<uuid>/






urlpatterns += router.urls # Adds all automatically generated ModelViewSet routes from the DRF router
                           # to Django's URL patterns, enabling the JobApplication CRUD endpoints.




