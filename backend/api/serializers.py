from django.contrib.auth.models import User
from .models import Post,UserProfile,Application, MessageGroup, Chat, ChatHasUsers
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user

class PostSerializer(serializers.ModelSerializer):
    has_applied = serializers.BooleanField(read_only=True)
    is_owner = serializers.BooleanField(read_only=True)

    class Meta:
        model = Post
        fields = ["id", "title", "desc", "owner", "has_applied","is_owner","category"]


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ["id", "post", "sender", "receiver"]

class ChatSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chat 
        fields = ["id","name"]
    


class ChatHasUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatHasUsers
        fields = ['chat', 'user']

class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']  # Only serialize the username of the author

class MessageSerializer(serializers.ModelSerializer):
    #author = SimpleUserSerializer()
    username = serializers.CharField(source='author.username', read_only=True)
    chat = ChatSerializer()
    name = serializers.CharField(source='chat.name')
    
    class Meta:
        model = MessageGroup
        fields = ["id", "username", "content", "created", "chat", "name"]

class MessageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MessageGroup
        fields = ['author', 'chat', 'content']

    author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    chat = serializers.PrimaryKeyRelatedField(queryset=Chat.objects.all())
    

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()


    class Meta:
        model = UserProfile
        fields = ['user','school_year']
    








