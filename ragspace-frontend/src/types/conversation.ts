export interface Conversation {
    id: number;
    knowledge_base: number;
    title: string;
    created_at: string;
    updated_at: string;
}


export interface MessageSource {
    document_id?: number;
    filename?: string;
    page_number?: number;
    chunk_index?: number;
}


export interface Message {
    id: number;

    role:
        | "USER"
        | "ASSISTANT";

    content: string;

    sources: MessageSource[];

    created_at: string;
}


export interface AskResponse {
    answer: string;

    conversation:
        | number
        | Conversation;

    sources: MessageSource[];
}