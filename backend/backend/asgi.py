
import os
import django
import socketio
from django.core.asgi import get_asgi_application
import jwt
from django.conf import settings
from django.http import JsonResponse
from django.core.exceptions import SynchronousOnlyOperation
from asgiref.sync import sync_to_async
import uuid
from rest_framework import serializers
from utils.helpers import BiDirectionalDict






# Set the settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User



# Create Django's ASGI application
django_app = get_asgi_application()

# Set up the Socket.IO ASGI server
sio = socketio.AsyncServer(async_mode="asgi",cors_allowed_origins="*")
app = socketio.ASGIApp(sio, django_app)


sessions = BiDirectionalDict()
sessions.reset()


# Define Socket.IO events
@sio.event
async def connect(sid, environ):
   print(f"Client {sid} connected")


@sio.event
async def authenticate(sid, data):
    # Called when a client sends an authentication event
    token = data.get('token')
    if not token:
        print("No token provided")
        await sio.disconnect(sid)
        return
    try:
        decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        user_id = decoded.get('user_id')
        user = await sync_to_async(User.objects.get)(id=user_id)
        username = user.username
        print(username)
        if user_id and user_id not in sessions.key_to_value:
            sessions.add(user_id,sid,username)
            print(f"User {user_id} authenticated and connected as {sid}")
            print(sessions)
            await sio.emit('authenticated', {'status': 'success'}, room=sid)
        else:
            raise ValueError("Invalid token data")
    except jwt.ExpiredSignatureError:
        await sio.emit('error', {'message': 'Token expired'}, room=sid)
        await sio.disconnect(sid)
    except jwt.InvalidTokenError:
        await sio.emit('error', {'message': 'Invalid token'}, room=sid)
        await sio.disconnect(sid)
    
    

@sio.event
async def disconnect(sid):
    print(sid, 'disconnected')

    user_id = sessions.get_key(sid)

    if user_id in sessions.key_to_value:
        sessions.delete(user_id,sid)
        print(sessions)


@sio.event
async def message(sid,data):
    recipient = data['recipient']
    message= data['message']
    print(message,recipient)

    if recipient in sessions.key_to_value:
        sid = sessions.get_value(recipient)
        username = sessions.get_username(sid)
        # user_id = sessions.get_key(sid)
        print (f'User is online, their session id is, {sid}')
        await sio.emit('new_message', {'key':str(uuid.uuid4()),'content':message,'username':username}, room = sid)
        return {'status': 'success', 'message': 'Message sent successfully'}
    else:
        print('not online')

# @sio.event
# async def new_message

   
















