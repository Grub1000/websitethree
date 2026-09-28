import "./Header.css";

export default function Header() {
    return (
        <header className="agency-header">
            <div className="agency-header__container">
                <a
                    className="agency-header__brand"
                    href="#top"
                    aria-label="Luxure home"
                >
                    LUXURE
                </a>

                <nav
                    className="agency-header__navigation"
                    aria-label="Primary navigation"
                >
                    <a
                        className="agency-header__navigation-link"
                        href="#work"
                    >
                        Work
                    </a>

                    <a
                        className="agency-header__navigation-link"
                        href="#studio"
                    >
                        Studio
                    </a>

                    <a
                        className="agency-header__navigation-link"
                        href="#contact"
                    >
                        Contact
                    </a>
                </nav>

                <span
                    className="agency-header__year"
                    aria-label="2026"
                >
                    (26)
                </span>
            </div>
        </header>
    );
}