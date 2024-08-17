from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ..serializers import ApplicationSerializer
from ..models import Application, Post

class ApplicationView(APIView):
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
       application, created = Application.objects.get_or_create(post=post, sender=request.user, receiver=user1)
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