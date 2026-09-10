from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Conversation, Message
from .serializers import (
    ConversationSerializer,
    MessageSerializer,
    CreateDirectConversationSerializer,
    ChatUserSerializer
)

from django.contrib.auth import get_user_model
from django.db.models import Q
from django.db import transaction
from .models import (
    Conversation,
    ConversationMember,
)

User = get_user_model()




class ConversationListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        conversations = (
            Conversation.objects
            .filter(members__user=request.user)
            .prefetch_related("members")
            .order_by("-updated_at")
        )

        serializer = ConversationSerializer(
            conversations,
            many=True,
            context={"request": request}
        )

        return Response(serializer.data)


class ConversationMessageListView(APIView):
    permission_classes = [IsAuthenticated]

    PAGE_SIZE = 50

    def get(self, request, conversation_id):
        is_member = Conversation.objects.filter(
            id=conversation_id,
            members__user=request.user,
        ).exists()

        if not is_member:
            return Response(
                {
                    "detail": "Conversation not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        messages = Message.objects.filter(
            conversation_id=conversation_id,
        ).order_by("-id")

        before = request.query_params.get("before")

        if before:  # Before refers to the next_cursor from the last message list view message list. (i.e. The ID of the last message in a full message list)
            try:
                before = int(before)
            except ValueError:
                return Response(
                    {
                        "detail": "Invalid before cursor."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            messages = messages.filter(
                id__lt=before,          
            )

        # Will grab all 50 + 1 messages. If less than 50 + 1 messages exists, returns a messages list of whatever does exist < 50.
        messages = list(
            messages[:self.PAGE_SIZE + 1]
        )

        # If more than 50 messages exists, we know set has_more equal to True. If not has_more is equal to False
        has_more = len(messages) > self.PAGE_SIZE 

        # If there is more, we get rid of the +1 and only keep 50 messages from the messages list. That +1 was used simply to see into the next page of messages (if there was one).
        if has_more:
            messages = messages[:self.PAGE_SIZE]

        # This next_cursor simply points to the id of the 50th element in the new messages list, if has_more == False simply make next_cursor equal to None as there is no more messages available.
        next_cursor = ( 
            messages[-1].id if has_more and messages else None
        )

        serializer = MessageSerializer(
            messages,
            many=True,
        )

        return Response({
            "results": serializer.data,
            "next_cursor": next_cursor,
            "has_more": has_more,
        })



class DirectConversationCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CreateDirectConversationSerializer(
            data=request.data,
            context={"request": request},
        )

        serializer.is_valid(raise_exception=True)

        other_user_id = serializer.validated_data["user_id"]

        user_ids = sorted([
            request.user.id,
            other_user_id,
        ])

        direct_key = f"{user_ids[0]}:{user_ids[1]}"

        with transaction.atomic():
            conversation, created = (
                Conversation.objects.get_or_create(
                    direct_key=direct_key,
                )
            )

            if created:
                ConversationMember.objects.bulk_create([
                    ConversationMember(
                        conversation=conversation,
                        user_id=request.user.id,
                    ),
                    ConversationMember(
                        conversation=conversation,
                        user_id=other_user_id,
                    ),
                ])

        conversation = (
            Conversation.objects
            .prefetch_related("members")
            .get(id=conversation.id)
        )

        response_serializer = ConversationSerializer(
            conversation
        )

        return Response(
            response_serializer.data,
            status=(
                status.HTTP_201_CREATED
                if created
                else status.HTTP_200_OK
            ),
        )


class ChatUserSearchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        search = request.query_params.get(
            "search",
            ""          # If no search default to an empty string.
        ).strip()

        if not search:  # If search is an empty string, return an empty list.
            return Response([])

        users = (
            User.objects
            .filter(
                Q(username__icontains=search)
                | Q(first_name__icontains=search)
                | Q(last_name__icontains=search)
            )
            .exclude(id=request.user.id)
            .order_by("username")[:20]
        )

        serializer = ChatUserSerializer(
            users,
            many=True,
        )

        return Response(serializer.data)