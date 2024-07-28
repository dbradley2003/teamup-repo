from django.contrib import admin
from .models import Post,Application,Profile,MessageGroup, Chat


# Register your models here.

admin.site.register(Post)
admin.site.register(Application)
admin.site.register(Profile)
admin.site.register(MessageGroup)
admin.site.register(Chat)
