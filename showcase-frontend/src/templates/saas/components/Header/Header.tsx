import { useState, useRef, useEffect } from "react";

import {
    Boxes,
    ChevronDown,
    Cloud,
    Database,
    GitBranch,
    Menu,
    Network,
    Server,
    Terminal,
    X,
} from "lucide-react";

import "./Header.css";


/**
 * Individual platform links displayed inside the
 * Platform navigation dropdown.
 *
 * Keeping this content outside the component makes the
 * navigation structure easier to scan and modify.
 */
const platformLinks = [
    {
        title: "Services",
        description: "Deploy and scale long-running workloads.",
        icon: Server,
    },
    {
        title: "Databases",
        description: "Managed data services for production apps.",
        icon: Database,
    },
    {
        title: "Jobs",
        description: "Run scheduled and one-off workloads.",
        icon: Terminal,
    },
    {
        title: "Environments",
        description: "Manage infrastructure across every stage.",
        icon: Boxes,
    },
    {
        title: "Networking",
        description: "Connect services securely across regions.",
        icon: Network,
    },
    {
        title: "Deployments",
        description: "Ship directly from your Git workflow.",
        icon: GitBranch,
    },
];


/**
 * Main navigation for the SaaS template.
 *
 * Desktop:
 * - Full navigation
 * - Platform dropdown
 * - Sign-in and primary CTA
 *
 * Mobile:
 * - Collapsed navigation
 * - Accessible menu toggle
 *
 * The component owns navigation interaction only.
 * Visual behavior remains inside Header.css.
 */
