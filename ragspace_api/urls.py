from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import KnowledgeBaseViewSet, DocumentViewSet


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
]