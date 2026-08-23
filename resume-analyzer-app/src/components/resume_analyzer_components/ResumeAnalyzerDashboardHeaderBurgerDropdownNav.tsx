// import {useState} from "react"

// Auth Context Import
import {useAuth} from "../../context/AuthContext.tsx"

// React Router Imports
import {Link} from "react-router-dom"

// CSS Styling Import
import "../../css/resume_analyzer_css/ResumeAnalyzerDashboardHeaderBurgerDropdownNav.css"

// React Router Imports
import { useNavigate} from 'react-router-dom';

// Icon SVG import
// import burgerMenuSubmenuChevronIconSVG from "../../assets/burger_menu_submenu_chevron_icon_svg.svg"

export default function ResumeAnalyzerDashboardHeaderBurgerDropdownNav(
 {
    buttons,
    footerButtons,
    handleBurgerDropdown,
 }:{
    buttons: any,
    footerButtons: any,
    handleBurgerDropdown: (bool: boolean) => void
 }  
){

    const { isAuthenticated } = useAuth();

    const navigate = useNavigate();

    return (
        <nav className="HeaderBurgerDropdownButtonWrapper">
        <button className="HeaderBurgerDropdownButton" onClick={()=> {navigate(buttons.button1.link); handleBurgerDropdown(false)}}>
            <p className="HeaderBurgerDropdownButtonText">{buttons.button1.title}</p>
            {/* <img className="HeaderBurgerDropdownButtonIcon" src={burgerMenuSubmenuChevronIconSVG} alt="Dropdown Icon"/> */}
        </button>
        <div className="HeaderBurgerDropdownButtonSubmenuWrapper">
            <button className="HeaderBurgerDropdownSubmenuButton" ></button>
            <button className="HeaderBurgerDropdownSubmenuButton" ></button>
        </div>
        <button className="HeaderBurgerDropdownButton" onClick={()=> {navigate(buttons.button2.link); handleBurgerDropdown(false)}}>
            <p className="HeaderBurgerDropdownButtonText">{buttons.button2.title}</p>
            {/* <img className="HeaderBurgerDropdownButtonIcon" src={burgerMenuSubmenuChevronIconSVG} alt="Dropdown Icon"/> */}
        </button>
        <div className="HeaderBurgerDropdownButtonSubmenuWrapper">
            <button className="HeaderBurgerDropdownSubmenuButton"></button>
            <button className="HeaderBurgerDropdownSubmenuButton"></button>
        </div>
        <button className="HeaderBurgerDropdownButton" onClick={()=> {navigate(buttons.button3.link); handleBurgerDropdown(false)}}>
            <p className="HeaderBurgerDropdownButtonText">{buttons.button3.title}</p>
            {/* <img className="HeaderBurgerDropdownButtonIcon" src={burgerMenuSubmenuChevronIconSVG} alt="Dropdown Icon"/> */}
        </button>
        <div className="HeaderBurgerDropdownButtonSubmenuWrapper">
            <button className="HeaderBurgerDropdownSubmenuButton"></button>
            {/* <button className="HeaderBurgerDropdownSubmenuButton">Submenu 2</button> */}
        </div>
        <button className="HeaderBurgerDropdownButton" onClick={()=> {navigate(buttons.button4.link); handleBurgerDropdown(false)}}>
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

// Notes:

//  This component uses the same classes and css as the original nav created for the home page.

//  We simply created this new version to edit, remove, and add features as needed for the 
//  resume analyzer dashboard.