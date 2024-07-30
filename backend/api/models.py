from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    title = models.CharField(max_length=30)
    desc = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")

class Application(models.Model):
    sender = models.ForeignKey(User,on_delete=models.CASCADE, related_name= "applications_sent")
    reciever = models.ForeignKey(User,on_delete=models.CASCADE, related_name= "applications_recieved")
    post = models.ForeignKey(Post,on_delete=models.CASCADE)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.user.username  # Accessing the username of the user
    #profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

class Chat(models.Model):
    name = models.CharField(max_length=255, unique=True) 
    
    def __str__(self):
        return self.name

class MessageGroup(models.Model):
    chat = models.ForeignKey(Chat, related_name='chat_messages', on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE )
    content = models.CharField(max_length=300)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.author.username} : {self.content}'
    
    class Meta:
        ordering = ['-created']




    

    
