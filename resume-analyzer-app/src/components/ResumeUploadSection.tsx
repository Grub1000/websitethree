import { useRef, useState } from "react";
import { uploadResume } from "../api/resume_service";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_FILE_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function ResumeUploadSection() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [resumeId, setResumeId] = useState("");

    function validateFile(file: File): string | null {
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            return "Only PDF and DOCX files are supported.";
        }

        if (file.size === 0) {
            return "The selected file is empty.";
        }

        if (file.size > MAX_FILE_SIZE) {
            return "Résumé files cannot exceed 10 MB.";
        }

        return null;
    }

    function handleFileChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setMessage("");
        setError("");
        setResumeId("");

        const file = event.target.files?.[0];

        if (!file) {
            setSelectedFile(null);
            return;
        }

        const validationError = validateFile(file);

        if (validationError) {
            setSelectedFile(null);
            setError(validationError);
            event.target.value = "";
            return;
        }

        setSelectedFile(file);
    }

    async function handleUpload() {
        if (!selectedFile) {
            setError("Select a résumé before uploading.");
            return;
        }

        setUploading(true);
        setMessage("");
        setError("");
        setResumeId("");

        try {
            const result = await uploadResume(selectedFile);

            setResumeId(result.resume_id);
            setMessage("Résumé uploaded successfully.");
            setSelectedFile(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "The résumé upload failed."
            );
        } finally {
            setUploading(false);
        }
    }

    return (
        <main className="ResumeUploadSection">
            <section className="ResumeUploadCard">
                <h1>Upload Your Résumé</h1>

                <p>
                    Upload a PDF or DOCX file up to 10 MB.
                </p>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileChange}
                    disabled={uploading}
                />

                {selectedFile && (
                    <div className="ResumeSelectedFile">
                        <p>{selectedFile.name}</p>

                        <p>
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                    </div>
                )}

                <button
                    type="button"
                    onClick={handleUpload}
                    disabled={uploading || !selectedFile}
                >
                    {uploading ? "Uploading..." : "Upload Résumé"}
                </button>

                {message && (
                    <p className="ResumeUploadSuccess">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="ResumeUploadError">
                        {error}
                    </p>
                )}

                {resumeId && (
                    <p>
                        Resume ID: {resumeId}
                    </p>
                )}
            </section>
        </main>
    );
}

export default ResumeUploadSection;