from django.urls import path
from .v1.PostAPI import PostView
from .v1.ApplicationAPI import ApplicationView
from .v1.MessageGroupAPI import MessageGroupView
from .v1.ChatAPI import ChatView
from .v1.ReviewAPI import ReviewAPIView
from .v1.AzureViewAPI import RegisterADView
from .v1.UserProfileAPI import UserProfileView
from .v1.VerifyToken import VerifyTokenView

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
   path("posts/", PostView.as_view(), name="post-list-create"),
   path("posts/<int:pk>/", PostView.as_view(), name="post-detail"),
   path("posts/<int:post_id>/apply/", ApplicationView.as_view(), name="application-create"),
   path("posts/<int:post_id>/apply/<int:app_id>/", ApplicationView.as_view(), name="application-details"),
   # path("users/", CustomUserView.as_view(), name="user-create"),
   path('user/profile/', UserProfileView.as_view(), name='user_profile'),
   path('user/profile/<int:pk>/', UserProfileView.as_view(), name='user_profile'),
   path('chats/<int:chat_id>/messages/', MessageGroupView.as_view(), name='message-list-create'),
   path('chats/', ChatView.as_view(), name='chat-list-create'),
   path('chats/<int:pk>/', ChatView.as_view(), name='chat-detail'),
   path('posts/review/', ReviewAPIView.as_view() , name='review-posts'),
   path('posts/<int:post_id>/review/', ReviewAPIView.as_view(), name='review-specific-post'),
   path('registerad/',RegisterADView.as_view(), name="register-ad" ),
   path('verifytoken/', VerifyTokenView.as_view(), name='validate-token'),

   
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)




 