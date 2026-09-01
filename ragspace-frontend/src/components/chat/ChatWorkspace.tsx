import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    askQuestion,
    getConversationMessages,
} from "../../api/conversationsApi";

import {
    getDocumentViewUrl,
} from "../../api/documentsApi";

import type {
    Conversation,
    MessageSource,
} from "../../types/conversation";

import "./ChatWorkspace.css";


interface ChatWorkspaceProps {
    spaceId: number;

    conversation:
        Conversation | null;

    onBack: () => void;
}


interface ChatMessage {
    role:
        | "user"
        | "assistant";

    content: string;

    sources?: MessageSource[];
}

function ChatWorkspace({
    spaceId,
    conversation,
    onBack,
}: ChatWorkspaceProps) {
    const [
        message,
        setMessage,
    ] = useState("");

    const [
        messages,
        setMessages,
    ] = useState<ChatMessage[]>(
        []
    );

    const [
        sending,
        setSending,
    ] = useState(false);

    const [
        sendError,
        setSendError,
    ] = useState<string | null>(
        null
    );

    const [
        activeConversationId,
        setActiveConversationId,
    ] = useState<number | null>(
        conversation?.id ?? null
    );

    const [
        loadingMessages,
        setLoadingMessages,
    ] = useState(
        conversation !== null
    );

    const [
        messageLoadError,
        setMessageLoadError,
    ] = useState<string | null>(
        null
    );

    const textareaRef =
        useRef<HTMLTextAreaElement | null>(
        null
    );

    const messagesEndRef =
        useRef<HTMLDivElement | null>(
        null
    );

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, sending]);

    useEffect(() => {
        
        async function loadMessages() {
            if (!conversation) {
                setMessages([]);
                setLoadingMessages(false);

                return;
            }

            try {
                setLoadingMessages(true);
                setMessageLoadError(null);

                const loadedMessages =
                    await getConversationMessages(
                        conversation.id
                    );


                const normalizedMessages:
                    ChatMessage[] =
                    loadedMessages.map(
                        (savedMessage) => ({
                            role:
                                savedMessage.role ===
                                "USER"
                                    ? "user"
                                    : "assistant",

                            content:
                                savedMessage.content,

                            sources:
                                savedMessage.sources ??
                                [],
                        })
                    );


                setMessages(
                    normalizedMessages
                );

            } catch (error) {
                console.error(error);

                setMessageLoadError(
                    "Unable to load conversation history."
                );

            } finally {
                setLoadingMessages(false);
            }
        }


        loadMessages();

    }, [conversation]);





    async function handleSubmit(
        event: React.FormEvent,
    ) {
        event.preventDefault();

        const trimmedMessage =
            message.trim();

        if (
            !trimmedMessage ||
            sending
        ) {
            return;
        }


        const userMessage:
            ChatMessage = {
                role: "user",
                content: trimmedMessage,
            };


        // Immediately show the user's
        // message in the UI.
        setMessages(
            (currentMessages) => [
                ...currentMessages,
                userMessage,
            ]
        );

        setMessage("");
        if (textareaRef.current) {
            textareaRef.current.style.height =
                "auto";
        }
        setSending(true);
        setSendError(null);


        try {
            const result =
                await askQuestion(
                    spaceId,
                    trimmedMessage,
                    activeConversationId ??
                        undefined,
                );


            const assistantMessage:
                ChatMessage = {
                    role: "assistant",
                    content: result.answer,
                    sources:
                        result.sources ?? [],
                };


            setMessages(
                (currentMessages) => [
                    ...currentMessages,
                    assistantMessage,
                ]
            );


            // A new conversation was
            // automatically created.
            if (
                activeConversationId ===
                null
            ) {
                const newConversationId =
                    typeof result.conversation ===
                    "number"
                        ? result.conversation
                        : result.conversation.id;

                setActiveConversationId(
                    newConversationId
                );
            }

        } catch (error) {
            console.error(error);

            if (error instanceof Error) {
                setSendError(
                    error.message
                );
            } else {
                setSendError(
                    "Unable to send question."
                );
            }

        } finally {
            setSending(false);
        }
    }

    function resizeTextarea() {
        const textarea =
            textareaRef.current;

        if (!textarea) {
            return;
        }

        textarea.style.height = "auto";

        textarea.style.height =
            `${Math.min(
                textarea.scrollHeight,
                160
            )}px`;
    }



    function getUniqueSources(
        sources: MessageSource[],
    ) {
        return sources.filter(
            (source, index, allSources) =>
                index ===
                allSources.findIndex(
                    (candidate) =>
                        candidate.document_id ===
                            source.document_id &&
                        candidate.page_number ===
                            source.page_number
                )
        );
    }



    async function handleSourceClick(
        source: MessageSource,
    ) {
        if (!source.document_id) {
            return;
        }

        try {
            const url =
                await getDocumentViewUrl(
                    source.document_id
                );

            const page =
                source.page_number ?? 1;

            window.open(
                `${url}#page=${page}`,
                "_blank",
                "noopener,noreferrer"
            );

        } catch (error) {
            console.error(
                "Unable to open source:",
                error
            );
        }
    }


    return (
        <div className="chat-workspace">

            <div className="chat-workspace-header">

                <button
                    className="chat-back-button"
                    type="button"
                    onClick={onBack}
                >
                    ←
                </button>


                <div>
                    <h2>
                        {conversation
                            ? conversation.title
                            : "New Chat"}
                    </h2>

                    <p>
                        Ask questions using the
                        documents in this Space.
                    </p>
                </div>

            </div>


            <div className="chat-messages">
             {messageLoadError && (
                <div className="chat-history-error">
                    {messageLoadError}
                </div>
            )}   
            {loadingMessages && (
                <div className="chat-history-loading">
                    Loading conversation...
                </div>
            )}
            {!loadingMessages &&
                messages.length === 0 && (
                <div className="chat-welcome">

                    <div className="chat-welcome-icon">
                        ◈
                    </div>

                    <h3>
                        Ask RAGspace
                    </h3>

                    <p>
                        Ask a question about
                        the documents you've
                        added to this Space.
                    </p>

                </div>
            )}


            {messages.map(
                (chatMessage, index) => (

                    <div
                        className={
                            `chat-message ${
                                chatMessage.role
                            }`
                        }
                        key={index}
                    >

                        <div className="chat-message-content">
                            {
                                chatMessage.content
                            }
                        </div>


                        {chatMessage.role === "assistant" &&
                            chatMessage.sources &&
                            chatMessage.sources.length > 0 && (

                            <div className="chat-message-sources">

                                { getUniqueSources(
                                        chatMessage.sources
                                    ).map(
                                    (source, sourceIndex) => (

                                        <button
                                            className="chat-source"
                                            type="button"
                                            key={
                                                `${source.document_id}-${source.page_number}-${sourceIndex}`
                                            }
                                            onClick={() =>
                                                handleSourceClick(source)
                                            }
                                        >
                                            <span className="chat-source-icon">
                                                PDF
                                            </span>

                                            <span className="chat-source-info">

                                                <span className="chat-source-name">
                                                    {source.filename ??
                                                        "Source"}
                                                </span>

                                                <span className="chat-source-meta">
                                                    {source.page_number
                                                        ? `Page ${source.page_number}`
                                                        : "Document source"}
                                                        {/* {source.page} */}
                                                </span>

                                            </span>

                                        </button>

                                    )
                                )}

                            </div>
                        )}

                    </div>

                )
            )}


            {sending && (
                <div className="chat-message assistant">

                    <div className="chat-message-loading">
                        <span />
                        <span />
                        <span />
                    </div>

                </div>
            )}

            </div>

            <div ref={messagesEndRef} />

            {sendError && (
                <div className="chat-send-error">
                    {sendError}
                </div>
            )}
            <div className="chat-composer-wrapper">

                <form
                    className="chat-composer"
                    onSubmit={handleSubmit}
                >

                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(event) => {
                            setMessage(
                                event.target.value
                            );

                            resizeTextarea();
                        }}
                        onKeyDown={(event) => {
                            if (
                                event.key === "Enter" &&
                                !event.shiftKey
                            ) {
                                event.preventDefault();

                                event.currentTarget
                                    .form
                                    ?.requestSubmit();
                            }
                        }}
                        placeholder={
                            "Ask a question about your documents..."
                        }
                        rows={1}
                        disabled={
                            sending ||
                            loadingMessages
                        }
                    />


                    <button
                        type="submit"
                        className="chat-send-button"
                        disabled={
                            !message.trim() ||
                            sending ||
                            loadingMessages
                        }
                    >
                        {sending
                            ? "…"
                            : "↑"}
                    </button>

                </form>


                <p className="chat-composer-note">
                    RAGspace answers using
                    information retrieved from
                    this Space.
                </p>
                
            </div>

        </div>
    );
}


export default ChatWorkspace;