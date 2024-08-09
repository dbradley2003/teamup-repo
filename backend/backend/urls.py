from django.contrib import admin
from django.urls import path, include
from api.v1.UserAPI import UserView
from api.v1.CustomTokenRefreshAPI import CustomTokenRefreshView
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/register/", UserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", CustomTokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),
]
