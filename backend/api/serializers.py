from django.contrib.auth.models import User
from .models import Post,Profile,Application
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
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
        fields = ["id", "title", "desc", "owner", "has_applied","is_owner"]

    def create(self, validated_data):
        print(validated_data)
        post = Post.objects.create(**validated_data)
        return post

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ["id", "post", "sender", "reciever"]
    


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = ['user']
    








