import { useEffect, useState } from "react";

import {getUserResumes, deleteResume, type ResumeListItem,} from "../api/resume_service.tsx";



import "../css/resume_analyzer_css/ResumeHistorySmallSection.css"


export default function ResumeHistorySmallSection(){
    const [resumes, setResumes] =
        useState<ResumeListItem[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    // const [activeId, setActiveId] = useState<string | null>(null);
    // const activeContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {   
        function handleClick(event: MouseEvent) {
            const target = event.target as HTMLElement;
            console.log("clicked")
            if (
                !target.closest(".ResumeHistorySmallSectionRowOptionsDropdown") &&
                !target.closest(".ResumeHistorySmallSectionRowOptionsButton")
            ) {
                document
                    .querySelectorAll<HTMLElement>(".ResumeHistorySmallSectionRowOptionsDropdown")
                    .forEach(dropdown => {
                        dropdown.style.display = "none";
                    });
            }
        }

        document.addEventListener("mousedown", handleClick);

        // return () => {
        //     document.removeEventListener("mousedown", handleClick);
        // };

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

        // Before I destroy this component (or before rerunning this effect), call this method (return). Prevents Memory Leak
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    if (loading) {
        return (
            <section className="ResumeHistorySection">
                <p>Loading résumés...</p>
            </section>
        );
    }

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

    if (error) {
        return (
            <section className="ResumeHistorySection">
                <p className="ResumeHistoryError">
                    {error}
                </p>
            </section>
        );
    }

    async function handleDelete(resume: ResumeListItem){
        try {

            await deleteResume(
                resume.resume_id
            );

            await loadResumes();

        }
        catch (error) {

            console.error(error);

        }
    }

    function handleDropdown(id: string){
        const allDropdowns = document.querySelectorAll<HTMLElement>(".ResumeHistorySmallSectionRowOptionsDropdown")
        allDropdowns.forEach((dropdown: HTMLElement)=>{
            dropdown.style.display = "none"
        })
        const selectedDropdown = document.getElementById(id) as HTMLElement
        selectedDropdown.style.display = "block"
    }
    // initiateDropdownListenerHandlers()
    return(
        // initiateDropdownListenerHandlers(),
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
                resumes.map((resume: ResumeListItem) => (
                        <div key={resume.resume_id} className="ResumeHistorySmallSectionRowWrapper">
                            <div className="ResumeHistorySmallSectionRowFeatureOne ResumeHistorySmallSectionRowFeature">{resume.original_filename.length > 24 ? resume.original_filename.slice(0, 24) + '...' : resume.original_filename}</div>
                            <div className="ResumeHistorySmallSectionRowFeatureTwo ResumeHistorySmallSectionRowFeature">{resume.content_type.length > 15 ? resume.content_type.slice(0, 15) + '...' : resume.content_type}</div>
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
                            <div className="ResumeHistoryResumeHistorySmallSectionRowOptionsButtonWrapper">
                                <button className="ResumeHistorySmallSectionRowOptionsButton" onClick={()=> handleDropdown(resume.resume_id)}>...</button>
                                <div className="ResumeHistorySmallSectionRowOptionsDropdown" id={resume.resume_id}>
                                    <button onClick={()=> handleDelete(resume)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
            )}
        </section>
    )
}

