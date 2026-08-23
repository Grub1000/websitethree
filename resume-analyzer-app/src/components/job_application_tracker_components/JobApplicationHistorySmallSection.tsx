import { useState, useEffect } from 'react'

// Component Imports
import JobApplicationCreateFormPopUp from "../job_application_tracker_components/JobApplicationCreateFormPopUp.tsx"


// CSS Style Sheet Import
import "../../css/job_application_tracker/JobApplicationHistorySmallSection.css"
import {getJobApplications, type JobApplication, deleteJobApplication} from "../../api/job_application_service.tsx"

// Image Imports
import graphSVG from "../../assets/graph_svg.svg"
import documentSVG from "../../assets/document_svg.svg"
import trashBinSVG from "../../assets/trash_bin_svg.svg"



export default function JobApplicationHistorySmallSection(
{
    createFormIsVisible,
    handleSetCreateFormIsVisible
}:{
    createFormIsVisible: boolean,
    handleSetCreateFormIsVisible: (state: boolean) => void
}
){
    const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    console.log(loading)
    console.log(error)

    useEffect(()=>{
        console.log("Reloading Resume History")
        function handleClick(event: MouseEvent) {
            const target = event.target as HTMLElement;
            console.log("clicked")
            if (
                !target.closest(".JobApplicationHistorySmallSectionRowOptionsDropdown") &&
                !target.closest(".JobApplicationHistorySmallSectionRowOptionsButton")
            ) {
                document
                    .querySelectorAll<HTMLElement>(".JobApplicationHistorySmallSectionRowOptionsDropdown")
                    .forEach(dropdown => {
                        dropdown.style.display = "none";
                    });
            }
        }

        document.addEventListener("mousedown", handleClick);


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

        // Before I destroy this component (or before rerunning this effect), call this method (return). Prevents Memory Leak
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [])

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

    function handleDropdown(id: string){
        const allDropdowns = document.querySelectorAll<HTMLElement>(".JobApplicationHistorySmallSectionRowOptionsDropdown")
        allDropdowns.forEach((dropdown: HTMLElement)=>{
            dropdown.style.display = "none"
        })
        const selectedDropdown = document.getElementById(id) as HTMLElement
        selectedDropdown.style.display = "flex"
    }

    async function handleDelete(jobApplication: JobApplication){
            try {
    
                await deleteJobApplication(
                    jobApplication.application_id
                );
    
                await loadJobApplications();
    
            }
            catch (error) {
    
                console.error(error);
    
            }
        }


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
                    Uploaded Job Applications can be viewed here.
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
                        <div className="JobApplicationHistorySmallSectionRowOptionsButtonWrapper">
                            <button className="JobApplicationHistorySmallSectionRowOptionsButton" onClick={()=> handleDropdown(jobApplication.application_id)}>...</button>
                            <div className="JobApplicationHistorySmallSectionRowOptionsDropdown" id={jobApplication.application_id}>
                                <button className="JobApplicationHistorySmallSectionRowOptionsDropdownButton">
                                    <img className="JobApplicationHistorySmallSectionRowOptionsDropdownButtonIcon JobApplicationHistorySmallSectionRowOptionsDropdownButtonNewAnalysisIcon" src={graphSVG}></img>
                                    <p className="JobApplicationHistorySmallSectionRowOptionsDropdownButtonText JobApplicationHistorySmallSectionRowOptionsDropdownButtonNewAnalysisText">Edit Job</p></button>
                                <button className="JobApplicationHistorySmallSectionRowOptionsDropdownButton">
                                    <img className="JobApplicationHistorySmallSectionRowOptionsDropdownButtonIcon JobApplicationHistorySmallSectionRowOptionsDropdownButtonViewAnalysisIcon" src={documentSVG}></img>
                                    <p className="JobApplicationHistorySmallSectionRowOptionsDropdownButtonText JobApplicationHistorySmallSectionRowOptionsDropdownButtonViewAnalysisText">Change Status</p></button>
                                <button className="JobApplicationHistorySmallSectionRowOptionsDropdownButton JobApplicationHistorySmallSectionRowOptionsDropdownButtonDelete" onClick={()=> handleDelete(jobApplication)}>
                                    <img className="JobApplicationHistorySmallSectionRowOptionsDropdownButtonIcon JobApplicationHistorySmallSectionRowOptionsDropdownButtonDeleteJobApplicationIcon" src={trashBinSVG} ></img>
                                    <p className="JobApplicationHistorySmallSectionRowOptionsDropdownButtonText JobApplicationHistorySmallSectionRowOptionsDropdownButtonDeleteJobApplicationText">Delete</p></button>
                            </div>
                        </div>
                    </div>
                ))
            )}


            {createFormIsVisible && <JobApplicationCreateFormPopUp handleSetCreateFormIsVisible={handleSetCreateFormIsVisible}/>}
        </section>
        
    )
}

