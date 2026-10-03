import "./header.css";

const navigationItems = [
    { label: "Work", href: "#work" },
    { label: "Archive", href: "#project-archive" },
    { label: "Stack", href: "#stack" },
    { label: "About", href: "#about" },
    { label: "Lab", href: "#frontend-showcase" },
];

function Header() {
    return (
        <header className="site-header">
            <div className="site-header__container container">
                <a
                    className="site-header__brand"
                    href="#top"
                    aria-label="Jorge Ramirez — Home"
                >
                    <span className="site-header__brand-mark" aria-hidden="true">
                        JR
                    </span>

                    <span className="site-header__brand-name">
                        Jorge Ramirez
                    </span>
                </a>

                <nav
                    className="site-header__navigation"
                    aria-label="Primary navigation"
                >
                    <ul className="site-header__navigation-list">
                        {navigationItems.map((item) => (
                            <li
                                className="site-header__navigation-item"
                                key={item.href}
                            >
                                <a
                                    className="site-header__navigation-link"
                                    href={item.href}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <a
                    className="site-header__contact"
                    href="#contact"
                >
                    <span
                        className="site-header__contact-status"
                        aria-hidden="true"
                    />

                    Contact
                </a>
            </div>
        </header>
    );
}

export default Header;