// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { useState, useEffect} from 'react'


// Component Imports
// import ResumeUploadSection from "../components/resume_analyzer_components/ResumeUploadSection.tsx";
// import ResumeHistorySection from "../components/ResumeHistorySection.tsx";
import ResumeAnalyzerDashboardHeaderButton from "../components/resume_analyzer_components/ResumeAnalyzerDashboardHeaderButton.tsx";
// import ResumeHistorySmallSection from "../components/resume_analyzer_components/ResumeHistorySmallSection.tsx"
import ResumeAnalysisPopUp from "../components/resume_analyzer_components/ResumeAnalysisPopUp.tsx"
// import HeaderBurgerDropdownNav from "../components/homepage_components/HeaderBurgerDropdownNav.tsx"
import ResumeAnalyzerDashboardHeaderBurgerDropdownNav from "../components/resume_analyzer_components/ResumeAnalyzerDashboardHeaderBurgerDropdownNav.tsx"
// import JobApplicationHistorySmallSection from "../components/job_application_tracker_components/JobApplicationHistorySmallSection.tsx"

// Styling Sheet Import
import '../css/resume_analyzer_css/ResumeAnalyzerDashboardPage.css';
// import "../css/home_page_css/HeaderBurgerDropdownNav.css"

// Local Asset Imports
import logo from "../assets/website_tab_logo.png"
import profileButtonIcon from "../assets/profile_button_icon_svg.svg"
import profileButtonChevronIcon from "../assets/burger_menu_submenu_chevron_icon_svg.svg"
import burgerMenuIconSVG from "../assets/burger_menu_svg.svg" 
import burgerMenuExitIconSVG from "../assets/burger_menu_exit_svg.svg"
// import plusIcon from "../assets/icons/plus_icon.svg"

// React Router Imports
import { useNavigate, Outlet } from "react-router-dom";

// Resume Service Imports
import { getResumeAnalyses ,type ResumeAnalysisResponseListItem} from "../api/resume_service.tsx"

// Auth Context Imports
import { useAuth } from "../context/AuthContext";

