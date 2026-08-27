import { useEffect, useState } from "react";

import {getUserResumes, deleteResume, type ResumeListItem,} from "../../api/resume_service.tsx";

import ConfirmDelete from "../resume_analyzer_components/ConfirmDelete.tsx"

import "../../css/resume_analyzer_css/ResumeHistorySmallSection.css"

import trashBinSVG from "../../assets/trash_bin_svg.svg"
import graphSVG from "../../assets/graph_svg.svg"
import documentSVG from "../../assets/document_svg.svg"

export default function ResumeHistorySmallSection({
    loadResumeAnalyses
}:{
    loadResumeAnalyses: (resumeID:string)=> void}
){
    const [resumes, setResumes] =
        useState<ResumeListItem[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");



    const [confirmDeletePopUp, setConfirmDeletePopUp] = useState(false) // State Needed for Confirm Delete Pop Up Component

    const [activeResumeID, setActiveResumeID] = useState("") // State Needed for Confirm Delete Pop Up Component

    const [activeResumeName, setActiveResumeName] = useState("") // State Needed for Confirm Delete Pop Up Component
    // const [activeId, setActiveId] = useState<string | null>(null);
    // const activeContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {   
        console.log("Reloading Resume History")
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

    async function handleDelete(resumeID: string){
        try {

            await deleteResume(
                resumeID
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
        selectedDropdown.style.display = "flex"
    }
    // initiateDropdownListenerHandlers()


    function handleToggleConfirmDeletePopUp(bool: boolean){ // Function Needed for Confirm Delete Pop Up Component
        setConfirmDeletePopUp(bool)
        }
    
    async function handleResumeDelete(id:string){ // Function Needed for Confirm Delete Pop Up Component
        await handleDelete(id)
        loadResumes()
        setActiveResumeID("")
        setActiveResumeName("")
    }

    function handleCancelDelete(){  // Function Needed for Confirm Delete Pop Up Component
        setConfirmDeletePopUp(false)
        setActiveResumeID("")
        setActiveResumeName("")
    }









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
                <p className="ResumeHistorySmallSectionNoUploadsMessage">
                    Uploaded resumes can be viewed here.
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
                                <button className="ResumeHistorySmallSectionRowOptionsDropdownButton">
                                    <img className="ResumeHistorySmallSectionRowOptionsDropdownButtonIcon ResumeHistorySmallSectionRowOptionsDropdownButtonNewAnalysisIcon" src={graphSVG}></img>
                                    <p className="ResumeHistorySmallSectionRowOptionsDropdownButtonText ResumeHistorySmallSectionRowOptionsDropdownButtonNewAnalysisText">New Analysis</p></button>
                                <button className="ResumeHistorySmallSectionRowOptionsDropdownButton" onClick={()=>loadResumeAnalyses(resume.resume_id)}>
                                    <img className="ResumeHistorySmallSectionRowOptionsDropdownButtonIcon ResumeHistorySmallSectionRowOptionsDropdownButtonViewAnalysisIcon" src={documentSVG}></img>
                                    <p className="ResumeHistorySmallSectionRowOptionsDropdownButtonText ResumeHistorySmallSectionRowOptionsDropdownButtonViewAnalysisText">View Analysis</p></button>
                                <button className="ResumeHistorySmallSectionRowOptionsDropdownButton ResumeHistorySmallSectionRowOptionsDropdownButtonDelete" onClick={()=> {
                                                                            setActiveResumeID(resume.resume_id)
                                                                            setActiveResumeName(resume.original_filename.length > 20 ? resume.original_filename.slice(0, 20) + '...' : resume.original_filename)
                                                                            setConfirmDeletePopUp(true);
                                                                            }}>
                                    <img className="ResumeHistorySmallSectionRowOptionsDropdownButtonIcon ResumeHistorySmallSectionRowOptionsDropdownButtonDeleteResumeIcon" src={trashBinSVG} ></img>
                                    <p className="ResumeHistorySmallSectionRowOptionsDropdownButtonText ResumeHistorySmallSectionRowOptionsDropdownButtonDeleteResumeText">Delete</p></button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        {confirmDeletePopUp && <ConfirmDelete itemName={activeResumeName} itemID={activeResumeID} handleDelete={handleResumeDelete} handleCancelDelete={handleCancelDelete} handleToggleConfirmDeletePopUp={handleToggleConfirmDeletePopUp} />}
        </section>
    )
}

