// CSS Styling Import
import "../../css/resume_analyzer_css/ResumeUploadExtractAnalysisPopUp.css"

export default function ResumeUploadExtractAnalysisPopUp({
    message,
}:{
    message: string
}
){

    return(
        <div className="ResumeUploadExtractAnalysisPopUpWrapper">
            <div className="loader"></div>
            {/* <img src={analyzingPenguinGif} className="ResumeUploadExtractAnalysisPopUpImage"></img> */}
            <h1 className="ResumeUploadExtractAnalysisPopUpLoadingMessage">{message}</h1>
            <p className="ResumeUploadExtractAnalysisPopUpTimeToFinishMessage">Almost there! This should take less than a minute.</p>
        </div>
    )
}