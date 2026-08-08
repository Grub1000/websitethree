from django.urls import path, include
from .views import CurrentUserView, ResumeAnalyzeView, ResumeThumbnailView, ResumeUploadRequestView, ResumeUploadCompleteView, ResumeExtractTextView

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
]