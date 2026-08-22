import { apiFetch } from "./api_service";


export type JobApplicationStatus =
    | "saved"
    | "applied"
    | "interview"
    | "offer"
    | "rejected"
    | "withdrawn";


export type JobApplication = {
    application_id: string;

    company_name: string;
    job_title: string;
    status: JobApplicationStatus;

    job_url: string;
    location: string;

    salary_min: string | null;
    salary_max: string | null;

    date_applied: string | null;

    notes: string;

    resume_id: string | null;
    resume_analysis_id: string | null;

    created_at: string;
    updated_at: string;
};


export type CreateJobApplicationRequest = {
    company_name: string;
    job_title: string;

    status?: JobApplicationStatus;

    job_url?: string;
    location?: string;

    salary_min?: number | null;
    salary_max?: number | null;

    date_applied?: string | null;

    notes?: string;

    resume_id?: string | null;
    resume_analysis_id?: string | null;
};


export type UpdateJobApplicationRequest =
    Partial<CreateJobApplicationRequest>;


/*
    Retrieve all job applications belonging
    to the currently authenticated user.
*/
export async function getJobApplications():
Promise<JobApplication[]> {

    const response = await apiFetch(
        "/job-applications/",
        {
            method: "GET",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail ??
            "Unable to load job applications."
        );
    }

    return data;
}


/*
    Retrieve one job application using
    its public application UUID.
*/
export async function getJobApplication(
    applicationId: string
): Promise<JobApplication> {

    const response = await apiFetch(
        `/job-applications/${applicationId}/`,
        {
            method: "GET",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail ??
            "Unable to load job application."
        );
    }

    return data;
}


/*
    Create a new job application.
*/
export async function createJobApplication(
    application: CreateJobApplicationRequest
): Promise<JobApplication> {

    const response = await apiFetch(
        "/job-applications/",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(
                application
            ),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail ??
            "Unable to create job application."
        );
    }

    return data;
}


/*
    Partially update an existing job application.

    PATCH only changes fields included in
    the request object.
*/
export async function updateJobApplication(
    applicationId: string,
    updates: UpdateJobApplicationRequest
): Promise<JobApplication> {

    const response = await apiFetch(
        `/job-applications/${applicationId}/`,
        {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(
                updates
            ),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail ??
            "Unable to update job application."
        );
    }

    return data;
}


/*
    Delete a job application belonging
    to the authenticated user.
*/
export async function deleteJobApplication(
    applicationId: string
): Promise<void> {

    const response = await apiFetch(
        `/job-applications/${applicationId}/`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {

        let errorMessage =
            "Unable to delete job application.";

        try {
            const data =
                await response.json();

            errorMessage =
                data.detail ??
                errorMessage;

        } catch {
            // Some DELETE responses may not
            // contain a JSON response body.
        }

        throw new Error(
            errorMessage
        );
    }
}