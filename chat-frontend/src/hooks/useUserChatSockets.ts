import {
    useEffect,
    useRef,
} from "react";

import {
    createUserChatSocket,
} from "../websocket/chat_socket";


type UseUserChatSocketProps = {
    onMessage: (event: unknown) => void;
};


export function useUserChatSocket({
    onMessage,
}: UseUserChatSocketProps) {
    const socketRef =
        useRef<WebSocket | null>(null);

    useEffect(() => {
        const socket =
            createUserChatSocket();

        socketRef.current = socket;

        socket.onmessage = (
            messageEvent,
        ) => {
            const event =
                JSON.parse(
                    messageEvent.data,
                );

            onMessage(event);
        };

        return () => {
            socket.close();
        };
    }, [onMessage]);

    return {
        socketRef,
    };
}