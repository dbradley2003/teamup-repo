from django.contrib.auth.models import User
from .models import Post,UserProfile,Application, MessageGroup, Chat, ChatHasUsers
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email",]
        extra_kwargs = {"password": {"write_only": True},
        }
                        

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user

class PostSerializer(serializers.ModelSerializer):
    has_applied = serializers.BooleanField(read_only=True)
    is_owner = serializers.BooleanField(read_only=True)
    owner_username = serializers.SerializerMethodField()
    formatted_date = serializers.SerializerMethodField()


    class Meta:
        model = Post
        fields = ["id","status", "title", "desc", "owner", "has_applied","is_owner","category","owner_username","formatted_date"]

    def get_owner_username(self, obj):
        return obj.owner.username

    def get_formatted_date(self, obj):
        return obj.created_at.strftime('%B %d, %Y')

   


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
    

# class ProfileSerializer(serializers.ModelSerializer):
#     user = UserSerializer()


#     class Meta:
#         model = UserProfile
#         fields = ['user','school_year']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    picture_url = serializers.SerializerMethodField()
    resume_url = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ['user', 'bio', 'picture_url', 'picture', 'major', 'skills', 'resume_url', 'projects','resumeUrl','student_year']
    
    def get_picture_url(self, obj):
        request = self.context.get('request')
        if obj.picture:
            return request.build_absolute_uri(obj.picture.url)
        return None
    
    def get_resume_url(self, obj):
        request = self.context.get('request')
        if obj.resumeUrl:
            return request.build_absolute_uri(obj.resumeUrl.url)
        return None
    
        
    








