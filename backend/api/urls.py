from django.urls import path
from .v1.PostAPI import PostView
from .v1.ApplicationAPI import ApplicationView
from .v1.ProfileAPI import ProfileView
from .v1.MessageGroupAPI import MessageGroupView
from .v1.UserAPI import UserView
from .v1.ChatAPI import ChatView



urlpatterns = [
   path("posts/", PostView.as_view(), name="post-list-create"),
   path("posts/<int:pk>/", PostView.as_view(), name="post-detail"),
   path("posts/<int:post_id>/apply/", ApplicationView.as_view(), name="application-create"),
   path("posts/<int:post_id>/apply/<int:app_id>/", ApplicationView.as_view(), name="application-details"),
   path("users/", UserView.as_view(), name="user-create"),
   path('user/profile/', ProfileView.as_view(), name='user_profile'),
   path('chats/<int:chat_id>/messages/', MessageGroupView.as_view(), name='message-list-create'),
   path('chats/', ChatView.as_view(), name='chat-list-create'),
   path('chats/<int:pk>/', ChatView.as_view(), name='chat-detail')
]




 