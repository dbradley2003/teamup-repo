from django.urls import path
from . import views

urlpatterns = [
    path("posts/", views.PostApiView.as_view(), name="post-list"),
    path("apply/<int:id>/", views.Apply.as_view(), name="apply"),
    path('user/profile/', views.UserProfileView.as_view(), name='user_profile'),
    # path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
]