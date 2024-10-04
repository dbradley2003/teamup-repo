from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from ..models import UserProfile
from ..serializers import UserSerializer, ProfileSerializer
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from rest_framework import serializers
from rest_framework.permissions import AllowAny
from django.contrib.auth import  login


class RegisterADView(APIView):
    authentication_classes= []
    permission_classes = []

    def post(self, request):
        try:
            print(request.data)
            email = request.data['email']
            user, created = User.objects.get_or_create(email=email, username=email)
        
            if created:
                user.set_unusable_password()  # No password needed for Azure-authenticated users
                user.save()

            # Log the user in
            login(request, user)

            return Response({'message': 'User registered and logged in successfully'}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response('good')
