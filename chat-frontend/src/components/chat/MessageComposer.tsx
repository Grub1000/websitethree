import {
    useRef,
    useState,
} from "react";

import "./MessageComposer.css";


type MessageComposerProps = {
    sendEvent: (
        event: object,
    ) => boolean;
};


function MessageComposer({
    sendEvent,
}: MessageComposerProps) {
    const [
        message,
        setMessage,
    ] = useState("");

    const typingTimeoutRef =
        useRef<number | null>(
            null,
    );

    const isTypingRef =
        useRef(false);

    const textareaRef =
        useRef<HTMLTextAreaElement | null>(
            null,
    );

    function handleSubmit(
        event: React.FormEvent,
    ) {
        event.preventDefault();

        const content =
            message.trim();

        if (!content) {
            return;
        }

        const sent =
            sendEvent({
                type: "message.send",
                client_message_id:
                    crypto.randomUUID(),
                content,
            });

        if (!sent) {
            return;
        }

        if (
            typingTimeoutRef.current
        ) {
            window.clearTimeout(
                typingTimeoutRef.current,
            );
        }

        if (isTypingRef.current) {
            sendEvent({
                type: "typing.stop",
            });

            isTypingRef.current =
                false;
        }

        setMessage("");

        window.requestAnimationFrame(() => {
            if (textareaRef.current) {
                textareaRef.current.style.height =
                    "auto";
            }
        });
    }
    function handleMessageChange(
        event:
            React.ChangeEvent<HTMLTextAreaElement>,
    ) {
        const value =
            event.target.value;

        setMessage(value);

        window.requestAnimationFrame(
            resizeTextarea,
        );


        if (
            value.trim() &&
            !isTypingRef.current
        ) {
            sendEvent({
                type: "typing.start",
            });

            isTypingRef.current =
                true;
        }


        if (
            typingTimeoutRef.current
        ) {
            window.clearTimeout(
                typingTimeoutRef.current,
            );
        }


        if (!value.trim()) {
            if (isTypingRef.current) {
                sendEvent({
                    type: "typing.stop",
                });

                isTypingRef.current =
                    false;
            }

            return;
        }


        typingTimeoutRef.current =
            window.setTimeout(
                () => {
                    sendEvent({
                        type: "typing.stop",
                    });

                    isTypingRef.current =
                        false;
                },
                1500,
            );
    }


    function handleKeyDown(
        event: React.KeyboardEvent<HTMLTextAreaElement>,
    ) {
        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {
            event.preventDefault();

            if (!message.trim()) {
                return;
            }

            event.currentTarget
                .form
                ?.requestSubmit();
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
                140,
            )}px`;
    }

    return (
        <form
            className="MessageComposer"
            onSubmit={
                handleSubmit
            }
        >

            <textarea
                ref={textareaRef}
                className="MessageComposerInput"
                value={message}
                onChange={handleMessageChange}
                onKeyDown={handleKeyDown}
                placeholder="Message"
                rows={1}
            />

            <button
                className="MessageComposerSendButton"
                type="submit"
                disabled={
                    !message.trim()
                }
            >
                Send
            </button>

        </form>
    );
}


export default MessageComposer;