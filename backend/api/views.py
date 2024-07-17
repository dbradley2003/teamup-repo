from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer,PostSerializer, ProfileSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Post, Application, Profile
from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST

from django.db.models import Exists, OuterRef


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        # Call the superclass create method to handle user creation
        response = super().create(request, *args, **kwargs)

        # Get the newly created user from the response data
        user_data = response.data

        # Extract the username from the user data
        username = user_data.get('username')

        # Return a custom response with the username included
        return Response({'username': username}, status=status.HTTP_201_CREATED)




class PostApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        user = request.user
        posts = Post.objects.annotate(
            has_applied=Exists(
                Application.objects.filter(
                    sender= user,
                    post= OuterRef('pk')
                )
            )
        )
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self,request):
        request.data['owner'] = request.user.id
        print(request.data)
        serializer = PostSerializer(data=request.data)

        if serializer.is_valid():
            print('IS VALID')
            serializer.save()
            return Response('SUCCESS')
        else:
            return Response({"error": "You have already applied for this post"}, status=HTTP_400_BAD_REQUEST)

    
    # def post(self, request):
    #     data=request.data
    #     title = data['title']
    #     desc = data['desc']
    #     new_post = Post(owner=request.user, title=title, desc = desc)
    #     new_post.save()
    #     return Response('Success')

    

       
        
            

        
        


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


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = ProfileSerializer(user)
        return Response(serializer.data)
   



    


    





