import {
    useCallback,
    useEffect,
    useState,
} from "react";

import type {
    ChatSocketEvent,
    Conversation,
    Message,
} from "../types/chat";

import {
    useChatSocket,
} from "../hooks/useChatSocket";


import {
    getConversationMessages,
} from "../api/chat_service";

import TypingIndicator
    from "../components/chat/TypingIndicator.tsx";


// Component  Imports
import ChatHeader from "../components/chat/ChatHeader";
import MessageList from "../components/chat/MessageList";
import MessageComposer from "../components/chat/MessageComposer";

// Style Sheet Import
import "./ChatPage.css";
// import { getCurrentUser } from "../api/user_service.ts";

import { useAuth } from "../context/AuthContext";


type ChatPageProps = {
    conversation: Conversation | null;

    setConversations:
        React.Dispatch<
            React.SetStateAction<
                Conversation[]
            >
        >;
    onBack?: () => void
};


function ChatPage({
    conversation,
    setConversations,
    onBack,
}: ChatPageProps) {
    const [
        messages,
        setMessages,
    ] = useState<Message[]>([]);

    const [
        isLoading,
        setIsLoading,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState<string | null>(null);

    const [
        typingUserIds,
        setTypingUserIds,
    ] = useState<number[]>([]);

    const {
        currentUser,
    } = useAuth();

    const [
        deliveryPositions,
        setDeliveryPositions,
    ] = useState<Map<number, number>>(
        new Map()
    );
    
    const [
        readPositions,
        setReadPositions,
    ] = useState<Map<number, number | null>>(
        new Map()
    );

    const [
        onlineUserIds,
        setOnlineUserIds,
    ] = useState<Set<number>>(
        new Set()
    );

    const [
        nextCursor,
        setNextCursor,
    ] = useState<number | null>(null);

    const [
        hasMoreMessages,
        setHasMoreMessages,
    ] = useState(false);

    const [
        isLoadingOlder,
        setIsLoadingOlder,
    ] = useState(false);

    const handleSocketMessage =
        useCallback(
            (
                event: ChatSocketEvent,
                sendEvent: (
                    event: object,
                ) => boolean,
            ) => {


            if (
                event.type === "message.new"
            ) {


                // console.log(
                //     "FULL MESSAGE.NEW EVENT:",
                //     event
                // );
                
                setMessages(
                    (
                        currentMessages,
                    ) => {
                        const alreadyExists =
                            currentMessages.some(
                                (
                                    message,
                                ) =>
                                    message.id === event.message.id,
                            );

                        if (
                            alreadyExists
                        ) {
                            return currentMessages;
                        }

                        return [
                            event.message,
                            ...currentMessages,
                        ];
                    },
                );

                // console.log(
                //     "ACTIVE CONVERSATION ID:",
                //     conversation?.id
                // );

                // console.log(
                //     "INCOMING MESSAGE CONVERSATION ID:",
                //     event.message.conversation
                // );
                setConversations((current) => {
                    const targetConversation =
                        current.find(
                            (item) =>
                                item.id === conversation?.id,
                        );

                    if (!targetConversation) {
                        return current;
                    }

                    const updatedConversation = {
                        ...targetConversation,
                        last_message:
                            event.message,
                        unread_count: 0,
                    };

                    return [
                        updatedConversation,
                        ...current.filter(
                            (item) =>
                                item.id !== conversation?.id,
                        ),
                    ];
                });

                if (
                    currentUser &&
                    event.message.sender_id !==
                        currentUser.id
                ) {
                    sendEvent({
                        type: "message.delivered",
                        message_id:
                            event.message.id,
                    });
                }

                return;
            }


            if (
                event.type ===
                "typing.update"
            ) {
                setTypingUserIds(
                    (
                        currentTypingUsers,
                    ) => {
                        if (
                            event.is_typing
                        ) {
                            if (
                                currentTypingUsers.includes(
                                    event.user_id,
                                )
                            ) {
                                return currentTypingUsers;
                            }

                            return [
                                ...currentTypingUsers,
                                event.user_id,
                            ];
                        }

                        return currentTypingUsers.filter(
                            (
                                userId,
                            ) =>
                                userId !==
                                event.user_id,
                        );
                    },
                );
            }


            if (event.type === "message.delivered") {
                setDeliveryPositions((current) => {
                    const next = new Map(current);

                    const currentPosition =
                        next.get(event.delivery.user_id);

                    if (
                        currentPosition === undefined ||
                        event.delivery.message_id > currentPosition
                    ) {
                        next.set(
                            event.delivery.user_id,
                            event.delivery.message_id,
                        );
                    }

                    return next;
                });

                return;
            }


            if (event.type === "message.read") {
                setReadPositions((current) => {
                    const next = new Map(current);

                    const currentPosition =
                        next.get(event.read.user_id);

                    if (
                        currentPosition === undefined ||
                        currentPosition === null ||
                        event.read.message_id > currentPosition
                    ) {
                        next.set(
                            event.read.user_id,
                            event.read.message_id,
                        );
                    }

                    return next;
                });

                return;
            }


            
            if (event.type === "presence.update") {  // Called multiple times in a looping fashion by the backend in a single consumer helper method call. See implementation here: // [[../backend/services/processing/auth_process.py:PythonAuthLogic|Jump to Python code]]
                setOnlineUserIds((current) => {      
                    const next = new Set(current);
                    
                    if (event.is_online) {
                        next.add(event.user_id);        // Adding an already logged in value to a set wont create a duplicate (Set datatype things.).
                    } else {
                        next.delete(event.user_id);     // If the user is not online, go ahead and delete that user from the onlineUserIds set.
                    }

                    return next;
                });

                return;
            }


        },
        [currentUser],
    );

    const {
        sendEvent,
        isConnected,
        connectionStatus
    } = useChatSocket({
        conversationId:
            conversation?.id ??
            null,

        onMessage:
            handleSocketMessage,
    });


    useEffect(() => {
        async function loadMessages() {
            setMessages([]);
            setNextCursor(null);
            setHasMoreMessages(false);

            if (!conversation) {
                return;
            }

            try {
                setIsLoading(true);
                setError(null);

                const data =
                    await getConversationMessages(
                        conversation.id,
                    );

                setMessages(
                    data.results,
                );
                setNextCursor(data.next_cursor);
                setHasMoreMessages(data.has_more);

                const persistedDeliveryPositions = new Map<number, number>();

                data.results.forEach((message) => {
                    message.delivered_to?.forEach((userId) => {
                        const currentPosition =
                            persistedDeliveryPositions.get(userId);

                        if (
                            currentPosition === undefined ||
                            message.id > currentPosition
                        ) {
                            persistedDeliveryPositions.set(
                                userId,
                                message.id,
                            );
                        }
                    });
                });

                setDeliveryPositions(persistedDeliveryPositions);
            } catch (error) {
                // existing handling
            } finally {
                setIsLoading(false);
            }
        }

        loadMessages();
    }, [conversation]);


    useEffect(() => {
        if (
            !conversation ||
            !currentUser ||
            !isConnected ||
            messages.length === 0
        ) {
            return;
        }

        const newestReceivedMessage =
            messages.find(
                (message) =>
                    message.sender_id !==
                    currentUser.id,
            );

        if (!newestReceivedMessage) {
            return;
        }

        sendEvent({
            type: "message.delivered",
            message_id:
                newestReceivedMessage.id,
        });
    }, [
        conversation,
        currentUser,
        isConnected,
        messages,
        sendEvent,
    ]);


    useEffect(() => {
        if (
            !conversation ||
            !currentUser ||
            !isConnected ||
            messages.length === 0
        ) {
            return;
        }

        const newestReceivedMessage =
            messages.find(
                (message) =>
                    message.sender_id !== currentUser.id,
            );

        if (!newestReceivedMessage) {
            return;
        }

        const didSend = sendEvent({
            type: "message.read",
            message_id: newestReceivedMessage.id,
        });

        if (didSend) {
            setConversations((current) =>
                current.map((item) =>
                    item.id === conversation.id
                        ? {
                            ...item,
                            unread_count: 0,
                        }
                        : item
                )
            );
        }


    }, [
        conversation,
        currentUser,
        isConnected,
        messages,
        sendEvent,
    ]);

    useEffect(() => {
        setDeliveryPositions(new Map());


        if (!conversation) {
            setReadPositions(new Map());
            return;
        }

        const positions = new Map<number, number | null>();

        conversation.read_receipts.forEach((receipt) => {
            positions.set(
                receipt.user_id,
                receipt.last_read_message,
            );
        });

        setReadPositions(positions);
    }, [conversation]);



    async function loadOlderMessages() {
        if (
            !conversation ||
            !hasMoreMessages ||
            nextCursor === null ||
            isLoadingOlder
        ) {
            return;
        }

        try {
            setIsLoadingOlder(true);

            const data =
                await getConversationMessages(
                    conversation.id,
                    nextCursor,
                );

            setMessages((current) => [
                ...current,
                ...data.results,
            ]);

            setNextCursor(data.next_cursor);
            setHasMoreMessages(data.has_more);
        } finally {
            setIsLoadingOlder(false);
        }
    }






    if (!conversation) {
        return (
            <div className="ChatEmptyState">
                <h2>
                    Select a conversation
                </h2>

                <p>
                    Choose a conversation from the sidebar
                    to start messaging.
                </p>
            </div>
        );
    }



    return (
        <div className="ChatPage">

            <ChatHeader
                conversation={conversation}
                onlineUserIds={onlineUserIds}
                connectionStatus={connectionStatus}
                onBack={onBack}
            />
                            
            {isLoading ? (
                <div className="ChatMessagesState">
                    Loading messages...
                </div>
            ) : error ? (
                <div className="ChatMessagesState">
                    {error}
                </div>
            ) : (

                <MessageList
                    messages={messages}
                    conversation={conversation}
                    deliveryPositions={deliveryPositions}
                    readPositions={readPositions}
                    loadOlderMessages={loadOlderMessages}
                    hasMoreMessages={hasMoreMessages}
                    isLoadingOlder={isLoadingOlder}
                />
            )}
            <TypingIndicator
                typingUserIds={
                    typingUserIds
                }
                otherUser={
                    conversation.other_user
                }
            />
            <MessageComposer
                sendEvent={
                    sendEvent
                }
            />

        </div>
    );
}


export default ChatPage;


