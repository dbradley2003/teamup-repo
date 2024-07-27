from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
# from ..serializers import MessageSerializer
# from ..models import Message


# class MessageView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):      
#         print('Printed')
#         messages = Message.objects.filter(receiver = request.user)
#         serializer = MessageSerializer(messages)
#         return Response(serializer.data)