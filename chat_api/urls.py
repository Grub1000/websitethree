from django.urls import path

from .views import (
    ConversationListView,
    ConversationMessageListView,
    DirectConversationCreateView,
    ChatUserSearchView
)


urlpatterns = [
    path(
        "conversations/",
        ConversationListView.as_view(),
        name="conversation-list",
    ),

    path(
        "conversations/<uuid:conversation_id>/messages/",
        ConversationMessageListView.as_view(),
        name="conversation-messages",
    ),

    path(
        "conversations/direct/",
        DirectConversationCreateView.as_view(),
        name="direct-conversation-create",
    ),

    path(
        "users/",
        ChatUserSearchView.as_view(),
        name="chat-user-search",
    ),
]