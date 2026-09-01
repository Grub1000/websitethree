import { apiFetch } from "./apiClient";

import type {
    AskResponse,
    Conversation,
    Message,
} from "../types/conversation";


export async function getConversations(): Promise<Conversation[]> {
    const response = await apiFetch(
        "/conversations/"
    );

    if (!response.ok) {
        throw new Error(
            "Unable to load conversations."
        );
    }

    return response.json();
}


export async function askQuestion(
    spaceId: number,
    question: string,
    conversationId?: number,
): Promise<AskResponse> {

    const body: {
        knowledge_base: number;
        question: string;
        conversation?: number;
    } = {
        knowledge_base: spaceId,
        question,
    };


    if (conversationId) {
        body.conversation =
            conversationId;
    }


    const response = await apiFetch(
        "/ask/",
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",
            },

            body: JSON.stringify(
                body
            ),
        }
    );


    if (!response.ok) {
        const data =
            await response.json();

        throw new Error(
            data.detail ??
            "Unable to get an answer."
        );
    }


    return response.json();
}



export async function getConversationMessages(
    conversationId: number,
): Promise<Message[]> {
    const response = await apiFetch(
        `/conversations/${conversationId}/messages/`
    );

    if (!response.ok) {
        throw new Error(
            "Unable to load conversation messages."
        );
    }

    return response.json();
}


export async function deleteConversation(
    conversationId: number,
): Promise<void> {
    const response = await apiFetch(
        `/conversations/${conversationId}/`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        const data =
            await response.json();

        throw new Error(
            data.detail ??
            "Unable to delete conversation."
        );
    }
}