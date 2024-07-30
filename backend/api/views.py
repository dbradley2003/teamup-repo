from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializers import UserSerializer, PostSerializer,ProfileSerializer, ApplicationSerializer
from .models import Post, Application,Profile
from django.db.models import Exists, OuterRef,Case,When, BooleanField

class CreateUserView(generics.CreateAPIView):
   queryset = User.objects.all()
   serializer_class = UserSerializer
   permission_classes = [AllowAny]


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
       return Response({'message': 'Deleted successfully'}, status=204)
       #return Response(status=status.HTTP_204_NO_CONTENT)


class ApplicationCreate(APIView):
    permission_classes = [IsAuthenticated]


    def get(self, request, post_id, app_id = None):
        if app_id:
            print("pk was given")
            application = get_object_or_404(Application, pk=app_id)
            serializer = ApplicationSerializer(application)
            return Response(serializer.data)
        else:
            print('Printed')
            applications = Application.objects.filter(post=post_id)
            serializer = ApplicationSerializer(applications,many=True)
            return Response(serializer.data)
    
       

    def post(self, request, post_id):
       post = get_object_or_404(Post, pk=post_id)
       user1 = post.owner
       application, created = Application.objects.get_or_create(post=post, sender=request.user, reciever=user1)
       if created:
           return Response({"success": "Application submitted successfully"})
       else:
           return Response({"error": "You have already applied for this post"}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request, post_id, app_id=None):
        if app_id:
            print("pk was given")
            application = get_object_or_404(Application, pk=app_id)
            application.delete()
        else:
            print('Printed')
            applications = Application.objects.filter(post=post_id)
            applications.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
       
    
   


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = Profile.objects.get(user=request.user)
            serializer = ProfileSerializer(profile)
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.data)
        
   



    


    





