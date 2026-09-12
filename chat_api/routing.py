from django.urls import path

from .consumers import (
    ChatConsumer,
    ChatUserConsumer,
)


websocket_urlpatterns = [
    path(
        "ws/chat/<uuid:conversation_id>/",
        ChatConsumer.as_asgi(),
    ),
        path(
        "ws/chat/",
        ChatUserConsumer.as_asgi(),
    ),
]