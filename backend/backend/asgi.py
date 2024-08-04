
import os
import django
import socketio
from django.core.asgi import get_asgi_application
import jwt
from django.conf import settings

from utils.helpers import BiDirectionalDict






# Set the settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

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
    print(sid, "connected")

@sio.event
async def disconnect(sid):
    print(sid, 'disconnected')

    user_id = sessions.get_key(sid)

    if user_id in sessions.key_to_value:
        sessions.delete(user_id,sid)
        print(sessions)


@sio.event
async def authenticate(sid, data):
    # Called when a client sends an authentication event
    token = data.get('token')
    try:
        decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        user_id = decoded.get('user_id')
        if user_id:
            sessions.add(user_id,sid)
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
async def message(sid,data):
    user_id = data['user_id']
    chat_id = data['chat_id']
    message = data['message']


    print(user_id,chat_id, message)
















