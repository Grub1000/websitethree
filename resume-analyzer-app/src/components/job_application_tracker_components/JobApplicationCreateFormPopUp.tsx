import {useState} from 'react'


// CSS Styling Sheet Import
import "../../css/job_application_tracker/JobApplicationCreateFormPopUp.css"

// Job Application Service Functions Imports
import {createJobApplication} from "../../api/job_application_service"

// Image Imports
import exitIcon from "../../assets/burger_menu_exit_svg.svg"





export default function JobApplicationCreateFormPopUp(
    {
        handleSetCreateFormIsVisible,
        loadJobApplications,
    }:{
        handleSetCreateFormIsVisible: (state: boolean) => void,
        loadJobApplications: () => void        
    }
){  

    const [companyName, setCompanyName] = useState("");
    const [jobTitle, setJobTitle] = useState("");



    async function onSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault()
        await createJobApplication({company_name: companyName, job_title: jobTitle})
        loadJobApplications()
        handleSetCreateFormIsVisible(false)
    }

    return(
        <div className="JobApplicationCreateFormPopUpWrapper">  
            <form className="JobApplicationCreateForm" onSubmit={(e)=>onSubmit(e)}>   
                <button onClick={()=> handleSetCreateFormIsVisible(false)} className="JobApplicationCreateFormPopUpExitButton">
                    <img className="JobApplicationCreateFormPopUpExitButtonIcon" src={exitIcon}></img>
                </button>   
                <h1 className="JobApplicationCreateFormHeadingText">Add Job</h1>  
                <input 
                className="JobApplicationCreateFormInput"
                value={companyName}
                onChange={
                    e => setCompanyName(e.target.value)
                }
                placeholder="Company Name"
                />
                <input
                className="JobApplicationCreateFormInput"
                value={jobTitle}
                onChange={
                    e => setJobTitle(e.target.value)
                } 
                placeholder="Job Title"
                />
                <button className="JobApplicationCreateFormSubmitButton" type="submit">Create</button>
            </form>
        </div>
    )
}