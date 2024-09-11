
from ..serializers import ProfileSerializer
from rest_framework.permissions import IsAuthenticated
from ..models import UserProfile,User
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.http import HttpResponse,Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST



class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
            if pk:
                try:
                    user1 = get_object_or_404(User, pk=pk)
                    profile = UserProfile.objects.get(user=user1)
                    serializer = ProfileSerializer(profile, context={'request': request})
                    print(serializer.data)
                except UserProfile.DoesNotExist:
                    return Response({"error": "Profile not found"}, status=HTTP_404_NOT_FOUND)
            else:
                try:
                    profile = UserProfile.objects.get(user=request.user)
                    serializer = ProfileSerializer(profile, context={'request': request})
                    print(serializer.data)
                except UserProfile.DoesNotExist:
                    return Response({"error": "Profile not found"}, status=HTTP_404_NOT_FOUND)
            return Response(serializer.data)
    
    def put(self, request):
       profile = get_object_or_404(UserProfile, user=request.user.id)
       serializer = ProfileSerializer(profile, data=request.data,context={'request': request}, partial=True)
       if serializer.is_valid():
           serializer.save()
           return Response(serializer.data)
       return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def major_choices_view(request):
        choices = dict(UserProfile.MAJOR_CHOICES)
        return JsonResponse(choices)