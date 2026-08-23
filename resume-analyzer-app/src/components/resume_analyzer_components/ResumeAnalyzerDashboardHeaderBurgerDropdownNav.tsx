// import {useState} from "react"

// Auth Context Import
import {useAuth} from "../../context/AuthContext.tsx"

// React Router Imports
import {Link} from "react-router-dom"

// CSS Styling Import
import "../../css/resume_analyzer_css/ResumeAnalyzerDashboardHeaderBurgerDropdownNav.css"

// Icon SVG import
// import burgerMenuSubmenuChevronIconSVG from "../../assets/burger_menu_submenu_chevron_icon_svg.svg"

export default function ResumeAnalyzerDashboardHeaderBurgerDropdownNav(
 {
    buttons,
    footerButtons
 }:{
    buttons: any,
    footerButtons: any
 }  
){

    const { isAuthenticated } = useAuth();

    return (
        <nav className="HeaderBurgerDropdownButtonWrapper">
        <button className="HeaderBurgerDropdownButton">
            <p className="HeaderBurgerDropdownButtonText">{buttons.button1.title}</p>
            {/* <img className="HeaderBurgerDropdownButtonIcon" src={burgerMenuSubmenuChevronIconSVG} alt="Dropdown Icon"/> */}
        </button>
        <div className="HeaderBurgerDropdownButtonSubmenuWrapper">
            <button className="HeaderBurgerDropdownSubmenuButton" ></button>
            <button className="HeaderBurgerDropdownSubmenuButton" ></button>
        </div>
        <button className="HeaderBurgerDropdownButton">
            <p className="HeaderBurgerDropdownButtonText">{buttons.button2.title}</p>
            {/* <img className="HeaderBurgerDropdownButtonIcon" src={burgerMenuSubmenuChevronIconSVG} alt="Dropdown Icon"/> */}
        </button>
        <div className="HeaderBurgerDropdownButtonSubmenuWrapper">
            <button className="HeaderBurgerDropdownSubmenuButton"></button>
            <button className="HeaderBurgerDropdownSubmenuButton"></button>
        </div>
        <button className="HeaderBurgerDropdownButton">
            <p className="HeaderBurgerDropdownButtonText">{buttons.button3.title}</p>
            {/* <img className="HeaderBurgerDropdownButtonIcon" src={burgerMenuSubmenuChevronIconSVG} alt="Dropdown Icon"/> */}
        </button>
        <div className="HeaderBurgerDropdownButtonSubmenuWrapper">
            <button className="HeaderBurgerDropdownSubmenuButton"></button>
            {/* <button className="HeaderBurgerDropdownSubmenuButton">Submenu 2</button> */}
        </div>
        <button className="HeaderBurgerDropdownButton">
            <p className="HeaderBurgerDropdownButtonText">{buttons.button4.title}</p>
            {/* <img className="HeaderBurgerDropdownButtonIcon" src={burgerMenuSubmenuChevronIconSVG} alt="Dropdown Icon"/> */}
        </button>
        <div className="HeaderBurgerDropdownButtonSubmenuWrapper">
            <button className="HeaderBurgerDropdownSubmenuButton" ></button>
            {/* <button className="HeaderBurgerDropdownSubmenuButton">Submenu 2</button> */}
        </div>
        {isAuthenticated ? (
        // <Link to="/profile" className="HeaderSignInButton Btn">My Profile</Link>
            <Link to={footerButtons.button1.link} className="HeaderBurgerDropdownSignInButton Btn">{footerButtons.button1.title}</Link>
        ) : (
            <Link to="/login" className="HeaderBurgerDropdownSignInButton Btn">Sign In</Link>)}
        
        {isAuthenticated ? (
            <Link to={footerButtons.button2.link} className="HeaderBurgerDropdownMyDocumentsButton Btn">{footerButtons.button2.title}</Link>
        ) : (
            <Link to="/login" className="HeaderBurgerDropdownGetStartedButton Btn">Get Started</Link>
        )}
    </nav> 
    )
}