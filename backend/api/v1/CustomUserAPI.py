from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from ..serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import  status


ALLOWED_EMAIL_DOMAINS = ['@gmail.com']

class UserView(APIView):

    def post(self,request):
        data = request.data
        email = data.email
        domain = email.split('@')[-1]
        print(domain)

        if domain not in ALLOWED_EMAIL_DOMAINS:
            raise ValidationError(f"Registration is only allowed with emails from {', '.join(ALLOWED_EMAIL_DOMAINS)}")
        
        serializer = UserSerializer(data=request.data)
        print(request.data)

        if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

