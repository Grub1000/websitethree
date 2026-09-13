import type {
    // ChatUser,
    Conversation,
    ConversationMessageResponse,
} from "../types/chat";

import {
    apiFetch,
} from "./api_client.ts";


export async function getConversations() {
    const response = await apiFetch(
        "/conversations/",
    );

    if (!response.ok) {
        throw new Error(
            "Unable to load conversations.",
        );
    }

    return (
        await response.json()
    ) as Conversation[];
}


export async function getConversationMessages(
    conversationId: string,
    before?: number,
) {
    const params =
        new URLSearchParams();

    if (before !== undefined) {
        params.set(
            "before",
            before.toString(),
        );
    }

    const query =
        params.toString();

    const response = await apiFetch(
        `/conversations/${conversationId}/messages/${
            query ? `?${query}` : ""
        }`,
    );

    if (!response.ok) {
        throw new Error(
            "Unable to load messages.",
        );
    }

    return (
        await response.json()
    ) as ConversationMessageResponse;
}


export async function createDirectConversation(
    userId: number,
) {
    const response = await apiFetch(
        "/conversations/direct/",
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
            },
            body: JSON.stringify({
                user_id: userId,
            }),
        },
    );

    if (!response.ok) {
        throw new Error(
            "Unable to start conversation.",
        );
    }

    return await response.json();
}


export async function searchUsers(
    search: string,
) {
    const params =
        new URLSearchParams();

    params.set("search", search);

    const response = await apiFetch(
        `/users/?${params.toString()}`,
    );

    if (!response.ok) {
        throw new Error(
            "Unable to search users.",
        );
    }

    return await response.json();
}


export async function deleteConversation(
    conversationId: string
) {
    const response = await apiFetch(
        `/conversations/${conversationId}/`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        throw new Error(
            "Unable to delete conversation."
        );
    }
}