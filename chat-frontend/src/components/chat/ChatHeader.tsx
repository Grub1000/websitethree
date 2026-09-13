import "./ChatHeader.css";

import type {
    Conversation,
} from "../../types/chat";


type ChatHeaderProps = {
    conversation: Conversation;
    onlineUserIds: Set<number>;
    connectionStatus:
        | "connecting"
        | "connected"
        | "reconnecting"
        | "disconnected";
    onBack?: () => void;
};

function ChatHeader({
    conversation,
    onlineUserIds,
    connectionStatus,
    onBack,
}: ChatHeaderProps) {
    const user =
        conversation.other_user;

    if (!user) {
        return null;
    }

    const displayName =
        user.first_name ||
        user.username;

    const initials =
        displayName
            .charAt(0)
            .toUpperCase();

    const otherUserIsOnline =
        conversation.other_user
            ? onlineUserIds.has(
                conversation.other_user.id,
            )
            : false;
    console.log("testing other user: " + conversation.other_user?.id)
    console.log("testing all online user IDS" + [...onlineUserIds])
    const connectionLabel =
        connectionStatus === "connected"
            ? "Connected"
            : connectionStatus === "connecting"
                ? "Connecting..."
                : connectionStatus === "reconnecting"
                    ? "Reconnecting..."
                    : "Disconnected";

    return (
        <header className="ChatHeader">
            <button
                type="button"
                className="ChatHeaderBackButton"
                onClick={onBack}
                aria-label="Back to conversations"
            >
                ←
            </button>

            <div className="ChatHeaderUser">

                <div className="ChatHeaderAvatar">
                    {initials}

                    <span
                        className="ChatHeaderPresence"
                    />
                </div>


                <div className="ChatHeaderInfo">

                    <span className="ChatHeaderName">
                        {displayName}
                    </span>

                    <span className="ChatHeaderStatus">
                        {otherUserIsOnline
                            ? "Online"
                            : "Offline"}

                        {" • "}

                        {connectionLabel}
                    </span>

                </div>

            </div>

        </header>
    );
}


export default ChatHeader;