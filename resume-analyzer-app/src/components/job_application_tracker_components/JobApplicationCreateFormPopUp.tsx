import {useState} from 'react'
import "../../css/job_application_tracker/JobApplicationCreateFormPopUp.css"
import {createJobApplication} from "../../api/job_application_service"


export default function JobApplicationCreateFormPopUp(
    {
        handleSetCreateFormIsVisible,
    }:{
        handleSetCreateFormIsVisible: (state: boolean) => void        
    }
){  

    const [companyName, setCompanyName] = useState("");
    const [jobTitle, setJobTitle] = useState("");



    function onSubmit(){
        createJobApplication({company_name: companyName, job_title: jobTitle})
    }

    return(
        <div className="JobApplicationCreateFormPopUpWrapper">
            <div onClick={()=> handleSetCreateFormIsVisible(false)}>Exit</div>
                
            <form className="JobApplicationCreateForm" onSubmit={()=>onSubmit()}>      
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