export default function ResumeAnalyzerDashboardPage() {
    const navigate = useNavigate();

    const { logout } = useAuth();
      
    const [buttons] = useState({
        button1: {order: 0, title: "Dashboard", link: "/resume-analyzer", dropdownButtons: {first: {title: "Dashboard", link: "/resume-analyzer", description: "How Good is Your Resume?"}, second: {title: "More Coming Soon...", link: "/", description: "Coming Soon..."}}},
        button2: {order: 1, title: "Documents", link: "/resume-analyzer/documents", dropdownButtons: {first: {title: "Coming Soon...", link: "/", description: "Coming Soon..."}, second: {title: "Coming Soon...", link: "/", description: "Coming Soon..."}}},
        button3: {order: 2, title: "Find Jobs", link: "/resume-analyzer/find-jobs", dropdownButtons: {first: {title: "Coming Soon...", link: "/", description: "Coming Soon..."}}},
        button4: {order: 3, title: "My Saved Jobs", link: "/resume-analyzer/saved-jobs", dropdownButtons: {first: {title: "Coming Soon", link: "/", description: "Coming Soon..."}}},
    
        // button1: {order: 0, title: "Dashboard", link: ""},
        // button2: {order: 1, title: "Documents", link: ""},
        // button3: {order: 2, title: "Find Jobs", link: ""},
        // button4: {order: 3, title: "My Saved Jobs", link: ""},

        // button5: {order: 4, title: "", link: ""},
        // button5: {order: 4, title: "Chicken", link: ""},
        // button6: {order: 5, title: "Noodle", link: ""},
        // button7: {order: 6, title: "Soup", link: ""}
      })

    const [burgerDropdownFooterButtons] = useState({
        button1: {title: "My Profile", link: "/profile"},
        button2: {title: "Home", link: "/"},
    })


    const [createFormIsVisible, setCreateFormIsVisible] = useState(false)  // State used for Job Application Tracker Create Form

    const headerButtonsArray = Object.values(buttons); // Convert the buttons object into an array of button objects

    // const burgerDropdownFooterButtonsArray = Object.values(burgerDropdownFooterButtons);

    let [reloadKey, setReloadKey] = useState(0)

    async function reloadResumeHistory(){
        setReloadKey(reloadKey = reloadKey + 1)
        console.log("key set to: ", reloadKey)
    }

    let [resumeAnalyses, setResumeAnalyses] = useState<ResumeAnalysisResponseListItem[]>([])

    async function loadResumeAnalyses(resumeID: string){
        document.querySelector('#root')?.scrollTo(0,0)  //Scroll To Top
        setResumeAnalyses(resumeAnalyses = await getResumeAnalyses(resumeID))
    }
    
    useEffect(() => {   
            console.log("Reloading Resume History")
            function handleClick(event: MouseEvent) {
                const target = event.target as HTMLElement;
                console.log("clicked")
                if (
                    !target.closest(".ResumeAnalyzerDashboardHeaderProfileButtonDropDownWrapper")
                    && !target.closest(".ResumeAnalyzerDashboardHeaderProfileButton")
                ) {
                    document
                        .querySelectorAll<HTMLElement>(".ResumeAnalyzerDashboardHeaderProfileButtonDropDownWrapper")
                        .forEach(dropdown => {
                            dropdown.style.display = "none";
                        });
                }
            }
    
            document.addEventListener("mousedown", handleClick);
    
            return () => {
                document.removeEventListener("mousedown", handleClick);
            };
        }, []);

    function handleDropdown(id: string){
        const selectedDropdown = document.getElementById(id) as HTMLElement
        selectedDropdown.style.display = "block"
    }

      const [dropdownOpen, setDropdownOpen] = useState(false);

    // const [isLoading, setIsLoading] = useState(false);

    const handleBurgerDropdown = (dropdownOpen: boolean) => {
        const hamburgerDropdown = document.getElementById("headerBurgerDropdownWrapper") as HTMLElement;
        hamburgerDropdown.style.display = dropdownOpen ? "block" : "none";
        setDropdownOpen(dropdownOpen);
    }

    // If window width > 760px go ahead and remove the burger button dropdown menu and set the state of dropdownOpen to false.
    const hamburgerDropdown = document.getElementById('headerBurgerDropdownWrapper') as HTMLSelectElement;
    window.addEventListener('resize', () => {
        const isBigScreen = window.innerWidth > 760;
        if (hamburgerDropdown && isBigScreen) {
        hamburgerDropdown.style.display = "none"
        setDropdownOpen(false);
        }
    });

    function handleSetCreateFormIsVisible(bool: boolean){

        setCreateFormIsVisible(bool)
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
                    <button className="ResumeAnalyzerDashboardHeaderProfileButton" id="resumeAnalyzerDashboardHeaderProfileButton" onClick={()=> handleDropdown("resumeAnalyzerDashboardHeaderProfileButtonDropDownWrapper")}>
                        <img src={profileButtonIcon} className="ResumeAnalyzerDashboardHeaderProfileButtonImage" alt="Profile Button Image"></img>
                        <img src={profileButtonChevronIcon} className="ResumeAnalyzerDashboardHeaderProfileButtonChevronImage" alt="Profile Button Chevron Image"></img>
                    </button>
                    <div className="ResumeAnalyzerDashboardHeaderProfileButtonDropDownWrapper" id="resumeAnalyzerDashboardHeaderProfileButtonDropDownWrapper">
                        <button className="ResumeAnalyzerDashboardHeaderProfileButtonDropDownButton" onClick={()=> navigate("/profile")}>Account</button>
                        <button className="ResumeAnalyzerDashboardHeaderProfileButtonDropDownButton" onClick={()=> navigate("/")}>Home</button>
                        <button className="ResumeAnalyzerDashboardHeaderProfileButtonDropDownButton" onClick={()=> logout()}>Logout</button>
                    </div>
                </div>
            
                <section className="HeaderBurgerButtonWrapper">
                <button className="HeaderBurgerButton Btn" style={{width: "40px", height: "40px"}} onClick={() => handleBurgerDropdown(!dropdownOpen)}>
                    {dropdownOpen ? (
                    <img className="HeaderBurgerButtonIconImage"  style={{ transform: 'scale(85%)', opacity: 0.7 , left: "-4px", top: "-3px" }} src={burgerMenuExitIconSVG} alt="Exit Icon"/>
                    ) : (
                    <img className="HeaderBurgerButtonIconImage" style={{ transform: 'scale(120%)', left: "-4px", top: "-4px"}}  src={burgerMenuIconSVG} alt="Burger Icon"/>
                    )}
                </button>
                {/* <button className="HeaderSignInButton Btn">Burger</button> */}
                </section>
                <div className="HeaderBurgerDropdownWrapper" id="headerBurgerDropdownWrapper">
                    <ResumeAnalyzerDashboardHeaderBurgerDropdownNav buttons={buttons} footerButtons={burgerDropdownFooterButtons} handleBurgerDropdown={handleBurgerDropdown}/>
                </div>
            </header>





            <main className="ResumeAnalyzerDashboardMainSection">
                {/* <p>This is the resume analyzer dashboard.</p> */}

                {/* <h2 className="ResumeAnalyzerDashboardMainSectionTitle">New Uploads</h2>
                <ResumeUploadSection reloadResumeHistory={reloadResumeHistory} />

                <h2 className="ResumeAnalyzerDashboardMainSectionTitle">Documents</h2>
                <ResumeHistorySmallSection key={reloadKey} loadResumeAnalyses={loadResumeAnalyses}/>



                <h2 className="ResumeAnalyzerDashboardMainSectionTitle">
                    Add Jobs 
                    <button className="ResumeAnalyzerDashboardMainSectionAddJobButton" onClick={()=> setCreateFormIsVisible(true)}>
                        <img className="ResumeAnalyzerDashboardMainSectionAddJobButtonIcon" src={plusIcon}></img>
                        <p className="ResumeAnalyzerDashboardMainSectionAddJobButtonTitle">Add Job</p>
                    </button>
                </h2>
                <JobApplicationHistorySmallSection createFormIsVisible={createFormIsVisible} handleSetCreateFormIsVisible={handleSetCreateFormIsVisible}/> */}

                <Outlet
                    context={{
                            reloadKey,
                            reloadResumeHistory,
                            resumeAnalyses,
                            loadResumeAnalyses,
                            createFormIsVisible,
                            setCreateFormIsVisible,
                            handleSetCreateFormIsVisible,
                        }}
                />
                

            </main>


            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>


            <footer className="ResumeAnalyzerDashboardFooter">
                {/* <p>&copy; 2023 Jorge Ramirez. All rights reserved.</p> */}
            </footer>
            {/* 
            <ResumeUploadSection/>
            <ResumeHistorySection/> */}
            {/* <ResumeHistorySection/> */}
            {/* <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br> */}
        </section>

    );

}
