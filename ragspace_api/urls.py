from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import KnowledgeBaseViewSet


router = DefaultRouter()
router.register(
    "spaces",
    KnowledgeBaseViewSet,
    basename="spaces",
)

urlpatterns = [
    path("", include(router.urls)),
]