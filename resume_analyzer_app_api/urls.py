from django.urls import path, include
from .views import CurrentUserView, ResumeUploadRequestView, ResumeUploadCompleteView

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
]