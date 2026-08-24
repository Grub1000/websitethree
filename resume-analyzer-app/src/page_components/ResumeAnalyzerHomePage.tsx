// CSS Styling Import
import "../css/resume_analyzer_css/ResumeAnalyzerHomePage.css"

// React Router Imports
import { useOutletContext } from "react-router-dom";

// Component Imports
import ResumeHistorySmallSection from "../components/resume_analyzer_components/ResumeHistorySmallSection.tsx"
import JobApplicationHistorySmallSection from "../components/job_application_tracker_components/JobApplicationHistorySmallSection.tsx"
import ResumeUploadSection from "../components/resume_analyzer_components/ResumeUploadSection.tsx";

// Image Asset Imports
import plusIcon from "../assets/icons/plus_icon.svg"


export default function ResumeAnalyzerHomePage(){

    const {
        reloadKey,
        reloadResumeHistory,
        loadResumeAnalyses,
        createFormIsVisible,
        setCreateFormIsVisible,
        handleSetCreateFormIsVisible,
    } = useOutletContext<any>();

    return(
        <>
            <h2 className="ResumeAnalyzerDashboardMainSectionTitle">New Uploads</h2>
            <ResumeUploadSection reloadResumeHistory={reloadResumeHistory} loadResumeAnalyses={loadResumeAnalyses}/>

            <h2 className="ResumeAnalyzerDashboardMainSectionTitle">Documents</h2>
            <ResumeHistorySmallSection key={reloadKey} loadResumeAnalyses={loadResumeAnalyses}/>



            <h2 className="ResumeAnalyzerDashboardMainSectionTitle">
                Add Jobs 
                <button className="ResumeAnalyzerDashboardMainSectionAddJobButton" onClick={()=> setCreateFormIsVisible(true)}>
                    <img className="ResumeAnalyzerDashboardMainSectionAddJobButtonIcon" src={plusIcon}></img>
                    <p className="ResumeAnalyzerDashboardMainSectionAddJobButtonTitle">Add Job</p>
                </button>
            </h2>
            <JobApplicationHistorySmallSection createFormIsVisible={createFormIsVisible} handleSetCreateFormIsVisible={handleSetCreateFormIsVisible}/>
        </>
    )
}