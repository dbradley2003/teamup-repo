from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ..serializers import MessageSerializer, UserSerializer, ChatSerializer
from ..models import MessageGroup, Chat


class MessageGroupView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request,pk=None): 
        print("pk was given")
        chat = Chat.objects.get(id=pk)
        messages = chat.chat_messages.all()
        serializer = MessageSerializer(messages, many= True)
        return Response(serializer.data)
        
    
    def post(self, request):
        request.data['author'] = request.user.id
        serializer = MessageSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
       message = get_object_or_404(MessageGroup, pk=pk)
       serializer = MessageSerializer(message, data=request.data, partial=True)
       if serializer.is_valid():
           serializer.save()
           return Response(serializer.data)
       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        message = get_object_or_404(MessageGroup, pk=pk)
        message.delete()