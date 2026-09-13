import json
from django.core.serializers.json import DjangoJSONEncoder

from channels.generic.websocket import AsyncWebsocketConsumer


from channels.db import database_sync_to_async
from .models import ConversationMember, Message, MessageDelivery, Conversation
from django.db import transaction

from django.utils import timezone

from .services.presence_service import (
    add_presence_connection,
    cleanup_stale_connections,
    refresh_presence_connection,
    remove_presence_connection,
    is_user_online,
)

from types import SimpleNamespace
from .serializers import ConversationSerializer

import asyncio



@database_sync_to_async
def user_is_conversation_member(user, conversation_id):
    return ConversationMember.objects.filter(
        conversation_id=conversation_id,
        user=user,
    ).exists()



@database_sync_to_async
def create_message(user, conversation_id, client_message_id, content):
    with transaction.atomic():
        # Look up an object with the given kwargs, creating one if necessary. Return a tuple of (object, created), where created is a boolean specifying whether an object was created.
        message, created = Message.objects.get_or_create( # Using get or create in order to maintain idempotency (where applying it multiple times yields the same final result as applying it just once due to having a client_message_id)
            sender=user,
            client_message_id=client_message_id,
            defaults={
                "conversation_id": conversation_id,
                "content": content,
            },
        )

        if created:
            recipient_ids = ConversationMember.objects.filter(
                conversation_id=conversation_id,
            ).exclude(
                user=user,
            ).values_list(
                "user_id",
                flat=True,
            )

            MessageDelivery.objects.bulk_create([
                MessageDelivery(
                    message=message,
                    user_id=user_id,
                )
                for user_id in recipient_ids
            ])

        return {
            "id": message.id,
            "conversation_id": str(message.conversation_id),
            "sender_id": message.sender_id,
            "client_message_id": str(message.client_message_id),
            "content": message.content,
            "created_at": message.created_at.isoformat(),
        }


@database_sync_to_async
def mark_messages_delivered(user, conversation_id, message_id):
    delivery_exists = MessageDelivery.objects.filter(
        message_id=message_id,
        user=user,
        message__conversation_id=conversation_id,
    ).exists()

    if not delivery_exists:
        return None

    delivered_at = timezone.now()

    updated_count = MessageDelivery.objects.filter(
        user=user,
        message__conversation_id=conversation_id,
        message_id__lte=message_id,
        delivered_at__isnull=True,
    ).update(
        delivered_at=delivered_at
    )

    return {
        "message_id": message_id,
        "user_id": user.id,
        "delivered_at": delivered_at.isoformat(),
        "updated_count": updated_count,
    }


@database_sync_to_async
def mark_messages_read(user, conversation_id, message_id):
    try:
        message = Message.objects.get(
            id=message_id,
            conversation_id=conversation_id,
        )
    except Message.DoesNotExist:
        return None

    try:
        membership = ConversationMember.objects.get(
            conversation_id=conversation_id,
            user=user,
        )
    except ConversationMember.DoesNotExist:
        return None

    current_last_read_id = membership.last_read_message_id

    if (
        current_last_read_id is not None
        and message.id <= current_last_read_id
    ):
        return {
            "message_id": current_last_read_id,
            "user_id": user.id,
            "read_at": (
                membership.last_read_at.isoformat()
                if membership.last_read_at
                else None
            ),
            "updated": False,
        }

    membership.last_read_message = message
    membership.last_read_at = timezone.now()

    membership.save(
        update_fields=[
            "last_read_message",
            "last_read_at",
        ]
    )

    return {
        "message_id": message.id,
        "user_id": user.id,
        "read_at": membership.last_read_at.isoformat(),
        "updated": True,
    }

@database_sync_to_async
def get_user_conversation_ids(user):
    return list(
        ConversationMember.objects.filter(
            user=user,
        ).values_list(
            "conversation_id",
            flat=True,
        )
    )


@database_sync_to_async
def get_conversation_member_ids(
    conversation_id,
):
    return list(
        ConversationMember.objects.filter(
            conversation_id=conversation_id
        ).values_list(
            "user_id",
            flat=True,
        )
    )


@database_sync_to_async
def get_unread_count(
    user_id,
    conversation_id,
):
    membership = ConversationMember.objects.get(
        user_id=user_id,
        conversation_id=conversation_id,
    )

    messages = Message.objects.filter(
        conversation_id=conversation_id,
    ).exclude(
        sender_id=user_id,
    )

    if membership.last_read_message_id:
        messages = messages.filter(
            id__gt=membership.last_read_message_id,
        )

    return messages.count()

