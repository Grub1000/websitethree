import { useState } from "react";

// CSS Styles Import
import "../css/home_page_css/HeaderBurgerDropdownNav.css"

// Auth Context imports
import { useAuth } from "../context/AuthContext";


// React Router imports
import { Link } from "react-router-dom";


// Icon SVG import
import burgerMenuSubmenuChevronIconSVG from "../assets/burger_menu_submenu_chevron_icon_svg.svg"


export default function HeaderBurgerDropdownNav() {

    const { isAuthenticated } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const handleBurgerSubMenuDropdown = (buttonIndex: number) =>{
        setIsLoading(true);

        const submenuWrapperElement = document.querySelectorAll('.HeaderBurgerDropdownButtonSubmenuWrapper')[buttonIndex] as HTMLElement; // Grab the submenu wrapper element by class occurance order (index order of elements in this class).
        const headerBurgerDropdownButtonChevronIconElement = document.querySelectorAll('.HeaderBurgerDropdownButtonIcon')[buttonIndex] as HTMLElement; // Grab the submenu wrapper element by class occurance order (index order of elements in this class).
        const currentDisplay = window.getComputedStyle(submenuWrapperElement).display; // Surpasses inline html limitation, we grab the computed css styled elements display property.
        const iconCurrentTransform = window.getComputedStyle(headerBurgerDropdownButtonChevronIconElement).transform;
        console.log(iconCurrentTransform);
        submenuWrapperElement.style.display = currentDisplay == "none" ? "flex" : "none"; // style.display only checks inline html styles, therefore we use the current computed styled element(computed with CSS styles element).
        headerBurgerDropdownButtonChevronIconElement.style.transform = iconCurrentTransform === "none" || iconCurrentTransform === "matrix(0, -1, 1, 0, 0, 0)" ? "rotate(90deg)" : "rotate(-90deg)";
        
        // Allows enough time for the icon rotation transition to complete before more buttons can be clicked
        setTimeout(() => {
        setIsLoading(false);
        }, 100);
    }

  return (
   <nav className="HeaderBurgerDropdownButtonWrapper">
        <button className="HeaderBurgerDropdownButton" onClick={() => handleBurgerSubMenuDropdown(0)} disabled={isLoading}>
            <p className="HeaderBurgerDropdownButtonText">Resume</p>
            <img className="HeaderBurgerDropdownButtonIcon" src={burgerMenuSubmenuChevronIconSVG} alt="Dropdown Icon"/>
        </button>
        <div className="HeaderBurgerDropdownButtonSubmenuWrapper">
            <button className="HeaderBurgerDropdownSubmenuButton">Submenu 1</button>
            <button className="HeaderBurgerDropdownSubmenuButton">Submenu 2</button>
        </div>
        <button className="HeaderBurgerDropdownButton" onClick={() => handleBurgerSubMenuDropdown(1)} disabled={isLoading}>
            <p className="HeaderBurgerDropdownButtonText">Tools</p>
            <img className="HeaderBurgerDropdownButtonIcon" src={burgerMenuSubmenuChevronIconSVG} alt="Dropdown Icon"/>
        </button>
        <div className="HeaderBurgerDropdownButtonSubmenuWrapper">
            <button className="HeaderBurgerDropdownSubmenuButton">Submenu 1</button>
            <button className="HeaderBurgerDropdownSubmenuButton">Submenu 2</button>
        </div>
        <button className="HeaderBurgerDropdownButton" onClick={() => handleBurgerSubMenuDropdown(2)} disabled={isLoading}>
            <p className="HeaderBurgerDropdownButtonText">Examples</p>
            <img className="HeaderBurgerDropdownButtonIcon" src={burgerMenuSubmenuChevronIconSVG} alt="Dropdown Icon"/>
        </button>
        <div className="HeaderBurgerDropdownButtonSubmenuWrapper">
            <button className="HeaderBurgerDropdownSubmenuButton">Submenu 1</button>
            <button className="HeaderBurgerDropdownSubmenuButton">Submenu 2</button>
        </div>
        <button className="HeaderBurgerDropdownButton" onClick={() => handleBurgerSubMenuDropdown(3)} disabled={isLoading}>
            <p className="HeaderBurgerDropdownButtonText">Pricing</p>
            <img className="HeaderBurgerDropdownButtonIcon" src={burgerMenuSubmenuChevronIconSVG} alt="Dropdown Icon"/>
        </button>
        <div className="HeaderBurgerDropdownButtonSubmenuWrapper">
            <button className="HeaderBurgerDropdownSubmenuButton">Submenu 1</button>
            <button className="HeaderBurgerDropdownSubmenuButton">Submenu 2</button>
        </div>
        {isAuthenticated ? (
        // <Link to="/profile" className="HeaderSignInButton Btn">My Profile</Link>
            <Link to="/profile" className="HeaderBurgerDropdownSignInButton Btn">My Profile</Link>
        ) : (
            <Link to="/login" className="HeaderBurgerDropdownSignInButton Btn">Sign In</Link>)}
        
        {isAuthenticated ? (
            <Link to="/resume-analyzer" className="HeaderBurgerDropdownMyDocumentsButton Btn">My Documents</Link>
        ) : (
            <Link to="/login" className="HeaderBurgerDropdownGetStartedButton Btn">Get Started</Link>
        )}
    </nav> 
  );
}