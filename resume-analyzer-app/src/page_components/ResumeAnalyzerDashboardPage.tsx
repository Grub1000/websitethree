// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import ResumeUploadSection from "../components/ResumeUploadSection.tsx";
import ResumeHistorySection from "../components/ResumeHistorySection.tsx";

export default function ResumeAnalyzerDashboardPage() {

    return (

        <div>
            This is the resume analyzer dashboard.
            <ResumeUploadSection/>
            <ResumeHistorySection/>
        </div>

    );

}
