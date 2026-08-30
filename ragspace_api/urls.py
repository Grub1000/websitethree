from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import KnowledgeBaseViewSet, DocumentViewSet, AskSpaceView, ConversationViewSet


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

router.register(
    "conversations",
    ConversationViewSet,
    basename="conversations",
)

urlpatterns = [
    path("", include(router.urls)),
    path("ask/", AskSpaceView.as_view(), name="ragspace-ask"),
]