from django.urls import path
from rest_framework_simplejwt.views import ( TokenRefreshView )
from .views.views import (RegisterView, CustomEmailTokenObtainPairView, GoogleLoginView, ForgotPasswordView, ResetPasswordView)

urlpatterns = [ 
    path( "register/", RegisterView.as_view(), name="register", ),
    path( "login/", CustomEmailTokenObtainPairView.as_view(), name="token_obtain_pair",), 
    path( "refresh/", TokenRefreshView.as_view(), name="token_refresh", ),
    path("google/", GoogleLoginView.as_view(), name="google-login",),
    path("forgot-password/", ForgotPasswordView.as_view(), name="forgot-password",),
    path("reset-password/", ResetPasswordView.as_view(), name="reset-password",),

]