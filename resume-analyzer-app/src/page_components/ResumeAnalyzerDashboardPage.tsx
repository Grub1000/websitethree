// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { useState } from 'react'
import ResumeUploadSection from "../components/ResumeUploadSection.tsx";
// import ResumeHistorySection from "../components/ResumeHistorySection.tsx";
import ResumeAnalyzerDashboardHeaderButton from "../components/ResumeAnalyzerDashboardHeaderButton.tsx";
import ResumeHistorySmallSection from "../components/ResumeHistorySmallSection.tsx"

import '../css/resume_analyzer_css/ResumeAnalyzerDashboardPage.css';



import logo from "../assets/website_tab_logo.png"
import profileButtonIcon from "../assets/profile_button_icon_svg.svg"
import profileButtonChevronIcon from "../assets/burger_menu_submenu_chevron_icon_svg.svg"

export default function ResumeAnalyzerDashboardPage() {
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
    return (

        <section className="ResumeAnalyzerDashboardPage">
            <header className="ResumeAnalyzerDashboardHeader">
                <a className="ResumeAnalyzerDashboardHeaderLogoWrapper">
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
                    <button className="ResumeAnalyzerDashboardHeaderProfileButton">
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
                <ResumeUploadSection/>

                <h2 className="ResumeAnalyzerDashboardMainSectionTitle">Documents</h2>
                <ResumeHistorySmallSection/>
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
