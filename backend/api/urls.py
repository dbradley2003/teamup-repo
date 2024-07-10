from django.urls import path
from . import views

urlpatterns = [
    path("posts/", views.PostListCreate.as_view(), name="post-list"),
    path("apply/<int:post_id>/", views.Apply, name="apply"),
    # path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
]