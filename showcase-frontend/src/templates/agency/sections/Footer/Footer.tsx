import { ArrowUp } from "lucide-react";

import "./Footer.css";


export default function Footer() {
    /*
     * NATIVE BROWSER BEHAVIOR
     *
     * The Back to Top link points to "#top".
     *
     * Make sure the top-level element of AgencyApp (or another element at the
     * beginning of the page) has id="top".
     *
     * We intentionally use a normal anchor rather than JavaScript
     * window.scrollTo(). Navigation to an element ID is already a native
     * browser capability, so React does not need to recreate it.
     */
    return (
        <footer className="agency-footer">
            <div className="agency-footer__container">
                <div className="agency-footer__top">
                    <div className="agency-footer__identity">
                        <p className="agency-footer__brand">
                            LUXURE®
                        </p>

                        <p className="agency-footer__description">
                            Independent creative
                            <br className="agency-footer__description-break" />
                            development studio
                            <br className="agency-footer__description-break" />
                            by Jorge Ramirez
                        </p>
                    </div>
                    

                    {/*
                     * SOCIAL NAVIGATION
                     *
                     * These currently use placeholder destinations because
                     * LUXURE is a fictional studio.
                     *
                     * Replace the href values with real profile URLs if this
                     * template is ever adapted for an actual client.
                     */}
                    <nav
                        className="agency-footer__social"
                        aria-label="Social media"
                    >
                        <p className="agency-footer__social-label">
                            Follow
                        </p>

                        <ul
                            className="agency-footer__social-list"
                            role="list"
                        >
                            <li className="agency-footer__social-item">
                                <a
                                    className="agency-footer__social-link"
                                    href="#"
                                >
                                    Instagram
                                </a>
                            </li>

                            <li className="agency-footer__social-item">
                                <a
                                    className="agency-footer__social-link"
                                    href="#"
                                >
                                    LinkedIn
                                </a>
                            </li>

                            <li className="agency-footer__social-item">
                                <a
                                    className="agency-footer__social-link"
                                    href="#"
                                >
                                    Are.na
                                </a>
                            </li>
                        </ul>
                    </nav>


                    <div className="agency-footer__studio">
                        <p className="agency-footer__studio-label">
                            Studio
                        </p>

                        <p className="agency-footer__location">
                            Los Angeles — CA
                        </p>

                        <p className="agency-footer__coordinates">
                            34.0522° N / 118.2437° W
                        </p>
                    </div>
                </div>


                {/*
                 * OVERSIZED WORDMARK
                 *
                 * This is intentionally typography rather than an image or
                 * SVG logo.
                 *
                 * That lets the wordmark scale fluidly with the viewport and
                 * keeps it connected to the typography system used throughout
                 * the rest of the agency template.
                 */}
                <div
                    className="agency-footer__wordmark"
                    aria-hidden="true"
                >
                    LUXURE
                </div>


                <div className="agency-footer__bottom">
                    <p className="agency-footer__copyright">
                        © 2026 LUXURE
                    </p>

                    <p className="agency-footer__credit">
                        Design + Development
                    </p>

                    <a
                        className="agency-footer__top-link"
                        href="#top"
                    >
                        <span className="agency-footer__top-text">
                            Back to top
                        </span>

                        <ArrowUp
                            className="agency-footer__top-icon"
                            aria-hidden="true"
                            strokeWidth={1.5}
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
}