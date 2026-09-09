import json

from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):
    group_name = "chat_test"

    async def connect(self):
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )

        await self.accept()

    async def receive(
        self,
        text_data=None,
        bytes_data=None
    ):
        if not text_data:
            return

        await self.channel_layer.group_send(
            self.group_name,
            {
                "type": "chat.message",
                "message": text_data
            }
        )

    async def chat_message(self, event):
        await self.send(
            text_data=json.dumps({
                "message": event["message"]
            })
        )

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )