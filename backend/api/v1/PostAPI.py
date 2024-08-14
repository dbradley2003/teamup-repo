from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ..serializers import PostSerializer
from ..models import Post, Application
from django.db.models import Exists, OuterRef,Case,When, BooleanField


class PostView(APIView):
   permission_classes = [IsAuthenticated]


   def get(self, request, pk=None):
       if pk:
           print("pk was given")
           post = get_object_or_404(Post, pk=pk)
           serializer = PostSerializer(post)
           return Response(serializer.data)
       else:
           print("Pk was not given")
           posts = Post.objects.annotate(
               #Returns True if current user is owner of Post 
               is_owner = Case(
                   When(owner=request.user, then=True),
                   default=False,
                   output_field=BooleanField()
               ),
               #Returns True if current user has applied to Post
                has_applied=Exists(
                Application.objects.filter(
                sender=request.user,
                post=OuterRef('pk')
                )
           )
           )
           serializer = PostSerializer(posts, many=True)
           return Response(serializer.data)


   def post(self, request):
       request.data['owner'] = request.user.id
       serializer = PostSerializer(data=request.data)
       
       if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED)
       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


   def put(self, request, pk):
       post = get_object_or_404(Post, pk=pk)
       serializer = PostSerializer(post, data=request.data, partial=True)
       if serializer.is_valid():
           serializer.save()
           return Response(serializer.data)
       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


   def delete(self, request, pk):
       post = get_object_or_404(Post, pk=pk)
       post.delete()
       return Response(status=status.HTTP_204_NO_CONTENT)