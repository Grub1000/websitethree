import {
    useEffect,
    useState,
} from "react";

import {
    deleteConversation,
    getConversations,
} from "../../api/conversationsApi";

import type {
    Conversation,
} from "../../types/conversation";

import "./ChatView.css";

import ChatWorkspace
    from "./ChatWorkspace";


interface ChatViewProps {
    spaceId: number;
}


function ChatView({
    spaceId,
}: ChatViewProps) {
    const [
        conversations,
        setConversations,
    ] = useState<Conversation[]>([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState<string | null>(
        null
    );

    const [
        selectedConversation,
        setSelectedConversation,
    ] = useState<Conversation | null>(
        null
    );

    const [
        isNewChat,
        setIsNewChat,
    ] = useState(false);


    const [
        deleteTarget,
        setDeleteTarget,
    ] = useState<Conversation | null>(
        null
    );

    const [
        deleting,
        setDeleting,
    ] = useState(false);

    const [
        deleteError,
        setDeleteError,
    ] = useState<string | null>(
        null
    );


    useEffect(() => {
        loadConversations();
    }, [spaceId]);

    async function loadConversations() {
        try {
            setLoading(true);
            setError(null);

            const loadedConversations =
                await getConversations();

            const spaceConversations = loadedConversations
                    .filter(
                        (conversation) =>
                            conversation.knowledge_base ===
                            spaceId
                    )
                    .sort(
                        (a, b) =>
                            new Date(
                                b.updated_at
                            ).getTime() -
                            new Date(
                                a.updated_at
                            ).getTime()
            );

            setConversations(
                spaceConversations
            );

        } catch (error) {
            console.error(error);

            setError(
                "Unable to load conversations."
            );

        } finally {
            setLoading(false);
        }
    }




    async function handleDeleteConversation() {
        if (!deleteTarget) {
            return;
        }

        try {
            setDeleting(true);
            setDeleteError(null);

            await deleteConversation(
                deleteTarget.id
            );

            setConversations(
                (currentConversations) =>
                    currentConversations.filter(
                        (conversation) =>
                            conversation.id !==
                            deleteTarget.id
                    )
            );

            setDeleteTarget(null);

        } catch (error) {
            console.error(error);

            if (error instanceof Error) {
                setDeleteError(
                    error.message
                );
            } else {
                setDeleteError(
                    "Unable to delete conversation."
                );
            }

        } finally {
            setDeleting(false);
        }
    }

    function handleNewChat() {
        setSelectedConversation(null);
        setIsNewChat(true);
    }


    function handleConversationSelect(
        conversation: Conversation,
    ) {
        setSelectedConversation(
            conversation
        );

        setIsNewChat(false);
    }


    async function handleBackToConversations() {
        setSelectedConversation(null);
        setIsNewChat(false);

        await loadConversations();
    }


    function formatConversationDate(
        dateString: string,
    ) {
        const date =
            new Date(dateString);

        const today =
            new Date();

        const isToday =
            date.toDateString() ===
            today.toDateString();

        if (isToday) {
            return date.toLocaleTimeString(
                [],
                {
                    hour: "numeric",
                    minute: "2-digit",
                }
            );
        }

        return date.toLocaleDateString(
            [],
            {
                month: "short",
                day: "numeric",
            }
        );
    }



    if (loading) {
        return (
            <div className="chat-state">
                Loading conversations...
            </div>
        );
    }


    if (error) {
        return (
            <div className="chat-state chat-state-error">
                {error}
            </div>
        );
    }


    if (
        isNewChat ||
        selectedConversation
    ) {
        return (
            <ChatWorkspace
                spaceId={spaceId}
                conversation={
                    selectedConversation
                }
                onBack={
                    handleBackToConversations
                }
            />
        );
    }


    return (
        <div className="chat-view">

            <div className="chat-header">

                <div>
                    <h2>
                        Chat
                    </h2>

                    <p>
                        Ask questions about the
                        documents in this Space.
                    </p>
                </div>


                <button
                    className="new-chat-button"
                    type="button"
                    onClick={handleNewChat}
                >
                    + New Chat
                </button>

            </div>


            {conversations.length === 0 ? (

                <div className="chat-empty">

                    <div className="chat-empty-icon">
                        ◇
                    </div>

                    <h3>
                        Start a conversation
                    </h3>

                    <p>
                        Ask questions and RAGspace
                        will answer using the
                        documents in this Space.
                    </p>

                    <button
                        className="new-chat-button"
                        type="button"
                        onClick={handleNewChat}
                    >
                        + New Chat
                    </button>

                </div>

            ) : (

                <div className="conversation-list">

                    {conversations.map(
                        (conversation) => (

                            <div
                                className="conversation-row"
                                key={conversation.id}
                            >
                                <button
                                    className="conversation-main"
                                    type="button"
                                    onClick={() =>
                                        handleConversationSelect(
                                            conversation
                                        )
                                    }
                                >
                                    <div className="conversation-icon">
                                        ◇
                                    </div>

                                    <div className="conversation-info">

                                        <div className="conversation-title">
                                            {conversation.title}
                                        </div>

                                        <div className="conversation-date">
                                            {formatConversationDate(
                                                conversation.updated_at
                                            )}
                                        </div>

                                    </div>
                                </button>

                                <button
                                    className="conversation-menu-button"
                                    type="button"
                                    aria-label={
                                        `Delete ${conversation.title}`
                                    }
                                    onClick={() =>
                                        setDeleteTarget(
                                            conversation
                                        )
                                    }
                                >
                                    ⋯
                                </button>
                            </div>

                        )
                    )}

                </div>

            )}
            {deleteTarget && (
                <div
                    className="conversation-delete-backdrop"
                    onClick={() => {
                        if (!deleting) {
                            setDeleteTarget(null);
                        }
                    }}
                >
                    <div
                        className="conversation-delete-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >
                        <h3>
                            Delete conversation?
                        </h3>

                        <p>
                            <strong>
                                {deleteTarget.title}
                            </strong>{" "}
                            and its saved messages will
                            be permanently deleted.
                        </p>

                        {deleteError && (
                            <p className="conversation-delete-error">
                                {deleteError}
                            </p>
                        )}

                        <div className="conversation-delete-actions">

                            <button
                                type="button"
                                className="conversation-delete-cancel"
                                disabled={deleting}
                                onClick={() =>
                                    setDeleteTarget(null)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="conversation-delete-confirm"
                                disabled={deleting}
                                onClick={
                                    handleDeleteConversation
                                }
                            >
                                {deleting
                                    ? "Deleting..."
                                    : "Delete"}
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


export default ChatView;