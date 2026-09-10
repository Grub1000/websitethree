"""
ASGI config for websitethree project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""
import os

from channels.routing import ProtocolTypeRouter, URLRouter
from chat_api.middleware import JWTAuthMiddleware # Custom JWT Authentication Middleware. Now every WebSocket Consumer gets: (self.scope["user"]). just like Django views normally get: (request.user)
from django.core.asgi import get_asgi_application

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "websitethree.settings"
)

django_asgi_app = get_asgi_application()

import chat_api.routing

application = ProtocolTypeRouter({
    "http": django_asgi_app,

    "websocket": JWTAuthMiddleware(
        URLRouter(
            chat_api.routing.websocket_urlpatterns
        )
    ),
})
