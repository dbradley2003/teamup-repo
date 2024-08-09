from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ..serializers import MessageSerializer, MessageCreateSerializer, UserSerializer, ChatSerializer
from ..models import MessageGroup, Chat, ChatHasUsers


class MessageGroupView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request,chat_id): 
        print("pk was given")
        chat = Chat.objects.get(id=chat_id)
        messages = chat.chat_messages.all().reverse()

        chat_users = chat.chat_users.exclude(user=request.user)
        recipient  = chat_users.first().user.username
        sender = chat.chat_users.get(user=request.user).user.username
        serializer = MessageSerializer(messages, many= True)
        response_data = {
            "messages": serializer.data,
            "recipient": recipient,
            "sender": sender

        }
        return Response(response_data)
        
    
    def post(self, request, chat_id):

        request.data['author'] = request.user.id
        request.data['chat'] = chat_id
        print(request.data)
        serializer = MessageCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # 1 socket between 2 users (UDP)
    # 1 socket between frontend and backend (Maybe TCP)

    
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