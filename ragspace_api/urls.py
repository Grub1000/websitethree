from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import KnowledgeBaseViewSet, DocumentViewSet, AskSpaceView


router = DefaultRouter()
router.register(
    "spaces",
    KnowledgeBaseViewSet,
    basename="spaces",
)

router.register(
    "documents",
    DocumentViewSet,
    basename="documents",
)

urlpatterns = [
    path("", include(router.urls)),
    path("ask/", AskSpaceView.as_view(), name="ragspace-ask"),
]