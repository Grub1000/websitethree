import { apiFetch } from "./api_service";


export type ResumeUploadRequestResponse = {
    resume_id: string;
    status: string;

    upload: {
        url: string;
        fields: Record<string, string>;
        expires_in: number;
    };
};


export type ResumeUploadCompleteResponse = {
    resume_id: string;
    status: string;
    uploaded_at: string;
};


export async function requestResumeUpload(
    file: File
): Promise<ResumeUploadRequestResponse> {

    const response = await apiFetch(
        "/resumes/upload-request/",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                filename: file.name,
                content_type: file.type,
                file_size: file.size,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.filename?.[0] ??
            data.content_type?.[0] ??
            data.file_size?.[0] ??
            data.detail ??
            "Unable to prepare the résumé upload."
        );
    }

    return data;
}


export async function uploadResumeToS3(
    file: File,
    uploadUrl: string,
    uploadFields: Record<string, string>
): Promise<void> {

    const formData = new FormData();

    Object.entries(uploadFields).forEach(
        ([key, value]) => {
            formData.append(key, value);
        }
    );

    formData.append("file", file);

    const response = await fetch(
        uploadUrl,
        {
            method: "POST",
            body: formData,
        }
    );

    if (!response.ok) {
        const errorText = await response.text();

        console.error(
            "S3 upload failed:",
            errorText
        );

        throw new Error(
            "Failed to upload résumé to storage."
        );
    }
}


export async function confirmResumeUpload(
    resumeId: string
): Promise<ResumeUploadCompleteResponse> {

    const response = await apiFetch(
        "/resumes/upload-complete/",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                resume_id: resumeId,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail ??
            "Unable to confirm the résumé upload."
        );
    }

    return data;
}


export async function uploadResume(
    file: File
): Promise<ResumeUploadCompleteResponse> {

    const uploadRequest =
        await requestResumeUpload(file);

    await uploadResumeToS3(
        file,
        uploadRequest.upload.url,
        uploadRequest.upload.fields
    );

    return confirmResumeUpload(
        uploadRequest.resume_id
    );
}

export type ResumeExtractionResponse = {
    resume_id: string;
    status: string;
    character_count: number;
    word_count: number;
    preview: string;
};

export async function extractResumeText(
    resumeId: string
): Promise<ResumeExtractionResponse> {

    const response = await apiFetch(
        `/resumes/${resumeId}/extract/`,
        {
            method: "POST",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail ??
            "Unable to extract résumé text."
        );
    }

    return data;
}

export type ResumeAnalysisResponse = {
    analysis_id: string;
    resume_id: string;
    status: string;

    scores: {
        overall: number;
        ats: number;
        keywords: number;
        experience: number;
        skills: number;
    };

    strengths: string[];
    weaknesses: string[];
    missing_keywords: string[];
    recommendations: string[];
};


export async function analyzeResume(
    resumeId: string,
    jobTitle: string = "",
    jobDescription: string = ""
): Promise<ResumeAnalysisResponse> {

    const response = await apiFetch(
        `/resumes/${resumeId}/analyze/`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                job_title: jobTitle,
                job_description: jobDescription,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail ??
            "Unable to analyze résumé."
        );
    }

    return data;
}

export type ResumeListItem = {
    resume_id: string;
    original_filename: string;
    content_type: string;
    file_size: number;
    status: string;
    has_thumbnail: boolean;
    created_at: string;
    uploaded_at: string | null;
    updated_at: string;
};

export async function getUserResumes(): Promise<ResumeListItem[]> {
    const response = await apiFetch(
        "/resumes/",
        {
            method: "GET",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail ??
            "Unable to load résumés."
        );
    }

    return data;
}

export type ResumeThumbnailResponse = {
    resume_id: string;
    thumbnail_url: string;
    expires_in: number;
};

export async function getResumeThumbnailUrl(
    resumeId: string
): Promise<ResumeThumbnailResponse> {
    const response = await apiFetch(
        `/resumes/${resumeId}/thumbnail-url/`,
        {
            method: "GET",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail ??
            "Unable to load résumé thumbnail."
        );
    }

    return data;
}