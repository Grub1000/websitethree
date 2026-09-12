import {
    useCallback,
    useEffect,
    useState,
} from "react";

import type {
    Conversation,
} from "../../types/chat";

import {
    getConversations,
} from "../../api/chat_service";

import RelaySidebar from "./RelaySidebar";
import ChatPage from "../../pages/ChatPage";

import "./RelayLayout.css";

import {
    useUserChatSocket,
} from "../../hooks/useUserChatSockets.ts";




function RelayLayout() {
    const [
        selectedConversation,
        setSelectedConversation,
    ] = useState<Conversation | null>(
        null,
    );

    const [
        conversations,
        setConversations,
    ] = useState<Conversation[]>([]);

    const [
        isLoadingConversations,
        setIsLoadingConversations,
    ] = useState(true);

    const [
        conversationError,
        setConversationError,
    ] = useState<string | null>(null);

    useEffect(() => {
        async function loadConversations() {
            try {
                setIsLoadingConversations(true);
                setConversationError(null);

                const data =
                    await getConversations();

                setConversations(data);
            } catch (error) {
                if (error instanceof Error) {
                    setConversationError(
                        error.message
                    );
                } else {
                    setConversationError(
                        "Unable to load conversations."
                    );
                }
            } finally {
                setIsLoadingConversations(false);
            }
        }

        loadConversations();
    }, []);

    const handleUserSocketMessage =
    useCallback((event: any) => {
        if (
            event.type !==
            "conversation.updated"
        ) {
            return;
        }

        setConversations((current) => {
            const existingConversation =
                current.find(
                    (item) =>
                        item.id ===
                        event.conversation.id,
                );

            if (!existingConversation) {
                return current;
            }

            const updatedConversation = {
                ...existingConversation,
                last_message:
                    event.conversation.last_message,
                unread_count:
                    event.conversation.unread_count,
            };

            return [
                updatedConversation,
                ...current.filter(
                    (item) =>
                        item.id !==
                        event.conversation.id,
                ),
            ];
        });
    }, []);

    useUserChatSocket({
        onMessage:
            handleUserSocketMessage,
    });


    return (
        <div className="RelayLayout">

            <RelaySidebar
                selectedConversation={selectedConversation}
                onSelectConversation={setSelectedConversation}
                conversations={conversations}
                setConversations={setConversations}
                isLoadingConversations={isLoadingConversations}
                conversationError={conversationError}
            />

            <main className="RelayMain">
                <ChatPage
                    conversation={selectedConversation}
                    setConversations={setConversations}
                />
            </main>

        </div>
    );
}


export default RelayLayout;