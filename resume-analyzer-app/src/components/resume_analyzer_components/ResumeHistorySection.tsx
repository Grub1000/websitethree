import { useEffect, useState } from "react";

import {
    getUserResumes,
    type ResumeListItem,
} from "../../api/resume_service.tsx";

import ResumeCard from "./ResumeCard.tsx";


function ResumeHistorySection(
    {
        loadResumeAnalyses
    }:{
        loadResumeAnalyses: (resumeID: string) => void;
    }
) {
    const [resumes, setResumes] =
        useState<ResumeListItem[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {
        async function loadResumes() {
            try {
                setLoading(true);
                setError("");

                const result =
                    await getUserResumes();

                setResumes(result);

            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Unable to load résumés."
                );

            } finally {
                setLoading(false);
            }
        }

        loadResumes();
    }, []);


    if (loading) {
        return (
            <section className="ResumeHistorySection">
                <p>Loading résumés...</p>
            </section>
        );
    }


    if (error) {
        return (
            <section className="ResumeHistorySection">
                <p className="ResumeHistoryError">
                    {error}
                </p>
            </section>
        );
    }


    return (
        <section className="ResumeHistorySection">
            <h2>Your Résumés</h2>
            
            {resumes.length === 0 ? (
                <p>
                    You have not uploaded any résumés yet.
                </p>
            ) : (
                <div className="ResumeHistoryGrid">
                    {resumes.map((resume) => (
                        <ResumeCard
                            key={resume.resume_id}
                            resume={resume}
                            loadResumeAnalyses={loadResumeAnalyses}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}


export default ResumeHistorySection;