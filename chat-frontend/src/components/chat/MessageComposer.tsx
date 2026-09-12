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
    }
    function handleMessageChange(
        event:
            React.ChangeEvent<HTMLTextAreaElement>,
    ) {
        const value =
            event.target.value;

        setMessage(value);


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


    return (
        <form
            className="MessageComposer"
            onSubmit={
                handleSubmit
            }
        >

            <textarea
                className="MessageComposerInput"
                value={message}
                onChange={
                    handleMessageChange
                }
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