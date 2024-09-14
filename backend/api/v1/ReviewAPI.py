from ..models import Post
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

from ..serializers import PostSerializer
from rest_framework import status
from rest_framework.permissions import BasePermission

class CanModeratePost(BasePermission):
    def has_permission(self, request, view):
        return request.user.has_perm('api.can_moderate_post')


class ReviewAPIView(APIView):
    
    permission_classes=[CanModeratePost]
    
    def get(self,request,pk=None):
        if pk:
            post = get_object_or_404(Post, pk=pk)
            serializer = PostSerializer(post)
            return Response(serializer.data)
        else:
            posts = Post.objects.filter(status='pending')
            serializer = PostSerializer(posts,many=True)
            return Response(serializer.data)

    def put(self,request,pk):
        post = get_object_or_404(Post,pk=pk )
        serializer = PostSerializer(post, data=request.data, partial=True)
        if serializer.is_valid():
           serializer.save()
           return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        ...