import {type ResumeAnalysisResponseListItem} from "../api/resume_service"
import "../css/resume_analyzer_css/ResumeAnalysisPopUp.css"

export default function ResumeAnalysisPopUp({
    resumeAnalyses
}:{
    resumeAnalyses: ResumeAnalysisResponseListItem[],
}
){
    return(
        <div className="ResumeAnalysisPopUpWrapper">
            {resumeAnalyses.map((resume)=>
            <div>
                <div>
                    {resume.scores.overall}
                </div>
                <div>
                    {resume.created_at}
                </div>
            </div>
            
            )}

        </div>
    )
}