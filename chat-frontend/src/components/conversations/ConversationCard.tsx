import type {
    Conversation,
} from "../../types/chat";

import "./ConversationCard.css";


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


    return (
        <button
            className={
                isSelected
                    ? "ConversationCard ConversationCardSelected"
                    : "ConversationCard"
            }
            type="button"

            onClick={onClick}
        >
            <div className="ConversationAvatar">
                {initials}

                <span
                    className="ConversationPresence"
                />
            </div>


            <div className="ConversationContent">

                <div className="ConversationTopRow">

                    <span className="ConversationName">
                        {displayName}
                    </span>

                    {conversation.last_message && (
                        <span className="ConversationTime">
                            {formatMessageTime(
                                conversation
                                    .last_message
                                    .created_at,
                            )}
                        </span>
                    )}

                </div>


                <div className="ConversationBottomRow">

                    <span className="ConversationPreview">
                        {lastMessage}
                    </span>

                    {conversation.unread_count > 0 && (
                        <span className="ConversationUnreadBadge">
                            {
                                conversation
                                    .unread_count
                            }
                        </span>
                    )}

                </div>

            </div>
        </button>
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