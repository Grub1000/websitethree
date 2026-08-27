import {useState, useEffect} from "react"

// CSS Styling Import
import "../css/resume_analyzer_css/SavedJobsPage.css"
import JobKanbanBoard from "../components/job_application_tracker_components/JobKanbanBoard.tsx"

import { type JobApplicationStatus, updateJobApplication, getJobApplications, type JobApplication } from "../api/job_application_service.tsx";



export default function SavedJobsPage(){


    const [jobApplications, setJobApplications] = useState<JobApplication[]>([])

    async function handleStatusChange(
    applicationId: string,
    status: JobApplicationStatus
    ) {
    await updateJobApplication(
        applicationId,
        {
            status,
        }
    );

        const applications =
            await getJobApplications();

        setJobApplications(
            applications
        );
    }
    
    useEffect(()=> {

        async function loadApplications(){
            const applications = await getJobApplications();

            setJobApplications(
                applications
            );
            console.log(jobApplications)
            
        }
        loadApplications()

    }, [])

    async function handleGetJobApplications(){
        const applications =
            await getJobApplications();

        setJobApplications(
            applications
        );
    }

    return(
        <section style={{paddingTop: "30px"}}>
            {/* Saved Jobs Page Coming Soon! */}
            <JobKanbanBoard
                applications={jobApplications}
                onStatusChange={handleStatusChange}
                handleGetJobApplications={handleGetJobApplications}
            />
        </section>
    )
}