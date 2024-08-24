from django.contrib import admin
from .models import Post,Application,UserProfile,MessageGroup, Chat, ChatHasUsers


# Register your models here.

admin.site.register(Post)
admin.site.register(Application)
admin.site.register(UserProfile)
admin.site.register(MessageGroup)
admin.site.register(Chat)
admin.site.register(ChatHasUsers)
