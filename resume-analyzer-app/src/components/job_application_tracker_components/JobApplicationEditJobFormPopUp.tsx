
import { useState } from "react";
import exitIcon from "../../assets/burger_menu_exit_svg.svg";

import "../../css/job_application_tracker/JobApplicationEditJobFormPopUp.css"

export default function JobApplicationEditJobFormPopUp({
    selectedJobCurrentID,
    selectedJobCurrentCompanyName,
    selectedJobCurrentJobTitle,
    handleEditJobFormPopUpIsVisible,
    handleJobUpdate
}: 
{
    selectedJobCurrentID: string,
    selectedJobCurrentCompanyName: string,
    selectedJobCurrentJobTitle: string,
    handleEditJobFormPopUpIsVisible: (bool: boolean) => void;
    handleJobUpdate: (
        jobApplicationID: string,
        companyName: string,
        jobTitle: string
    ) => void;

}) {

    const [companyName, setCompanyName] = useState(selectedJobCurrentCompanyName);
    const [jobTitle, setJobTitle] = useState(selectedJobCurrentJobTitle);

    const [companyNameError, setCompanyNameError] = useState("");
    const [jobTitleError, setJobTitleError] = useState("");

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

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

        handleJobUpdate(
            selectedJobCurrentID,
            companyName.trim(),
            jobTitle.trim()
        );

        handleEditJobFormPopUpIsVisible(false)
    }

    return (
        <div className="JobApplicationEditFormPopUpWrapper">
            <form
                className="JobApplicationEditForm"
                onSubmit={(e) => onSubmit(e)}
            >
                <button
                    type="button"
                    onClick={() => handleEditJobFormPopUpIsVisible(false)}
                    className="JobApplicationEditFormPopUpExitButton"
                >
                    <img
                        className="JobApplicationEditFormPopUpExitButtonIcon"
                        src={exitIcon}
                        alt="Close"
                    />
                </button>

                <h1 className="JobApplicationEditFormHeadingText">
                    Edit Job
                </h1>

                <div className="JobApplicationEditFormInputWrapper">
                    <input
                        className="JobApplicationEditFormInput"
                        value={companyName}
                        onChange={(e) => {
                            setCompanyName(e.target.value);
                            setCompanyNameError("");
                        }}
                        placeholder="Company Name"
                        maxLength={100}
                    />

                    {companyNameError && (
                        <p className="JobApplicationEditFormError">
                            {companyNameError}
                        </p>
                    )}
                </div>

                <div className="JobApplicationEditFormInputWrapper">
                    <input
                        className="JobApplicationEditFormInput"
                        value={jobTitle}
                        onChange={(e) => {
                            setJobTitle(e.target.value);
                            setJobTitleError("");
                        }}
                        placeholder="Job Title"
                        maxLength={120}
                    />

                    {jobTitleError && (
                        <p className="JobApplicationEditFormError">
                            {jobTitleError}
                        </p>
                    )}
                </div>

                <button
                    className="JobApplicationEditFormSubmitButton"
                    type="submit"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}