import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    completeDocumentUpload,
    deleteDocument,
    getDocuments,
    presignDocumentUpload,
    uploadDocumentToS3,
} from "../../api/documentsApi";

import type {
    Document,
} from "../../types/document";

import "./DocumentsView.css";


interface DocumentsViewProps {
    spaceId: number;
}


function DocumentsView({
    spaceId,
}: DocumentsViewProps) {
    const [
        documents,
        setDocuments,
    ] = useState<Document[]>([]);

    const [
        deleteTarget,
        setDeleteTarget,
    ] = useState<Document | null>(
        null
    );

    const [
        deleting,
        setDeleting,
    ] = useState(false);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState<string | null>(
        null,
    );

    const fileInputRef =
        useRef<HTMLInputElement | null>(
            null
        );

    type UploadStage =
        | "idle"
        | "uploading"
        | "processing";

    const [
        uploadStage,
        setUploadStage,
    ] = useState<UploadStage>("idle");

    const uploading =
        uploadStage !== "idle";

    const [
        uploadError,
        setUploadError,
    ] = useState<string | null>(
        null
    );

    useEffect(() => {
        loadDocuments();
    }, [spaceId]);

    async function loadDocuments() {
        try {
            setLoading(true);
            setError(null);

            const loadedDocuments =
                await getDocuments();

            const spaceDocuments =
                loadedDocuments.filter(
                    (document) =>
                        document.knowledge_base ===
                        spaceId
                );

            setDocuments(
                spaceDocuments
            );

        } catch (error) {
            console.error(error);

            setError(
                "Unable to load documents."
            );

        } finally {
            setLoading(false);
        }
    }

    async function handleFileUpload(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }


        if (
            file.type !== "application/pdf"
        ) {
            setUploadError(
                "Only PDF files are supported."
            );

            event.target.value = "";

            return;
        }


        if (
            file.size >
            10 * 1024 * 1024
        ) {
            setUploadError(
                "PDF files cannot exceed 10 MB."
            );

            event.target.value = "";

            return;
        }


        try {
            setUploadStage("uploading");
            setUploadError(null);

            const presigned =
                await presignDocumentUpload(
                    spaceId,
                    file
                );

            await uploadDocumentToS3(
                presigned.upload_url,
                file
            );

            setUploadStage("processing");

            await completeDocumentUpload(
                presigned.document_id
            );

            await loadDocuments();

        } catch (error) {
            console.error(error);

            if (error instanceof Error) {
                setUploadError(
                    error.message
                );
            } else {
                setUploadError(
                    "Unable to upload document."
                );
            }

        } finally {
            setUploadStage("idle");

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    }



    async function handleDeleteDocument() {
        if (!deleteTarget) {
            return;
        }

        try {
            setDeleting(true);
            setUploadError(null);

            await deleteDocument(
                deleteTarget.id
            );

            setDocuments(
                (currentDocuments) =>
                    currentDocuments.filter(
                        (document) =>
                            document.id !==
                            deleteTarget.id
                    )
            );

            setDeleteTarget(null);

        } catch (error) {
            console.error(error);

            if (error instanceof Error) {
                setUploadError(
                    error.message
                );
            } else {
                setUploadError(
                    "Unable to delete document."
                );
            }

        } finally {
            setDeleting(false);
        }
    }


    function formatFileSize(
        bytes: number,
    ) {
        if (bytes < 1024) {
            return `${bytes} B`;
        }

        if (bytes < 1024 * 1024) {
            return `${(
                bytes / 1024
            ).toFixed(1)} KB`;
        }

        return `${(
            bytes /
            (1024 * 1024)
        ).toFixed(1)} MB`;
    }


    function formatStatus(
        status: Document["status"],
    ) {
        switch (status) {
            case "UPLOADING":
                return "Uploading";

            case "PROCESSING":
                return "Processing";

            case "EMBEDDING":
                return "Embedding";

            case "READY":
                return "Ready";

            case "FAILED":
                return "Failed";

            default:
                return status;
        }
    }


    if (loading) {
        return (
            <div className="documents-state">
                Loading documents...
            </div>
        );
    }


    if (error) {
        return (
            <div className="documents-state documents-state-error">
                {error}
            </div>
        );
    }


    return (
        <div className="documents-view">
            <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                hidden
            />
            <div className="documents-header">

                <div>
                    <h2>
                        Documents
                    </h2>

                    <p>
                        Add PDFs to give this
                        Space knowledge to work with.
                    </p>
                </div>


               <button
                    className="documents-upload-button"
                    type="button"
                    disabled={uploading}
                    onClick={() =>
                        fileInputRef.current?.click()
                    }
                >
                    {uploadStage === "uploading"
                    ? "Uploading..."
                    : uploadStage === "processing"
                        ? "Processing..."
                        : "+ Upload PDF"}
                </button>

            </div>

            {uploadStage !== "idle" && (
                <div className="document-upload-progress">

                    <div className="document-upload-spinner" />

                    <div className="document-upload-progress-text">

                        <strong>
                            {uploadStage === "uploading"
                                ? "Uploading PDF"
                                : "Processing document"}
                        </strong>

                        <span>
                            {uploadStage === "uploading"
                                ? "Sending your document securely to storage..."
                                : "Extracting text, creating embeddings, and preparing it for chat..."}
                        </span>

                    </div>

                </div>
            )}
            {uploadError && (
                <div className="documents-upload-error">
                    {uploadError}
                </div>
            )}

            {documents.length === 0 ? (

                <div className="documents-empty">

                    <div className="documents-empty-icon">
                        □
                    </div>

                    <h3>
                        No documents yet
                    </h3>

                    <p>
                        Upload a PDF to begin
                        building this Space's
                        knowledge base.
                    </p>

                    <button
                        className="documents-upload-button"
                        type="button"
                        disabled={uploading}
                        onClick={() =>
                            fileInputRef.current?.click()
                        }
                    >
                        {uploading
                            ? "Uploading..."
                            : "Upload PDF"}
                    </button>

                </div>

            ) : (

                <div className="documents-list">

                    {documents.map(
                        (document) => (

                            <div
                                className="document-row"
                                key={document.id}
                            >

                                <div className="document-icon">
                                    PDF
                                </div>


                                <div className="document-info">

                                    <div className="document-name">
                                        {document.filename}
                                    </div>

                                    <div className="document-meta">

                                        <span>
                                            {formatFileSize(
                                                document.file_size,
                                            )}
                                        </span>

                                        {document.page_count !== null && (
                                            <>
                                                <span>
                                                    ·
                                                </span>

                                                <span>
                                                    {
                                                        document.page_count
                                                    }{" "}
                                                    {
                                                        document.page_count === 1
                                                            ? "page"
                                                            : "pages"
                                                    }
                                                </span>
                                            </>
                                        )}

                                    </div>

                                </div>


                                <div
                                    className={
                                        `document-status ${
                                            document.status.toLowerCase()
                                        }`
                                    }
                                >
                                    {formatStatus(
                                        document.status,
                                    )}
                                </div>


                                <button
                                    className="document-menu-button"
                                    type="button"
                                    aria-label={
                                        `Delete ${document.filename}`
                                    }
                                    onClick={() =>
                                        setDeleteTarget(document)
                                    }
                                >
                                    ⋯
                                </button>

                            </div>

                        )
                    )}

                </div>

            )}
            {deleteTarget && (
                <div
                    className="document-delete-backdrop"
                    onClick={() => {
                        if (!deleting) {
                            setDeleteTarget(null);
                        }
                    }}
                >
                    <div
                        className="document-delete-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >
                        <h3>
                            Delete document?
                        </h3>

                        <p>
                            <strong>
                                {deleteTarget.filename}
                            </strong>{" "}
                            will be permanently removed
                            from this Space.
                        </p>

                        <p className="document-delete-warning">
                            Its PDF, indexed vectors,
                            and document record will
                            also be deleted.
                        </p>

                        <div className="document-delete-actions">

                            <button
                                type="button"
                                className="document-delete-cancel"
                                disabled={deleting}
                                onClick={() =>
                                    setDeleteTarget(null)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="document-delete-confirm"
                                disabled={deleting}
                                onClick={
                                    handleDeleteDocument
                                }
                            >
                                {deleting
                                    ? "Deleting..."
                                    : "Delete"}
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


export default DocumentsView;