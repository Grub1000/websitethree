import { useState, useRef, useEffect } from "react";
import { uploadResume, extractResumeText, analyzeResume } from "../../api/resume_service";

import "../../css/resume_analyzer_css/ResumeUploadPopUp.css"

import resumeUploadIconSVG from "../../assets/resume_upload_icon_svg.svg"
import whiteArrowIcon from "../../assets/white_arrow_svg.svg"
import exitIcon from "../../assets/burger_menu_exit_svg.svg"

import ResumeUploadExtractAnalysisPopUp from "./ResumeUploadExtractAnalysisPopUp"

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_FILE_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function ResumeUploadPopUp({  
        onClose,
        reloadResumeHistory,

    }: { 
        onClose: (value: boolean) => void,
        reloadResumeHistory: ()=> void,
    }) {

        const fileInputRef = useRef<HTMLInputElement | null>(null);
    
        const [selectedFile, setSelectedFile] = useState<File | null>(null);
        const [uploading, setUploading] = useState(false);
        const [message, setMessage] = useState("");
        const [error, setError] = useState("");
        const [resumeId, setResumeId] = useState("");
        console.log(resumeId)

        useEffect(()=>{
            // Disabling Scrolling Feature needed for the ResumeUploadExtractAnalysisPopUp to Take control of Mobile. Makes Height look correct.
            // Block mouse wheel, touch moves, and keyboard scrolling
            function preventDefault(e: Event) {
                e.preventDefault();
            }
            // Call this to lock the page completely
            function disablePageScroll() {
                window.addEventListener('wheel', preventDefault, { passive: false });
                window.addEventListener('touchmove', preventDefault, { passive: false });
            }
            // // Call this to restore scrolling later
            function enablePageScroll() {
                window.removeEventListener('wheel', preventDefault);
                window.removeEventListener('touchmove', preventDefault);
            }
            disablePageScroll()
            return () => {
                // 2. Dismount/Cleanup code goes here (runs on component unmount)
                console.log('Component is dismounting...');
                enablePageScroll()
            };
        },[])





        function validateFile(file: File): string | null {
            if (!ALLOWED_FILE_TYPES.includes(file.type)) {
                return "Only PDF and DOCX files are supported.";
            }
    
            if (file.size === 0) {
                return "The selected file is empty.";
            }
    
            if (file.size > MAX_FILE_SIZE) {
                return "Résumé files cannot exceed 10 MB.";
            }
    
            return null;
        }
    
        function handleFileChange(
            event: React.ChangeEvent<HTMLInputElement>
        ) {
            setMessage("");
            setError("");
            setResumeId("");
    
            const file = event.target.files?.[0];
    
            if (!file) {
                setSelectedFile(null);
                return;
            }
    
            const validationError = validateFile(file);
    
            if (validationError) {
                setSelectedFile(null);
                setError(validationError);
                event.target.value = "";
                return;
            }
    
            setSelectedFile(file);
        }
    
        async function handleUploadAndExtractAndAnalysis() {
            if (!selectedFile) {
                setError("Select a resume before uploading.");
                return;
            }
            
            setUploading(true);
            // disablePageScroll()
            setMessage("Uploading Resume...");
            setError("");
            setResumeId("");
            
            try {
                const result = await uploadResume(selectedFile);
    
                setResumeId(result.resume_id);
                setMessage("Résumé uploaded successfully.");
                
    
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
                setMessage("Processing Resume Text...");
    
                try{
                    const extractionResult = await extractResumeText(result.resume_id);
                    setMessage("Résumé Ready for Analysis.");
                    console.log("Extracted Resume Text:", extractionResult);
    
                    try{
                        setMessage("Analyzing Resume...");
    
                        const analysisResult = await analyzeResume(result.resume_id);
    
                        setMessage("Résumé analysis complete.");
    
                        console.log(
                            "Resume Analysis:",
                            analysisResult
                        );
                        setSelectedFile(null);
                        reloadResumeHistory()
                        
                    } catch (error) {
                        setError(
                            error instanceof Error
                                ? error.message
                                : "Failed to analyze resume."
                        );
                    }
    
                } catch (error) {
                    setError(
                        error instanceof Error
                            ? error.message
                            : "Failed to extract resume text."
                    );
                }
    
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "The résumé upload failed."
                );
            } finally {
                setUploading(false);
                // enablePageScroll()
            }
        }

        // // Disabling Scrolling Feature needed for the ResumeUploadExtractAnalysisPopUp to Take control of Mobile. Makes Height look correct.
        // // Block mouse wheel, touch moves, and keyboard scrolling
        // function preventDefault(e: Event) {
        //     e.preventDefault();
        // }

        // // Call this to lock the page completely
        // function disablePageScroll() {
        //     window.addEventListener('wheel', preventDefault, { passive: false });
        //     window.addEventListener('touchmove', preventDefault, { passive: false });
        // }

        // // Call this to restore scrolling later
        // function enablePageScroll() {
        //     window.removeEventListener('wheel', preventDefault);
        //     window.removeEventListener('touchmove', preventDefault);
        // }
    


    return(
        <div className="ResumeUploadPopUpWrapper">
            {uploading && <ResumeUploadExtractAnalysisPopUp message={message}/>}
            {/* <ResumeUploadExtractAnalysisPopUp message={"Analyzing Resume..."}/> */}
            <div className="ResumeUploadPopUp">
                {/* <h2>Upload Your Resume</h2>
                <p>Please select a file to upload:</p> */}
                <h2 className="ResumeUploadPopUpTitle">Upload your resume </h2>
                <button className="ResumeUploadPopUpExitIconButton" onClick={()=> onClose(false)}><img src={exitIcon} className="ResumeUploadPopUpExitIcon"></img></button>
                <label className="ResumeUploadPopUpFileUploadDropSquare">
                    <img src={resumeUploadIconSVG} className="ResumeUploadPopUpFileUploadDropSquareIcon"></img>
                    <h2 className="ResumeUploadPopUpFileUploadDropSquareTitle">Upload an Existing Resume</h2>
                    <p className="ResumeUploadPopUpFileUploadDropSquareDescription">Already have a resume? Upload it and jump straight into editing</p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleFileChange}
                        disabled={uploading}
                        className="ResumeUploadPopUpFileUploadInput"
                        id="file-upload"
                    />
                    <img src={whiteArrowIcon} className="ResumeUploadPopUpFileUploadDropSquareArrowIcon"></img>
                </label>

                {selectedFile && !uploading &&  (
                    <div className="ResumeUploadPopUpSelectedFileTextWrapper">
                        <p className="ResumeUploadPopUpSelectedFileNameText" style={{margin: 0}}>{selectedFile.name.length > 31 ? selectedFile.name.slice(0, 31) + '...' : selectedFile.name}</p>
                        <p className="ResumeUploadPopUpSelectedFileSizeText" style={{margin: 0}}>
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                    </div>
                )}

                {message && (
                    <p className="ResumeUploadPopUpUploadSuccessMessage" style={{margin: 0}}>
                        {message}
                    </p>
                )}

                {error && (
                    <p className="ResumeUploadPopUpUploadErrorMessage" style={{margin: 0}}>
                        {error}
                    </p>
                )}

                {selectedFile && (<button type="button" onClick={handleUploadAndExtractAndAnalysis} disabled={uploading || !selectedFile} className="ResumeUploadPopUpFileUploadConfirmationButton">
                    {uploading ? "Uploading Resume..." : "Upload Resume"}
                </button>
                )}

                

                {/* {resumeId && (
                    <p className="ResumeUploadPopUpResumeIDMessage" style={{margin: 0}}>
                        Resume ID: {resumeId}
                    </p>
                )} */}
            </div>
        </div>
    )
}
