# from django.contrib.auth.models import User
# from rest_framework import generics, status
# from rest_framework.permissions import IsAuthenticated, AllowAny
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from django.shortcuts import get_object_or_404
# from ..serializers import ProfileSerializer
# from ..models import UserProfile

# class ProfileView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         try:
#             profile = UserProfile.objects.get(user=request.user)
#             serializer = ProfileSerializer(profile)
#         except UserProfile.DoesNotExist:
#             return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
#         return Response(serializer.data)