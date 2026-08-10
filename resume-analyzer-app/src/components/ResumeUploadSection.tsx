import { useState } from "react";

import ResumeUploadPopUp from "../components/ResumeUploadPopUp.tsx"

import '../css/resume_analyzer_css/ResumeUploadSection.css';

import manPointingRight from "../assets/pointing_right_man.png"



function ResumeUploadSection({
    reloadResumeHistory,
}:{
    reloadResumeHistory: ()=> void
}
) {
    const [isVisible, setIsVisible] = useState(false);


    return (
        <section className="ResumeUploadSection">
            <div className="ResumeUploadCard">
                <div className="ResumeUploadIconWrapper">
                    <img src={manPointingRight} className="ResumeUploadIconImage" alt="Man Pointing Right Icon"></img>
                </div>
                <div className="ResumeUploadDescriptionWrapper">
                    <h2 className="ResumeUploadDescriptionTitle">Analyze Your Resume</h2>
                    <p className="ResumeUploadDescriptionText">Upload your resume and Resuscan will provide a comprehensive analysis.</p>
                    <button className="ResumeUploadDescriptionButton" onClick={() => setIsVisible(!isVisible)}>Upload Resume</button>
                </div>
                {/* <ResumeUploadPopUp /> */}
                {isVisible && (<ResumeUploadPopUp onClose={setIsVisible} reloadResumeHistory={reloadResumeHistory}/>)}
            </div>
        </section>
    );
}

export default ResumeUploadSection;