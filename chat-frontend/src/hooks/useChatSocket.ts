import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import type {
    ChatSocketEvent,
} from "../types/chat";

import {
    createChatSocket,
} from "../websocket/chat_socket";


type SendEvent = (
    event: object,
) => boolean;


type UseChatSocketProps = {
    conversationId: string | null;

    onMessage: (
        event: ChatSocketEvent,
        sendEvent: SendEvent,
    ) => void;
};

type ConnectionStatus =
    | "connecting"
    | "connected"
    | "reconnecting"
    | "disconnected";

export function useChatSocket({
    conversationId,
        onMessage,
    }: UseChatSocketProps) {
        const socketRef =
        useRef<WebSocket | null>(
            null,
        );

        const heartbeatRef = useRef<number | null>(null);

        const reconnectTimeoutRef = useRef<number | null>(null);

        const intentionalCloseRef = useRef(false);

        const reconnectAttemptsRef = useRef(0);

        const [
            isConnected,
            setIsConnected,
        ] = useState(false);

        const [
            reconnectTrigger,
            setReconnectTrigger,
        ] = useState(0);


        const [
            connectionStatus,
            setConnectionStatus,
        ] = useState<ConnectionStatus>(
            "disconnected"
        );

        const sendEvent =
        useCallback(
            (
                event: object,
            ) => {
                const socket =
                    socketRef.current;

                if (
                    !socket ||
                    socket.readyState !==
                        WebSocket.OPEN
                ) {
                    return false;
                }

                socket.send(
                    JSON.stringify(event),
                );

                return true;
            },
        [],
    );

    const scheduleReconnect = useCallback(() => {
        if (reconnectTimeoutRef.current !== null) {
            return;
        }

        const delay = Math.min(
            1000 * 2 ** reconnectAttemptsRef.current,
            30000,
        );

        reconnectTimeoutRef.current =
            window.setTimeout(() => {
                reconnectTimeoutRef.current = null;

                reconnectAttemptsRef.current += 1;

                setReconnectTrigger(
                    (current) => current + 1
                );
            }, delay);
    }, []);


    useEffect(() => {
        if (!conversationId) {
            return;
        }

        intentionalCloseRef.current = false;

        setConnectionStatus(
            reconnectAttemptsRef.current > 0
                ? "reconnecting"
                : "connecting"
        );

        const socket =
            createChatSocket(
                conversationId,
            );

        socketRef.current =
            socket;


        socket.onopen = () => {
            setIsConnected(true);
            setConnectionStatus("connected");
            reconnectAttemptsRef.current = 0;

            sendEvent({
                type: "presence.heartbeat",
            });

            heartbeatRef.current = window.setInterval(() => {
                sendEvent({
                    type: "presence.heartbeat",
                });
            }, 20000);

            console.log(
                "Relay WebSocket connected.",
            );
        };


        socket.onmessage = (
            event,
        ) => {
            try {
                const data =
                    JSON.parse(
                        event.data,
                    ) as ChatSocketEvent;

                onMessage(
                    data,
                    sendEvent,
                );
            } catch (error) {
                console.error(
                    "Invalid WebSocket message:",
                    error,
                );
            }
        };


        socket.onerror = (
            error,
        ) => {
            console.error(
                "Relay WebSocket error:",
                error,
            );
        };


        socket.onclose = () => {
            setIsConnected(false);

            if (heartbeatRef.current) {
                clearInterval(heartbeatRef.current);
                heartbeatRef.current = null;
            }

            console.log(
                "Relay WebSocket disconnected.",
            );

            if (
                conversationId &&
                !intentionalCloseRef.current
            ) {
                setConnectionStatus("reconnecting");
                scheduleReconnect();
            } else {
                setConnectionStatus("disconnected");
            }
        };

        return () => {
            intentionalCloseRef.current = true;

            setIsConnected(false);

            if (heartbeatRef.current) {
                clearInterval(
                    heartbeatRef.current
                );

                heartbeatRef.current = null;
            }

            if (
                reconnectTimeoutRef.current !== null
            ) {
                clearTimeout(
                    reconnectTimeoutRef.current
                );

                reconnectTimeoutRef.current =
                    null;
            }

            socketRef.current =
                null;
        };
    }, [
        conversationId,
        onMessage,
        sendEvent,
        reconnectTrigger,
        scheduleReconnect,
    ]);


    return {
        socketRef,
        sendEvent,
        isConnected,
        connectionStatus
    };
}


