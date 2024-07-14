from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer,PostSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Post, Application
from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST


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


class Apply(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        post = get_object_or_404(Post, pk=id)
        user1 = post.owner

        print(request.user)
        print(user1)
        application, created = Application.objects.get_or_create(post=post, sender=request.user, reciever=user1)
        
        if created:
            return Response({"success": "Application submitted successfully"})
        else:
            return Response({"error": "You have already applied for this post"}, status=HTTP_400_BAD_REQUEST)
    
    def get(self,request, id):
        return Response({"success": "Application GET submitted successfully"})
        
   



    


    





