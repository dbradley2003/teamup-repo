"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os
import django
from django.core.asgi import get_asgi_application
import socketio
from socketio import ASGIApp

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

# Create a new Socket.IO server
sio = socketio.AsyncServer(async_mode='asgi')

#Wrap the Django app with Socket.io middleware
django_asgi_app = get_asgi_application()
application = ASGIApp(sio, django_asgi_app)

@sio.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")
    await sio.emit('message', {'data': 'Welcome!'}, to=sid)

@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")

@sio.event
async def message(sid, data):
    print(f"Message from {sid}: {data}")
    await sio.emit('message', data, broadcast=True)







