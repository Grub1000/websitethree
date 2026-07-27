# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import UserViewSet

# router = DefaultRouter()
# router.register(r'user', UserViewSet)

# urlpatterns = [
#     path("", include(router.urls)),
# ]

# from django.urls import path, include 
# # from rest_framework.routers import DefaultRouter 
# # from .views import UserViewSet 

# # router = DefaultRouter() 
# # router.register(r"user", UserViewSet) 


# urlpatterns = [ 
#     path( "auth/", include("resume_analyzer_app_api.auth_urls") ),
#     path( "", include(router.urls) ), 
# ]

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