from django.urls import path, include
from .views import CurrentUserView

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
]