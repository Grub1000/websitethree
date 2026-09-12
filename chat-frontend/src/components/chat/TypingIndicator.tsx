import type {
    ChatUser,
} from "../../types/chat";


type TypingIndicatorProps = {
    typingUserIds: number[];
    otherUser: ChatUser | null;
};


function TypingIndicator({
    typingUserIds,
    otherUser,
}: TypingIndicatorProps) {
    if (
        typingUserIds.length === 0
    ) {
        return null;
    }


    if (
        otherUser &&
        typingUserIds.includes(
            otherUser.id,
        )
    ) {
        const displayName =
            otherUser.first_name ||
            otherUser.username;

        return (
            <div className="TypingIndicator">
                {displayName} is typing...
            </div>
        );
    }


    return (
        <div className="TypingIndicator">
            Someone is typing...
        </div>
    );
}


export default TypingIndicator;