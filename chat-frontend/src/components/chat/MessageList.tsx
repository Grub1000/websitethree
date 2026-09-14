import type {
    Conversation,
    ConversationMember,
    Message,
} from "../../types/chat";

import {useRef, useEffect} from "react"

import MessageItem from "./Message.tsx";
import "./MessageList.css";


type MessageListProps = {
    messages: Message[];
    conversation: Conversation;
    deliveryPositions: Map<number, number>;
    readPositions: Map<number, number | null>;
    loadOlderMessages: () => void;
    hasMoreMessages: boolean;
    isLoadingOlder: boolean;
};


function MessageList({
    messages,
    conversation,
    deliveryPositions,
    readPositions,
    loadOlderMessages,
    hasMoreMessages,
    isLoadingOlder,
}: MessageListProps) {
    const orderedMessages =
        [...messages].reverse();

    const messageListRef = useRef<HTMLDivElement | null>(null);

    const previousScrollHeightRef = useRef<number | null>(null);

    const shouldStickToBottomRef = useRef(true);


   function handleScroll(
        event: React.UIEvent<HTMLDivElement>,
    ) {
        const element = event.currentTarget;

        const distanceFromBottom =
            element.scrollHeight -
            element.scrollTop -
            element.clientHeight;

        shouldStickToBottomRef.current =
            distanceFromBottom < 100;

        if (
            element.scrollTop === 0 &&
            hasMoreMessages &&
            !isLoadingOlder
        ) {
            previousScrollHeightRef.current =
                element.scrollHeight;

            loadOlderMessages();
        }
    }

    useEffect(() => {
        shouldStickToBottomRef.current = true;
        previousScrollHeightRef.current = null;
    }, [conversation.id]);


    useEffect(() => {
        const element =
            messageListRef.current;

        if (!element) {
            return;
        }

        // Older-message pagination happened
        if (
            previousScrollHeightRef.current !== null
        ) {
            const previousHeight =
                previousScrollHeightRef.current;

            const newHeight =
                element.scrollHeight;

            element.scrollTop =
                newHeight - previousHeight;

            previousScrollHeightRef.current =
                null;

            return;
        }

        // Initial load or user was already at bottom
        if (shouldStickToBottomRef.current) {
            element.scrollTop =
                element.scrollHeight;
        }
    }, [messages]);


    if (orderedMessages.length === 0) {
        return (
            <div className="MessageListEmpty">
                No messages yet.
            </div>
        );
    }


    return (
        
        <div className="MessageList" onScroll={handleScroll} ref={messageListRef}>
            {
                orderedMessages.map( (message) => {
                        const readByUserIds = Array.from(
                            readPositions.entries(),
                        )
                        .filter(
                            ([userId, lastReadMessageId]) =>
                                userId !== message.sender_id &&
                                lastReadMessageId !== null &&
                                message.id <= lastReadMessageId
                        )
                        .map(([userId]) => userId);

                        const readByNames = readByUserIds
                        .map((userId) => {
                            const member =
                                conversation.members.find(
                                    (member: ConversationMember) =>
                                        member.user_id === userId
                                );

                            if (!member) {
                                return null;
                            }

                            const fullName = [
                                member.user.first_name,
                                member.user.last_name,
                            ]
                                .filter(Boolean)
                                .join(" ");

                            return (
                                fullName ||
                                member.user.username ||
                                `User ${member.user_id}`
                            );
                        }).filter(
                            (name): name is string =>
                                Boolean(name)
                        );
                        
                        const deliveredToUserIds = Array.from(
                            deliveryPositions.entries(),
                        )
                            .filter(
                                ([userId, lastDeliveredMessageId]) =>
                                    userId !== message.sender_id &&
                                    message.id <= lastDeliveredMessageId
                            )
                            .map(([userId]) => userId);

                        const recipientCount =
                            conversation.members.filter(
                                (member: ConversationMember) =>
                                    member.user_id !== message.sender_id
                            ).length;

                        const isReadByEveryone =
                            recipientCount > 0 &&
                            readByUserIds.length === recipientCount;
                        
                        const isDirectConversation =
                            conversation.members.length === 2;


                        return (
                            <MessageItem
                                key={message.id}
                                message={message}
                                otherUser={conversation.other_user}
                                isDelivered={
                                    deliveredToUserIds.length > 0
                                }
                                readByNames={readByNames}
                                isReadByEveryone={isReadByEveryone}
                                isDirectConversation={isDirectConversation}
                            />
                        )
                    } 

          
                )
            }
        </div>
    );
}


export default MessageList;