@database_sync_to_async
def serialize_conversation_for_user(
    conversation_id,
    user,
):
    conversation = (
        Conversation.objects
        .prefetch_related(
            "members__user",
            "messages",
        )
        .get(id=conversation_id)
    )

    request = SimpleNamespace(
        user=user
    )

    data = ConversationSerializer(
        conversation,
        context={
            "request": request
        },
    ).data

    return json.loads(
        json.dumps(
            data,
            cls=DjangoJSONEncoder,
        )
    )

from django.contrib.auth import get_user_model

User = get_user_model()

@database_sync_to_async
def get_user_by_id(user_id):
    return User.objects.get(
        id=user_id
    )


class ChatConsumer(AsyncWebsocketConsumer):
    # group_name = "chat_test"

    async def connect(self):
        self.user = self.scope["user"]

        if not self.user.is_authenticated:
            await self.close(code=4401)
            return

        self.conversation_id = self.scope[
        "url_route"]["kwargs"]["conversation_id"]

        is_member = await user_is_conversation_member(
            self.user,
            self.conversation_id,
        )

        if not is_member:
            await self.close(code=4403)
            return

        self.group_name = (
            f"conversation_"
            f"{str(self.conversation_id).replace('-', '_')}"
        )

        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name,
        )

        connection_count = await add_presence_connection(
            self.user.id,
            self.channel_name,
        )

        await self.accept()

        await self.send_presence_snapshot()

        self.presence_watchdog_task = asyncio.create_task(
            self.presence_watchdog()
        )

        if connection_count == 1:
            await self.broadcast_presence(True)

    async def receive(self, text_data=None, bytes_data=None):
        if not text_data:
            return

        try:
            data = json.loads(text_data)
        except json.JSONDecodeError:
            await self.send(text_data=json.dumps({
                "type": "error",
                "message": "Invalid JSON",
            }))
            return

        # if not(data.get("type") == "message.send") or not(data.get("type" == "message.delivered")):
        #     await self.send(text_data=json.dumps({
        #         "type": "error",
        #         "message": "Unsupported event type",
        #     }))
        #     return
        
        event_type = data.get("type")

        if event_type == "message.send":
            await self.handle_message_send(data)

        elif event_type == "message.delivered":
            await self.handle_message_delivered(data)

        elif event_type == "message.read":
            await self.handle_message_read(data)

        elif event_type == "typing.start":
            await self.handle_typing_start()

        elif event_type == "typing.stop":
            await self.handle_typing_stop()

        elif event_type == "presence.heartbeat":
            await self.handle_presence_heartbeat()

        else:
            await self.send(text_data=json.dumps({
                "type": "error",
                "message": "Unsupported event type",
            }))

        # client_message_id = data.get("client_message_id")
        # content = data.get("content", "").strip()

        # if not client_message_id or not content:
        #     await self.send(text_data=json.dumps({
        #         "type": "error",
        #         "message": "client_message_id and content are required",
        #     }))
        #     return

        # message = await create_message(
        #     self.user,
        #     self.conversation_id,
        #     client_message_id,
        #     content,
        # )

        # await self.channel_layer.group_send(
        #     self.group_name,
        #     {
        #         "type": "chat.message",
        #         "message": message,
        #     },
        # )


    async def handle_message_send(self, data):
        client_message_id = data.get("client_message_id")
        content = data.get("content", "").strip()

        if not client_message_id or not content:
            await self.send(text_data=json.dumps({
                "type": "error",
                "message": "client_message_id and content are required",
            }))
            return

        message = await create_message(
            self.user,
            self.conversation_id,
            client_message_id,
            content,
        )

        await self.channel_layer.group_send(
            self.group_name,
            {
                "type": "chat.message",
                "message": message,
            },
        )

        member_ids = await get_conversation_member_ids(
            self.conversation_id
        )

        for user_id in member_ids:
            user = await get_user_by_id(
                user_id
            )

            conversation_data = (
                await serialize_conversation_for_user(
                    self.conversation_id,
                    user,
                )
            )

            await self.channel_layer.group_send(
                f"chat_user_{user_id}",
                {
                    "type": "conversation.updated",
                    "conversation":
                        conversation_data,
                },
            )


    async def handle_message_delivered(self, data):
        message_id = data.get("message_id")

        if not message_id:
            await self.send(text_data=json.dumps({
                "type": "error",
                "message": "message_id is required",
            }))
            return

        delivery = await mark_messages_delivered(
            self.user,
            self.conversation_id,
            message_id,
        )

        if delivery is None:
            await self.send(text_data=json.dumps({
                "type": "error",
                "message": "Delivery record not found",
            }))
            return

        await self.channel_layer.group_send(
            self.group_name,
            {
                "type": "chat.delivery",
                "delivery": delivery,
            },
        )

    async def handle_message_read(self, data):
        message_id = data.get("message_id")

        if not message_id:
            await self.send(text_data=json.dumps({
                "type": "error",
                "message": "message_id is required",
            }))
            return

        read_state = await mark_messages_read(
            self.user,
            self.conversation_id,
            message_id,
        )

        if read_state is None:
            await self.send(text_data=json.dumps({
                "type": "error",
                "message": "Invalid read acknowledgement",
            }))
            return


        
        await self.channel_layer.group_send(
            self.group_name,
            {
                "type": "chat.read",
                "read": read_state,
            },
        )

    async def handle_typing_start(self):
            await self.channel_layer.group_send(
                self.group_name,
                {
                    "type": "chat.typing",
                    "user_id": self.user.id,
                    "is_typing": True,
                },
            )
    
    
    async def handle_typing_stop(self):
        await self.channel_layer.group_send(
            self.group_name,
            {
                "type": "chat.typing",
                "user_id": self.user.id,
                "is_typing": False,
            },
        )


    async def broadcast_presence(self, is_online):
            conversation_ids = await get_user_conversation_ids(
                self.user
            )
    
            for conversation_id in conversation_ids:
                group_name = (
                    f"conversation_"
                    f"{str(conversation_id).replace('-', '_')}"
                )
    
                await self.channel_layer.group_send(
                    group_name,
                    {
                        "type": "chat.presence",
                        "user_id": self.user.id,
                        "is_online": is_online,
                    },
                )

    async def handle_presence_heartbeat(self):
        refreshed = await refresh_presence_connection(
            self.user.id,
            self.channel_name,
        )

        if not refreshed:
            await self.close(code=4000)


    async def chat_message(self, event):
        await self.send(
            text_data=json.dumps({
                "type": "message.new",
                "message": event["message"]
            })
        )

    async def chat_delivery(self, event):
            await self.send(
                text_data=json.dumps({
                    "type": "message.delivered",
                    "delivery": event["delivery"],
                })
            )

    async def chat_read(self, event):
        await self.send(
            text_data=json.dumps({
                "type": "message.read",
                "read": event["read"],
            })
        )

    async def chat_typing(self, event):
        if event["user_id"] == self.user.id:
            return

        await self.send(
            text_data=json.dumps({
                "type": "typing.update",
                "user_id": event["user_id"],
                "is_typing": event["is_typing"],
            })
        )

    async def chat_presence(self, event):
        if event["user_id"] == self.user.id:
            return

        await self.send(
            text_data=json.dumps({
                "type": "presence.update",
                "user_id": event["user_id"],
                "is_online": event["is_online"],
            })
        )

    async def send_presence_snapshot(self):
        member_ids = await get_conversation_member_ids(
            self.conversation_id
        )

        for user_id in member_ids:
            if user_id == self.user.id:
                continue

            online = await is_user_online(
                user_id
            )

            await self.send(
                text_data=json.dumps({
                    "type": "presence.update",
                    "user_id": user_id,
                    "is_online": online,
                })
            )


    async def disconnect(self, close_code):
        if hasattr(self, "presence_watchdog_task"):
            self.presence_watchdog_task.cancel()


        if hasattr(self, "group_name"):

            connection_count = await remove_presence_connection(
                self.user.id,
                self.channel_name,
            )

            if connection_count == 0:
                await self.broadcast_presence(False)

            await self.channel_layer.group_discard(
                self.group_name,
                self.channel_name,
            )

    async def presence_watchdog(self):
        try:
            while True:
                await asyncio.sleep(30)

                count_before, count_after = (
                    await cleanup_stale_connections(
                        self.user.id
                    )
                )

                if (
                    count_before > 0
                    and count_after == 0
                ):
                    await self.broadcast_presence(False)
                    await self.close(code=4000)
                    return

        except asyncio.CancelledError:
            pass










































class ChatUserConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]

        if not self.user.is_authenticated:
            await self.close()
            return

        self.user_group_name = (
            f"chat_user_{self.user.id}"
        )

        await self.channel_layer.group_add(
            self.user_group_name,
            self.channel_name,
        )

        await self.accept()

    async def disconnect(self, close_code):
        if hasattr(
            self,
            "user_group_name",
        ):
            await self.channel_layer.group_discard(
                self.user_group_name,
                self.channel_name,
            )

    async def conversation_updated(self, event):
        await self.send(
            text_data=json.dumps({
                "type": "conversation.updated",
                "conversation": event["conversation"],
            })
        )

    async def conversation_deleted(self, event):
        await self.send(
            text_data=json.dumps({
                "type": "conversation.deleted",
                "conversation_id": event["conversation_id"],
            })
        )