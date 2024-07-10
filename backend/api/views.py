from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer,PostSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Post, Application
from django.views.decorators.http import require_http_methods
# from django.contrib.auth.decorators import login_required
import json
from django.http import JsonResponse

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]



class PostListCreate(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Post.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
        else:
            print(serializer.errors)


@require_http_methods(["POST"])  # Only allow POST requests to this view
def Apply(request,id):
    try:
        post = Post.objects.get(id=id)
        new_application = Application(post=post,sender=request.user,reciever=post.user)
        new_application.save()
        return JsonResponse({'status': 'success', 'postId': id})
    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)