function Header() {


    /*
    * References the Platform navigation item.
    *
    * The ref allows us to determine whether a document
    * click occurred inside or outside the dropdown.
    */
    const platformRef = useRef<HTMLLIElement>(null);

    /*
    * References the button responsible for opening the
    * Platform menu.
    *
    * This allows keyboard focus to return to the trigger
    * after the dropdown is dismissed with Escape.
    */
    const platformButtonRef = useRef<HTMLButtonElement>(null);

    /* Controls the mobile navigation drawer. */
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    /* Controls the desktop Platform dropdown. */
    const [isPlatformOpen, setIsPlatformOpen] = useState(false);


    /**
     * Toggle the mobile navigation.
     */
    function handleMenuToggle() {
        setIsMenuOpen((currentState) => !currentState);
    }


    /**
     * Toggle the Platform navigation dropdown.
     */
    function handlePlatformToggle() {
        setIsPlatformOpen((currentState) => !currentState);
    }


    /**
     * Handle interactions that should dismiss the Platform dropdown.
     * 
     * 1. Close the Platform dropdown when the user interacts
     *    somewhere outside of the Platform navigation item.
     *
     *    We listen on the document because clicks outside of
     *    this component would otherwise never reach a handler
     *    attached directly to the dropdown.
     * 
     * 2. The user presses the Escape key.
     * 
     * These listeners live on `document` because both
     * interactions can occur outside of the dropdown itself.
     */
    useEffect(() => {

        function handleOutsideClick(event: MouseEvent) {

            /*
            * The event target represents the DOM element
            * that was clicked.
            *
            * `contains()` tells us whether that element is
            * somewhere inside the Platform navigation item.
            */
            const clickedElement = event.target as Node;

            if (
                platformRef.current &&
                !platformRef.current.contains(clickedElement)
            ) {
                setIsPlatformOpen(false);
            }
        }

        function handleEscapeKey(event: KeyboardEvent) {

            if (event.key === "Escape" && isPlatformOpen) {
                setIsPlatformOpen(false);

                platformButtonRef.current?.focus()
            }
        }


        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscapeKey);

        /*
        * React runs this cleanup when the component
        * unmounts.
        *
        * Removing document-level listeners is important
        * because the document exists independently of this
        * component. Without cleanup, the listener could
        * remain after the Header is gone.
        */
        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );

            document.removeEventListener(
                "keydown",
                handleEscapeKey
            );
        };

    }, [isPlatformOpen]); // Because the event handler needs the current value of that state.


    /**
     * Close any open navigation UI after the user selects
     * a destination.
     *
     * This is primarily useful on mobile, where leaving the
     * menu open after selecting a section would cover the
     * destination the user just navigated to.
     */
    function handleNavigation() {
        setIsMenuOpen(false);
        setIsPlatformOpen(false);
    }


    return (
        <header className="header">

            <div className="header__container saas-container">

                {/* ========================================
                    Brand
                    ======================================== */}

                <a
                    className="header__brand"
                    href="/saas"
                    aria-label="Nexora home"
                >
                    <span
                        className="header__brand-mark"
                        aria-hidden="true"
                    >
                        <Cloud
                            className="header__brand-icon"
                            size={18}
                            strokeWidth={1.8}
                        />
                    </span>

                    <span className="header__brand-name">
                        nexora
                    </span>
                </a>


                {/* ========================================
                    Desktop Navigation
                    ======================================== */}

                <nav
                    className="header__nav"
                    aria-label="Primary navigation"
                >
                    <ul className="header__nav-list">

                        {/* Platform dropdown */}
                        <li className="header__nav-item" ref={platformRef}>

                            <button
                                className="header__nav-button"
                                ref={platformButtonRef}
                                type="button"
                                aria-expanded={isPlatformOpen}
                                aria-controls="platform-menu"
                                onClick={handlePlatformToggle}
                            >
                                <span className="header__nav-button-text">
                                    Platform
                                </span>

                                <ChevronDown
                                    className={`header__nav-chevron ${
                                        isPlatformOpen
                                            ? "header__nav-chevron--open"
                                            : ""
                                    }`}
                                    size={14}
                                    strokeWidth={2}
                                    aria-hidden="true"
                                />
                            </button>


                            {/* Platform dropdown */}
                            {isPlatformOpen && (
                                <div
                                    className="header__dropdown"
                                    id="platform-menu"
                                >
                                    <div className="header__dropdown-header">

                                        <span className="header__dropdown-label">
                                            Platform
                                        </span>

                                        <p className="header__dropdown-description">
                                            Everything required to build,
                                            deploy, and operate applications.
                                        </p>

                                    </div>


                                    <ul className="header__dropdown-list">

                                        {platformLinks.map((item) => {

                                            const Icon = item.icon;

                                            return (
                                                <li
                                                    className="header__dropdown-item"
                                                    key={item.title}
                                                >
                                                    <a
                                                        className="header__dropdown-link"
                                                        href="#platform"
                                                        onClick={handleNavigation}
                                                    >
                                                        <span className="header__dropdown-icon">
                                                            <Icon
                                                                className="header__dropdown-icon-svg"
                                                                size={18}
                                                                strokeWidth={1.7}
                                                                aria-hidden="true"
                                                            />
                                                        </span>

                                                        <span className="header__dropdown-content">

                                                            <span className="header__dropdown-title">
                                                                {item.title}
                                                            </span>

                                                            <span className="header__dropdown-text">
                                                                {item.description}
                                                            </span>

                                                        </span>
                                                    </a>
                                                </li>
                                            );
                                        })}

                                    </ul>

                                </div>
                            )}

                        </li>


                        {/* Solutions */}
                        <li className="header__nav-item">
                            <a
                                className="header__nav-link"
                                href="#solutions"
                                onClick={handleNavigation}
                            >
                                Solutions
                            </a>
                        </li>


                        {/* Developers */}
                        <li className="header__nav-item">
                            <a
                                className="header__nav-link"
                                href="#developers"
                                onClick={handleNavigation}
                            >
                                Developers
                            </a>
                        </li>


                        {/* Pricing */}
                        <li className="header__nav-item">
                            <a
                                className="header__nav-link"
                                href="#pricing"
                                onClick={handleNavigation}
                            >
                                Pricing
                            </a>
                        </li>

                    </ul>
                </nav>


                {/* ========================================
                    Desktop Actions
                    ======================================== */}

                <div className="header__actions">

                    <a
                        className="header__sign-in"
                        href="#sign-in"
                    >
                        Sign in
                    </a>

                    <a
                        className="header__cta"
                        href="#get-started"
                    >
                        Get started
                    </a>

                </div>


                {/* ========================================
                    Mobile Menu Button
                    ======================================== */}

                <button
                    className="header__menu-button"
                    type="button"
                    aria-label={
                        isMenuOpen
                            ? "Close navigation"
                            : "Open navigation"
                    }
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-navigation"
                    onClick={handleMenuToggle}
                >
                    {isMenuOpen ? (
                        <X
                            className="header__menu-icon"
                            size={20}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />
                    ) : (
                        <Menu
                            className="header__menu-icon"
                            size={20}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />
                    )}
                </button>

            </div>


            {/* ========================================
                Mobile Navigation
                ======================================== */}

            {isMenuOpen && (
                <nav
                    className="header__mobile"
                    id="mobile-navigation"
                    aria-label="Mobile navigation"
                >
                    <div className="header__mobile-container saas-container">

                        <ul className="header__mobile-list">

                            <li className="header__mobile-item">
                                <a
                                    className="header__mobile-link"
                                    href="#platform"
                                >
                                    Platform
                                </a>
                            </li>

                            <li className="header__mobile-item">
                                <a
                                    className="header__mobile-link"
                                    href="#solutions"
                                >
                                    Solutions
                                </a>
                            </li>

                            <li className="header__mobile-item">
                                <a
                                    className="header__mobile-link"
                                    href="#developers"
                                >
                                    Developers
                                </a>
                            </li>

                            <li className="header__mobile-item">
                                <a
                                    className="header__mobile-link"
                                    href="#pricing"
                                >
                                    Pricing
                                </a>
                            </li>

                        </ul>


                        <div className="header__mobile-actions">

                            <a
                                className="header__mobile-sign-in"
                                href="#sign-in"
                            >
                                Sign in
                            </a>

                            <a
                                className="header__mobile-cta"
                                href="#get-started"
                            >
                                Get started
                            </a>

                        </div>

                    </div>
                </nav>
            )}

        </header>
    );
}

export default Header;