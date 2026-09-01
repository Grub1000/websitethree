import { apiFetch } from "./apiClient";

import type {
    Document,
} from "../types/document";


export async function getDocuments(): Promise<Document[]> {
    const response = await apiFetch(
        "/documents/"
    );

    if (!response.ok) {
        throw new Error(
            "Unable to load documents."
        );
    }

    return response.json();
}


export async function presignDocumentUpload(
    spaceId: number,
    file: File,
): Promise<{
    document_id: number;
    upload_url: string;
    s3_key: string;
}> {
    const response = await apiFetch(
        "/documents/presign/",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                knowledge_base: spaceId,
                filename: file.name,
                content_type: file.type,
                file_size: file.size,
            }),
        }
    );

    if (!response.ok) {
        const data = await response.json();

        throw new Error(
            data.detail ??
            "Unable to prepare document upload."
        );
    }

    return response.json();
}


export async function uploadDocumentToS3(
    uploadUrl: string,
    file: File,
): Promise<void> {
    const response = await fetch(
        uploadUrl,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/pdf",
            },

            body: file,
        }
    );

    if (!response.ok) {
        throw new Error(
            "Unable to upload PDF to storage."
        );
    }
}


export async function completeDocumentUpload(
    documentId: number,
): Promise<Document> {
    const response = await apiFetch(
        `/documents/${documentId}/complete/`,
        {
            method: "POST",
        }
    );

    if (!response.ok) {
        const data = await response.json();

        throw new Error(
            data.detail ??
            "Unable to process uploaded PDF."
        );
    }

    return response.json();
}


export async function deleteDocument(
    documentId: number,
): Promise<void> {
    const response = await apiFetch(
        `/documents/${documentId}/`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        const data = await response.json();

        throw new Error(
            data.detail ??
            "Unable to delete document."
        );
    }
}


export async function getDocumentViewUrl(
    documentId: number,
): Promise<string> {
    const response = await apiFetch(
        `/documents/${documentId}/view/`
    );

    if (!response.ok) {
        const data =
            await response.json();

        throw new Error(
            data.detail ??
            "Unable to open document."
        );
    }

    const data = await response.json();

    return data.url;
}