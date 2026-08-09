import { useEffect, useState } from "react";

import {getUserResumes, type ResumeListItem,} from "../api/resume_service.tsx";


import "../css/resume_analyzer_css/ResumeHistorySmallSection.css"


export default function ResumeHistorySmallSection(){
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

    return(
        <section className="ResumeHistorySmallSectionWrapper">
            <div className="ResumeHistorySmallSectionColumnNamesWrapper">
                <div className="ResumeHistorySmallSectionColumnName">Name</div>
                {/* <div className="ResumeHistorySmallSectionColumnName">Job</div> */}
                <div className="ResumeHistorySmallSectionColumnName">Type</div>
                <div className="ResumeHistorySmallSectionColumnName">Created at</div>
                <div className="ResumeHistorySmallSectionColumnName">Last edit</div>
                <div className="ResumeHistorySmallSectionColumnName"></div>
            </div>
            {resumes.length === 0 ? (
                <p>
                    You have not uploaded any résumés yet.
                </p>
            ) : (
                resumes.map((resume) => (
                        <div className="ResumeHistorySmallSectionRowWrapper">
                            <div className="ResumeHistorySmallSectionRowFeatureOne ResumeHistorySmallSectionRowFeature">{resume.original_filename}</div>
                            <div className="ResumeHistorySmallSectionRowFeatureTwo ResumeHistorySmallSectionRowFeature">{resume.content_type}</div>
                            <div className="ResumeHistorySmallSectionRowFeatureThree ResumeHistorySmallSectionRowFeature">{new Date(resume.created_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                            </div>
                            <div className="ResumeHistorySmallSectionRowFeatureFour ResumeHistorySmallSectionRowFeature">{new Date(resume.updated_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                            </div>
                        </div>
                    ))
            )}
        </section>
    )
}