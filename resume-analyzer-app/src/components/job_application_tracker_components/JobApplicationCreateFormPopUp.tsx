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

    const [companyNameError, setCompanyNameError] = useState("");
    const [jobTitleError, setJobTitleError] = useState("");


    async function onSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault()

        let hasError = false;

        if (!companyName.trim()) {
            setCompanyNameError("Company name is required.");
            hasError = true;
        }

        if (!jobTitle.trim()) {
            setJobTitleError("Job title is required.");
            hasError = true;
        }

        if (hasError) {
            return;
        }

        // If No Errors Execute API request

        await createJobApplication({company_name: companyName, job_title: jobTitle})
        loadJobApplications()
        handleSetCreateFormIsVisible(false)
    }

    return(
        <div className="JobApplicationCreateFormPopUpWrapper">
            <form className="JobApplicationCreateForm" onSubmit={(e) => onSubmit(e)}>
                <button
                    type="button"
                    onClick={() => handleSetCreateFormIsVisible(false)}
                    className="JobApplicationCreateFormPopUpExitButton"
                >
                    <img
                        className="JobApplicationCreateFormPopUpExitButtonIcon"
                        src={exitIcon}
                        alt="Close"
                    />
                </button>

                <h1 className="JobApplicationCreateFormHeadingText">
                    Add Job
                </h1>

                <div className="JobApplicationCreateFormInputWrapper">
                    <input
                        className="JobApplicationCreateFormInput"
                        value={companyName}
                        onChange={(e) => {
                            setCompanyName(e.target.value);
                            setCompanyNameError("");
                        }}
                        placeholder="Company Name"
                        maxLength={100}
                    />

                    {companyNameError && (
                        <p className="JobApplicationCreateFormError">
                            {companyNameError}
                        </p>
                    )}
                </div>

                <div className="JobApplicationCreateFormInputWrapper">
                    <input
                        className="JobApplicationCreateFormInput"
                        value={jobTitle}
                        onChange={(e) => {
                            setJobTitle(e.target.value);
                            setJobTitleError("");
                        }}
                        placeholder="Job Title"
                        maxLength={120}
                    />

                    {jobTitleError && (
                        <p className="JobApplicationCreateFormError">
                            {jobTitleError}
                        </p>
                    )}
                </div>

                <button
                    className="JobApplicationCreateFormSubmitButton"
                    type="submit"
                >
                    Create
                </button>
            </form>
        </div>
    )
}