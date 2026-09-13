import type {
    Conversation,
} from "../../types/chat";

import "./ConversationCard.css";

import { deleteConversation } from "../../api/chat_service";


type ConversationCardProps = {
    conversation: Conversation;
    isSelected?: boolean;
    onClick: () => void;
};


function ConversationCard({
    conversation,
    isSelected = false,
    onClick,
}: ConversationCardProps) {
    const user =
        conversation.other_user;

    if (!user) {
        return null;
    }


    const displayName =
        user.first_name ||
        user.username;


    const initials =
        user.first_name
            ? user.first_name
                  .charAt(0)
                  .toUpperCase()
            : user.username
                  .charAt(0)
                  .toUpperCase();


    const lastMessage =
        conversation.last_message
            ?.content ??
        "No messages yet";




    async function handleDeleteConversation(
        event: React.MouseEvent
    ) {
        event.stopPropagation();

        try {
            await deleteConversation(conversation.id);
        } catch (error) {
            console.error(
                "Unable to delete conversation:",
                error
            );
        }
    }


    return (
        <div
             className={
                isSelected
                    ? "ConversationCard ConversationCardSelected"
                    : "ConversationCard"
            }
            onClick={onClick}
            onKeyDown={(event) => {
                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {
                    event.preventDefault();
                    onClick();
                }
            }}
            role="button"
            tabIndex={0}
        >
            <div className="ConversationAvatar">
                {initials}

                <span className="ConversationPresence" />
            </div>

            <div className="ConversationContent">
                <div className="ConversationTopRow">
                    <span className="ConversationName">
                        {displayName}
                    </span>

                    <div className="ConversationActions">
                        {conversation.last_message && (
                            <span className="ConversationTime">
                                {formatMessageTime(
                                    conversation.last_message.created_at
                                )}
                            </span>
                        )}

                        <button
                            type="button"
                            className="ConversationDeleteButton"
                            onClick={handleDeleteConversation}
                            aria-label={`Delete conversation with ${displayName}`}
                        >
                            ×
                        </button>
                    </div>
                </div>

                <div className="ConversationBottomRow">
                    <span className="ConversationPreview">
                        {lastMessage}
                    </span>

                    {conversation.unread_count > 0 && (
                        <span className="ConversationUnreadBadge">
                            {conversation.unread_count}
                        </span>
                    )}
                </div>
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


export default ConversationCard;