// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { useState } from 'react'
import ResumeUploadSection from "../components/ResumeUploadSection.tsx";
// import ResumeHistorySection from "../components/ResumeHistorySection.tsx";
import ResumeAnalyzerDashboardHeaderButton from "../components/ResumeAnalyzerDashboardHeaderButton.tsx";
import ResumeHistorySmallSection from "../components/ResumeHistorySmallSection.tsx"
import ResumeAnalysisPopUp from "../components/ResumeAnalysisPopUp.tsx"


import '../css/resume_analyzer_css/ResumeAnalyzerDashboardPage.css';


import logo from "../assets/website_tab_logo.png"
import profileButtonIcon from "../assets/profile_button_icon_svg.svg"
import profileButtonChevronIcon from "../assets/burger_menu_submenu_chevron_icon_svg.svg"

import { useNavigate } from "react-router-dom";

import { getResumeAnalyses ,type ResumeAnalysisResponseListItem} from "../api/resume_service.tsx"


export default function ResumeAnalyzerDashboardPage() {
    const navigate = useNavigate();
    
    const [buttons] = useState({
        button1: {order: 0, title: "Dashboard", dropdownButtons: {}},
        button2: {order: 1, title: "Documents", dropdownButtons: {}},
        button3: {order: 2, title: "Find Jobs", dropdownButtons: {}},
        button4: {order: 3, title: "My Saved Jobs", dropdownButtons: {}},
        // button5: {order: 4, title: "", dropdownButtons: {}},
        // button5: {order: 4, title: "Chicken", dropdownButtons: {}},
        // button6: {order: 5, title: "Noodle", dropdownButtons: {}},
        // button7: {order: 6, title: "Soup", dropdownButtons: {}}
      })

    const headerButtonsArray = Object.values(buttons); // Convert the buttons object into an array of button objects

    let [reloadKey, setReloadKey] = useState(0)

    async function reloadResumeHistory(){
        setReloadKey(reloadKey = reloadKey + 1)
        console.log("key set to: ", reloadKey)
    }

    let [resumeAnalyses, setResumeAnalyses] = useState<ResumeAnalysisResponseListItem[]>([])

    async function loadResumeAnalyses(resumeID: string){
        setResumeAnalyses(resumeAnalyses = await getResumeAnalyses(resumeID))
    }

    return (

        <section className="ResumeAnalyzerDashboardPage">
            {resumeAnalyses.length === 0 ?  null : <ResumeAnalysisPopUp resumeAnalyses={resumeAnalyses} exitAnalysis={() => setResumeAnalyses([])}/>}
            <header className="ResumeAnalyzerDashboardHeader">
                <a className="ResumeAnalyzerDashboardHeaderLogoWrapper" onClick={()=> navigate("/resume-analyzer")}>
                    <img src={logo} className="ResumeAnalyzerDashboardHeaderLogo" alt="Website Logo"></img>
                </a>
                <nav>
                <section className="ResumeAnalyzerDashboardHeaderButtonsWrapper">
                    {headerButtonsArray.map((button, index) => (
                    <ResumeAnalyzerDashboardHeaderButton key={index} button={button}/>
                    ))}
                    
                </section>
                </nav>
                <div className="ResumeAnalyzerDashboardHeaderProfileButtonWrapper">
                    <button className="ResumeAnalyzerDashboardHeaderProfileButton" onClick={()=> navigate("/profile")}>
                        <img src={profileButtonIcon} className="ResumeAnalyzerDashboardHeaderProfileButtonImage" alt="Profile Button Image"></img>
                        <img src={profileButtonChevronIcon} className="ResumeAnalyzerDashboardHeaderProfileButtonChevronImage" alt="Profile Button Chevron Image"></img>
                    </button>
                </div>
                <div className="HeaderBurgerDropdownWrapper" id="headerBurgerDropdownWrapper">
                    {/* <HeaderBurgerDropdownNav /> */}
                </div>
            </header>






            <main className="ResumeAnalyzerDashboardMainSection">
                {/* <p>This is the resume analyzer dashboard.</p> */}
                <h2 className="ResumeAnalyzerDashboardMainSectionTitle">New Uploads</h2>
                <ResumeUploadSection reloadResumeHistory={reloadResumeHistory} />

                <h2 className="ResumeAnalyzerDashboardMainSectionTitle">Documents</h2>
                <ResumeHistorySmallSection key={reloadKey} loadResumeAnalyses={loadResumeAnalyses}/>
                <h2 className="ResumeAnalyzerDashboardMainSectionTitle">Add Jobs</h2>
                
                {/* <JobAdditionSection/> */}
                {/* <h2 className="ResumeAnalyzerDashboardMainSectionTitle">Documents</h2> */}

            </main>






            <footer className="ResumeAnalyzerDashboardFooter">
                {/* <p>&copy; 2023 Jorge Ramirez. All rights reserved.</p> */}
            </footer>
{/* 
            <ResumeUploadSection/>
            <ResumeHistorySection/> */}
            {/* <ResumeHistorySection/> */}

        </section>

    );

}
