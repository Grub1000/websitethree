export type ChatUser = {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
};

export type ConversationMember = {
    user_id: number;
    user: ChatUser;
    joined_at: string;
    last_read_message: number | null;
    last_read_at: string | null;
};

export type Message = {
    id: number;
    conversation: string;
    sender_id: number;
    client_message_id: string;
    content: string;
    created_at: string;
    edited_at: string | null;
    deleted_at: string | null;
    delivered_to?: number[];
};

export type Conversation = {
    id: string;
    direct_key: string | null;
    created_at: string;
    updated_at: string;

    members: ConversationMember[];

    other_user: ChatUser | null;

    last_message: Message | null;

    unread_count: number;

    read_receipts: ReadReceipt[];
};

export type ConversationMessageResponse = {
    results: Message[];
    next_cursor: number | null;
    has_more: boolean;
};









// Websocket Event Shapes
export type MessageNewEvent = {
    type: "message.new";
    message: Message;
};

export type MessageDeliveredEvent = {
    type: "message.delivered";
    delivery: {
        message_id: number;
        user_id: number;
        delivered_at: string;
        updated_count: number;
    };
};

export type MessageReadEvent = {
    type: "message.read";
    read: {
        message_id: number;
        user_id: number;
        read_at: string | null;
        updated: boolean;
    };
};

export type TypingUpdateEvent = {
    type: "typing.update";
    user_id: number;
    is_typing: boolean;
};

export type PresenceUpdateEvent = {
    type: "presence.update";
    user_id: number;
    is_online: boolean;
};

export type ChatSocketEvent =
    | MessageNewEvent
    | MessageDeliveredEvent
    | MessageReadEvent
    | TypingUpdateEvent
    | PresenceUpdateEvent;


export type ReadReceipt = {
    user_id: number;
    last_read_message: number | null;
    last_read_at: string | null;
};