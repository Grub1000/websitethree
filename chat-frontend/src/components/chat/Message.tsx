import type {
    ChatUser,
    Message,
} from "../../types/chat";

import {
    useAuth,
} from "../../context/AuthContext";


type MessageProps = {
    message: Message;
    otherUser: ChatUser | null;
    isDelivered: boolean;
    readByNames: string[];
    isReadByEveryone: boolean;
    isDirectConversation: boolean;
};


function MessageItem({
    message,
    otherUser,
    isDelivered,
    readByNames,
    isReadByEveryone,
    isDirectConversation,
}: MessageProps) {
    const {
        currentUser,
    } = useAuth();

    const isOwnMessage =
        currentUser?.id ===
        message.sender_id;

    const displayName =
        isOwnMessage
            ? currentUser?.first_name ||
            currentUser?.username ||
            "You"
            : otherUser?.first_name ||
            otherUser?.username ||
            "User";

    const initial =
        displayName
            .charAt(0)
            .toUpperCase();

    return (
        <div
            className={
                isOwnMessage
                    ? "Message MessageOwn"
                    : "Message"
            }
        >
            <div className="MessageAvatar">
                {initial}
            </div>

            <div className="MessageBody">

                <div className="MessageHeader">

                    <span className="MessageAuthor">
                        {isOwnMessage
                            ? "You"
                            : displayName}
                    </span>

                    <span className="MessageTime">
                        {formatMessageTime(
                            message.created_at,
                        )}
                    </span>

                </div>

                <div className="MessageContent">
                    {message.content}
                </div>

                {isOwnMessage && (
                    <div className="MessageStatus">
                       {isDirectConversation && readByNames.length > 0
                            ? `Read by ${readByNames[0]}`
                            : isReadByEveryone
                                ? "Read by everyone"
                                : readByNames.length > 0
                                    ? `Read by ${readByNames.join(", ")}`
                                    : isDelivered
                                        ? "Delivered"
                                        : "Sent"}
                    </div>
                )}

            </div>
        </div>
    );
}


function formatMessageTime(
    timestamp: string,
) {
    const date =
        new Date(timestamp);

    return date.toLocaleTimeString(
        [],
        {
            hour: "numeric",
            minute: "2-digit",
        },
    );
}


export default MessageItem;