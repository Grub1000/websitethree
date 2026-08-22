import { useState, useEffect } from 'react'

// CSS Style Sheet Import
import "../../css/job_application_tracker/JobApplicationHistorySmallSection.css"
import {getJobApplications, type JobApplication} from "../../api/job_application_service.tsx"


export default function JobApplicationHistorySmallSection(
    
){
    const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    console.log(loading)
    console.log(error)

    useEffect(()=>{
        async function loadJobApplications() {

            try {
                setLoading(true);
                setError("");

                const applications =
                    await getJobApplications();

                setJobApplications(
                    applications
                );

            } catch (error) {

                setError(
                    error instanceof Error
                        ? error.message
                        : "Unable to load job applications."
                );

            } finally {

                setLoading(false);

            }
        }

        loadJobApplications();     

    }, [])






    return(
        <section className="JobApplicationHistorySmallSectionWrapper">
            <div className="JobApplicationHistorySmallSectionColumnNamesWrapper">
                <div className="JobApplicationHistorySmallSectionColumnName">Job Title</div>
                {/* <div className="JobApplicationHistorySmallSectionColumnName">Job</div> */}
                <div className="JobApplicationHistorySmallSectionColumnName">At</div>
                <div className="JobApplicationHistorySmallSectionColumnName">Status</div>
                <div className="JobApplicationHistorySmallSectionColumnName">Last edit</div>
                <div className="JobApplicationHistorySmallSectionColumnName"></div>
            </div>
            {jobApplications.length === 0 ? (
                <p className="JobApplicationHistorySmallSectionNoUploadsMessage">
                    Uploaded jobApplications can be viewed here.
                </p>
            ) : (
                jobApplications.map((jobApplication: JobApplication) => (
                    <div key={jobApplication.application_id} className="JobApplicationHistorySmallSectionRowWrapper">
                        <div className="JobApplicationHistorySmallSectionRowFeatureOne JobApplicationHistorySmallSectionRowFeature">{jobApplication.job_title.length > 24 ? jobApplication.job_title.slice(0, 24) + '...' : jobApplication.job_title}</div>
                        <div className="JobApplicationHistorySmallSectionRowFeatureTwo JobApplicationHistorySmallSectionRowFeature">{jobApplication.company_name.length > 15 ? jobApplication.company_name.slice(0, 15) + '...' : jobApplication.company_name}</div>
                        <div className="JobApplicationHistorySmallSectionRowFeatureThree JobApplicationHistorySmallSectionRowFeature">{jobApplication.status.charAt(0).toUpperCase() + jobApplication.status.slice(1)}
                        </div>
                        <div className="JobApplicationHistorySmallSectionRowFeatureFour JobApplicationHistorySmallSectionRowFeature">{new Date(jobApplication.updated_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                        </div>
                        {/* <div className="ResumeHistoryResumeHistorySmallSectionRowOptionsButtonWrapper">
                            <button className="ResumeHistorySmallSectionRowOptionsButton" onClick={()=> handleDropdown(jobApplication.resume_id)}>...</button>
                            <div className="ResumeHistorySmallSectionRowOptionsDropdown" id={jobApplication.resume_id}>
                                <button className="ResumeHistorySmallSectionRowOptionsDropdownButton">
                                    <img className="ResumeHistorySmallSectionRowOptionsDropdownButtonIcon ResumeHistorySmallSectionRowOptionsDropdownButtonNewAnalysisIcon" src={graphSVG}></img>
                                    <p className="ResumeHistorySmallSectionRowOptionsDropdownButtonText ResumeHistorySmallSectionRowOptionsDropdownButtonNewAnalysisText">New Analysis</p></button>
                                <button className="ResumeHistorySmallSectionRowOptionsDropdownButton" onClick={()=>loadResumeAnalyses(jobApplication.resume_id)}>
                                    <img className="ResumeHistorySmallSectionRowOptionsDropdownButtonIcon ResumeHistorySmallSectionRowOptionsDropdownButtonViewAnalysisIcon" src={documentSVG}></img>
                                    <p className="ResumeHistorySmallSectionRowOptionsDropdownButtonText ResumeHistorySmallSectionRowOptionsDropdownButtonViewAnalysisText">View Analysis</p></button>
                                <button className="ResumeHistorySmallSectionRowOptionsDropdownButton ResumeHistorySmallSectionRowOptionsDropdownButtonDelete" onClick={()=> handleDelete(jobApplication)}>
                                    <img className="ResumeHistorySmallSectionRowOptionsDropdownButtonIcon ResumeHistorySmallSectionRowOptionsDropdownButtonDeleteResumeIcon" src={trashBinSVG} ></img>
                                    <p className="ResumeHistorySmallSectionRowOptionsDropdownButtonText ResumeHistorySmallSectionRowOptionsDropdownButtonDeleteResumeText">Delete</p></button>
                            </div>
                        </div> */}
                    </div>
                ))
            )}



        </section>
        
    )
}

