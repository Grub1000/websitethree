export interface Document {
    id: number;
    knowledge_base: number;
    filename: string;
    s3_key: string;
    file_size: number;
    page_count: number | null;
    status:
        | "UPLOADING"
        | "PROCESSING"
        | "EMBEDDING"
        | "READY"
        | "FAILED";
    created_at: string;
    updated_at: string;
}