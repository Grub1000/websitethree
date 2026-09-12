const WS_BASE_URL =
    import.meta.env.VITE_WS_BASE_URL;


export function createChatSocket(
    conversationId: string,
) {
    const accessToken =
        localStorage.getItem("access");

    if (!accessToken) {
        throw new Error(
            "No access token found.",
        );
    }

    const socketUrl =
        `${WS_BASE_URL}/ws/chat/${conversationId}/?token=${accessToken}`;

    return new WebSocket(
        socketUrl,
    );
}

export function createUserChatSocket() {
    const accessToken =
        localStorage.getItem("access");

    if (!accessToken) {
        throw new Error(
            "No access token found.",
        );
    }

    return new WebSocket(
        `${WS_BASE_URL}/ws/chat/?token=${accessToken}`,
    );
}