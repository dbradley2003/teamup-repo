from django.urls import path
from .views import PostView, ApplicationCreate, CreateUserView, UserProfileView


urlpatterns = [
   path("posts/", PostView.as_view(), name="post-list-create"),
   path("posts/<int:pk>/", PostView.as_view(), name="post-detail"),
   path("posts/<int:post_id>/apply/", ApplicationCreate.as_view(), name="application-create"),
   path("posts/<int:post_id>/apply/<int:app_id>/", ApplicationCreate.as_view(), name="application-details"),
   #path("posts/<int:post_id>/apply/<int:application_id>/comments", ApplicationCreate.as_view(), name="application-create"),
   path("users/", CreateUserView.as_view(), name="user-create"),
   path('user/profile/', UserProfileView.as_view(), name='user_profile'),
]




 