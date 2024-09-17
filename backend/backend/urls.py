from django.contrib import admin
from django.urls import path, include
# from api.v1.CustomTokenRefreshAPI import CustomTokenRefreshView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.v1.RegisterAPI import RegisterView
from api.v1.LogoutAPI import LogoutView

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/register/", RegisterView.as_view(), name="register"),
    path("api/user/logout/", LogoutView.as_view(), name="logout"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
