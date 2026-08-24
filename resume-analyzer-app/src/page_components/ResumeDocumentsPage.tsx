import { useEffect, useState } from "react";

import {getUserResumes, type ResumeListItem} from "../api/resume_service.tsx";

// CSS Styling Import
import "../css/resume_analyzer_css/ResumeDocumentsPage.css"

// Component Imports
import ResumeCard from "../components/resume_analyzer_components/ResumeCard.tsx";


export default function ResumeDocumentsPage(

){
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
        <section className="ResumeDocumentsPageSectionWrapper"> 
            <h2 className="ResumeDocumentsPageSectionHeaderText">Your Resumes</h2>
            
            {resumes.length === 0 ? (
                <p className="ResumeDocumentsPageSectionNoUploadsMessage">
                    Uploaded resumes can be viewed here.
                </p>
            ) : (
                <div className="ResumeDocumentsPageHistoryGrid">
                    {resumes.map((resume) => (
                        <ResumeCard
                            key={resume.resume_id}
                            resume={resume}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}