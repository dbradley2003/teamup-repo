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
    
