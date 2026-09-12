import type {
    Conversation,
} from "../../types/chat";


import ConversationCard from "./ConversationCard";

type ConversationListProps = {
    conversations:
        Conversation[];

    selectedConversation:
        Conversation | null;

    onSelectConversation: (
        conversation: Conversation,
    ) => void;

    isLoading:
        boolean;

    error:
        string | null;
};


function ConversationList({
    conversations,
    selectedConversation,
    onSelectConversation,
    isLoading,
    error,
}: ConversationListProps) {
    



    if (isLoading) {
        return (
            <div className="RelayEmptyState">
                Loading conversations...
            </div>
        );
    }


    if (error) {
        return (
            <div className="RelayEmptyState">
                {error}
            </div>
        );
    }


    if (conversations.length === 0) {
        return (
            <div className="RelayEmptyState">
                No conversations yet.
            </div>
        );
    }


    return (
        <div className="ConversationList">
            {conversations.map(
                (conversation) => (
                    <ConversationCard
                        key={conversation.id}
                        conversation={conversation}
                        isSelected={
                            selectedConversation?.id ===
                            conversation.id
                        }
                        onClick={() =>
                            onSelectConversation(
                                conversation,
                            )
                        }
                    />
                ),
            )}
        </div>
    );
}


export default ConversationList;