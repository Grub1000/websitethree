import {
    Activity,
    Cloud,
    CodeXml,
    ExternalLink,
} from "lucide-react";
import "./Footer.css";

const footerGroups = [
    {
        id: "product",
        label: "Product",
        links: [
            {
                label: "Features",
                href: "#features",
            },
            {
                label: "Integrations",
                href: "#integrations",
            },
            {
                label: "Pricing",
                href: "#pricing",
            },
            {
                label: "Changelog",
                href: "#",
            },
        ],
    },
    {
        id: "resources",
        label: "Resources",
        links: [
            {
                label: "Documentation",
                href: "#",
            },
            {
                label: "API reference",
                href: "#",
            },
            {
                label: "CLI",
                href: "#",
            },
            {
                label: "System status",
                href: "#",
            },
        ],
    },
    {
        id: "company",
        label: "Company",
        links: [
            {
                label: "About",
                href: "#",
            },
            {
                label: "Careers",
                href: "#",
            },
            {
                label: "Security",
                href: "#",
            },
            {
                label: "Contact",
                href: "#",
            },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__main">
                    <div className="footer__brand">
                        <a
                            className="footer__brand-link"
                            href="#"
                            aria-label="Nexora home"
                        >
                            <span
                                className="footer__brand-mark"
                                aria-hidden="true"
                            >
                                <Cloud
                                    className="footer__brand-icon"
                                    size={18}
                                    strokeWidth={1.7}
                                />
                            </span>

                            <span className="footer__brand-name">
                                Nexora
                            </span>
                        </a>

                        <p className="footer__brand-description">
                            Deploy applications without turning
                            infrastructure into another project.
                        </p>

                        {/*
                         * This compact status indicator mirrors the healthy
                         * infrastructure language used elsewhere on the page.
                         *
                         * It belongs with the product identity instead of the
                         * navigation because operational reliability is part
                         * of how Nexora presents itself as a platform.
                         */}
                        <div className="footer__status">
                            <span
                                className="footer__status-dot"
                                aria-hidden="true"
                            />

                            <span className="footer__status-text">
                                All systems operational
                            </span>
                        </div>
                    </div>

                    <nav
                        className="footer__navigation"
                        aria-label="Footer navigation"
                    >
                        {footerGroups.map((group) => (
                            <div
                                className="footer__navigation-group"
                                key={group.id}
                            >
                                <h2 className="footer__navigation-heading">
                                    {group.label}
                                </h2>

                                <ul className="footer__navigation-list">
                                    {group.links.map((link) => (
                                        <li
                                            className="footer__navigation-item"
                                            key={link.label}
                                        >
                                            <a
                                                className="footer__navigation-link"
                                                href={link.href}
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>

                <div className="footer__platform">
                    <div className="footer__platform-context">
                        <Activity
                            className="footer__platform-icon"
                            size={14}
                            strokeWidth={1.7}
                            aria-hidden="true"
                        />

                        <span className="footer__platform-label">
                            Global infrastructure
                        </span>
                    </div>

                    <div className="footer__platform-details">
                        <span className="footer__platform-detail">
                            24 regions
                        </span>

                        <span
                            className="footer__platform-separator"
                            aria-hidden="true"
                        >
                            /
                        </span>

                        <span className="footer__platform-detail">
                            Edge network healthy
                        </span>

                        <span
                            className="footer__platform-separator"
                            aria-hidden="true"
                        >
                            /
                        </span>

                        <span className="footer__platform-detail">
                            API operational
                        </span>
                    </div>
                </div>

                <div className="footer__bottom">
                    <div className="footer__copyright">
                        <span className="footer__copyright-text">
                            © 2026 Nexora
                        </span>

                        <span className="footer__copyright-note">
                            Fictional infrastructure platform.
                        </span>

                        <span className="footer__copyright-note">
                            By Jorge Ramirez.
                        </span>
                    </div>

                    <div className="footer__bottom-links">
                        <a
                            className="footer__bottom-link"
                            href="#"
                        >
                            Privacy
                        </a>

                        <a
                            className="footer__bottom-link"
                            href="#"
                        >
                            Terms
                        </a>

                        {/*
                         * Lucide no longer provides the GitHub brand icon.
                         *
                         * CodeXml communicates source-code/repository intent
                         * without pretending to be an official GitHub logo.
                         * If this later points to a real GitHub repository,
                         * replace it with GitHub's official SVG brand asset.
                         */}
                        <a
                            className="footer__source-link"
                            href="#"
                        >
                            <CodeXml
                                className="footer__source-icon"
                                size={14}
                                strokeWidth={1.7}
                                aria-hidden="true"
                            />

                            <span className="footer__source-text">
                                Source
                            </span>

                            <ExternalLink
                                className="footer__source-external-icon"
                                size={11}
                                strokeWidth={1.7}
                                aria-hidden="true"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}