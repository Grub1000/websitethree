from rest_framework import serializers

from .models import Conversation, ConversationMember, Message

from django.contrib.auth import get_user_model

User = get_user_model()


class MessageSerializer(serializers.ModelSerializer):
    sender_id = serializers.IntegerField(read_only=True)

    delivered_to = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = [
            "id",
            "conversation",
            "sender_id",
            "client_message_id",
            "content",
            "created_at",
            "edited_at",
            "deleted_at",
            "delivered_to",
        ]
    def get_delivered_to(self, obj):
        return list(
            obj.deliveries.filter(
                delivered_at__isnull=False,
            ).values_list(
                "user_id",
                flat=True,
            )
        )


class ChatUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
        ]

class ConversationMemberSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)

    user = ChatUserSerializer(read_only=True)


    class Meta:
        model = ConversationMember
        fields = [
            "user_id",
            "joined_at",
            "last_read_message",
            "last_read_at",
            "user",
        ]


class ConversationSerializer(serializers.ModelSerializer):
    members = ConversationMemberSerializer(
        many=True,
        read_only=True,
    )

    last_message = serializers.SerializerMethodField()
    unread_count = serializers.SerializerMethodField()
    other_user = serializers.SerializerMethodField()

    read_receipts = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = [
            "id",
            "direct_key",
            "created_at",
            "updated_at",
            "members",
            "other_user",
            "last_message",
            "unread_count",
            "read_receipts",
        ]

    def get_read_receipts(self, obj):
        return [
            {
                "user_id": member.user_id,
                "last_read_message": member.last_read_message_id,
                "last_read_at": member.last_read_at,
            }
            for member in obj.members.all()
        ]

    
    def get_other_user(self, obj):
        request = self.context.get("request")

        if not request:
            return None

        membership = (
            obj.members
            .exclude(user=request.user)
            .select_related("user")
            .first()
        )

        if not membership:
            return None

        return ChatUserSerializer(
            membership.user
        ).data

    def get_last_message(self, obj):
        last_message = (
            obj.messages
            .order_by("-id")
            .first()
        )

        if not last_message:
            return None

        return MessageSerializer(
            last_message
        ).data

    def get_unread_count(self, obj):
        request = self.context.get("request")

        if not request:
            return 0

        membership = (
            obj.members
            .filter(user=request.user)
            .first()
        )

        if not membership:
            return 0

        messages = obj.messages.exclude(
            sender=request.user,
        )

        if membership.last_read_message_id:
            messages = messages.filter(
                id__gt=membership.last_read_message_id,
            )

        return messages.count()
    

class CreateDirectConversationSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()

    def validate_user_id(self, value):
        request = self.context["request"]

        if value == request.user.id:
            raise serializers.ValidationError(
                "You cannot create a conversation with yourself."
            )

        if not User.objects.filter(id=value).exists():
            raise serializers.ValidationError(
                "User does not exist."
            )

        return value
