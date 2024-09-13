from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Post(models.Model):

    CATEGORY_CHOICES = [
        ('tech', 'Technology'),
        ('film', 'Film & Media'),
    ]

    title = models.CharField(max_length=60)
    desc = models.CharField(max_length=25000)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owner_posts")
    category = models.CharField(max_length=52, choices=CATEGORY_CHOICES, default='tech')
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-created_at']

class Application(models.Model):
    sender = models.ForeignKey(User,on_delete=models.CASCADE, related_name= "applications_sent")
    receiver = models.ForeignKey(User,on_delete=models.CASCADE, related_name= "applications_recieved")
    post = models.ForeignKey(Post,on_delete=models.CASCADE)
    message = models.CharField(max_length=280)


class Chat(models.Model):
    name = models.CharField(max_length=255, unique=True) 
    
    def __str__(self):
        return self.name

class ChatHasUsers(models.Model):
    chat = models.ForeignKey(Chat, related_name="chat_users", on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name="user_chats", on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.chat.name} : {self.user.username}'

class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=200,blank=True)
    resumeUrl = models.FileField(upload_to='resumes/', null=True, blank=True)
    projects = models.TextField(blank=True)
    skills = models.TextField(blank=True)
    picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    student_year = models.CharField(max_length=10, choices =[
        ('Freshman', 'Freshman'),
        ('Sophomore', 'Sophomore'),
        ('Junior', 'Junior'),
        ('Senior', 'Senior'),
    ], default='freshman')

    MAJOR_CHOICES = [
        ('FM', 'Film/Media'),
        ('STEM', 'Technology'),
        

    ]
    major = models.CharField(max_length=64, choices=MAJOR_CHOICES, default = 'FM')
    
    
    #profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

    def __str__(self):
        return self.user.username

class MessageGroup(models.Model):
    chat = models.ForeignKey(Chat, related_name='chat_messages', on_delete=models.CASCADE)
    author = models.ForeignKey(User, related_name='authored_messages', on_delete=models.CASCADE)
    content = models.CharField(max_length=300)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.author.username} : {self.content}'
    
    class Meta:
        ordering = ['-created']
    
