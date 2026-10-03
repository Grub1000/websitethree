/*
 * ==========================================================================
 * CONTACT
 * ==========================================================================
 *
 * Section 08 — final section of the homepage.
 *
 * PURPOSE
 * --------------------------------------------------------------------------
 *
 * This section closes the Portfolio V2 narrative.
 *
 * The previous sections answer:
 *
 * 01 — Who is Jorge?
 * 02 — What systems can he build?
 * 03 — Who is behind the work?
 * 04 — What technologies does he work with?
 * 05 — What is his technical foundation?
 * 06 — What else has he built?
 * 07 — Can he build polished frontend experiences?
 *
 * Section 08 answers:
 *
 *     "How do I reach him?"
 *
 *
 * DESIGN DIRECTION
 * --------------------------------------------------------------------------
 *
 * This is intentionally NOT a conventional contact form.
 *
 * Instead, the section behaves like the final panel of Jorge's engineering
 * workspace:
 *
 * - oversized closing statement
 * - availability / discipline metadata
 * - three explicit contact destinations
 * - structural construction lines
 * - integrated final portfolio footer
 *
 * The result should feel like the deliberate end of the homepage rather than
 * another generic content section followed by an unrelated footer.
 *
 *
 * ANIMATION RESPONSIBILITIES
 * --------------------------------------------------------------------------
 *
 * NATIVE BROWSER JAVASCRIPT:
 * - IntersectionObserver detects when the section enters the viewport.
 * - window.matchMedia reads prefers-reduced-motion.
 *
 * REACT:
 * - useLayoutEffect connects animation setup/cleanup to component lifecycle.
 * - useRef provides access to the section DOM node.
 * - Contact links are rendered from a small data structure.
 *
 * GSAP:
 * - Creates temporary initial animation states.
 * - Runs one finite entrance timeline.
 * - Reveals the title through clipping masks.
 * - Constructs structural rules.
 * - Staggers contact destinations.
 * - Resolves the final footer.
 *
 * NATIVE CSS:
 * - Owns all persistent layout.
 * - Owns responsive behavior.
 * - Owns link hover/focus interaction.
 * - Owns clipping containers used by GSAP.
 *
 *
 * IMPORTANT GSAP CONVENIENCES
 * --------------------------------------------------------------------------
 *
 * autoAlpha:
 * - GSAP convenience combining CSS opacity + visibility.
 *
 * y / yPercent:
 * - GSAP convenience that ultimately produces CSS translate transforms.
 * - These are NOT native CSS properties.
 *
 * stagger:
 * - GSAP convenience that offsets repeated tween start times.
 *
 * "<", "-=0.2", etc:
 * - GSAP timeline position syntax.
 * - These are NOT CSS or normal JavaScript syntax.
 *
 *
 * ACCESSIBILITY
 * --------------------------------------------------------------------------
 *
 * - CSS never hides content by default.
 * - Reduced-motion users receive the complete static section.
 * - All destinations are semantic <a> elements.
 * - External destinations use rel="noopener noreferrer".
 * - :focus-visible provides keyboard focus feedback.
 * - Decorative graphics use aria-hidden="true".
 */

import {
    useLayoutEffect,
    useRef,
} from "react";

import gsap from "gsap";

import {
    ArrowUpRight,
    Mail,
} from "lucide-react";

import {
    FaGithub,
    FaLinkedinIn,
} from "react-icons/fa6";

import type {
    IconType,
} from "react-icons";

// import type {
//     LucideIcon,
// } from "lucide-react";

import "./Contact.css";


/*
 * ==========================================================================
 * CONTACT CONFIGURATION
 * ==========================================================================
 *
 * Replace ONLY these two placeholders with the exact public contact details
 * you want Portfolio V2 to expose.
 *
 * Everything else in the component can remain unchanged.
 */

const CONTACT_EMAIL = "jorgeramirezsoftware@gmail.com";

const LINKEDIN_URL = "https://www.linkedin.com/in/jorge-ramirez-02363a18b/";

const GITHUB_URL = "https://github.com/Grub1000";


/*
 * ==========================================================================
 * TYPES
 * ==========================================================================
 */

interface ContactChannel {
    index: string;
    label: string;
    value: string;
    action: string;
    href: string;
    icon: IconType;
    external: boolean;
}


/*
 * ==========================================================================
 * CONTACT DATA
 * ==========================================================================
 *
 * Keeping these destinations data-driven means adding another contact method
 * later does not require duplicating the complete row structure.
 */

const contactChannels: ContactChannel[] = [
    {
        index: "01",
        label: "EMAIL",
        value: CONTACT_EMAIL,
        action: "SEND MESSAGE",
        href: `mailto:${CONTACT_EMAIL}`,
        icon: Mail,
        external: false,
    },
    {
        index: "02",
        label: "LINKEDIN",
        value: "PROFESSIONAL PROFILE",
        action: "CONNECT",
        href: LINKEDIN_URL,
        icon: FaLinkedinIn,
        external: true,
    },
    {
        index: "03",
        label: "GITHUB",
        value: "PROJECTS + SOURCE CODE",
        action: "EXPLORE",
        href: GITHUB_URL,
        icon: FaGithub,
        external: true,
    },
];


/*
 * ==========================================================================
 * COMPONENT
 * ==========================================================================
 */

function Contact() {

    /*
     * ======================================================================
     * SECTION REFERENCE
     * ======================================================================
     *
     * REACT:
     *
     * useRef stores the actual section DOM element without causing renders.
     *
     * That DOM reference is used by:
     *
     * - gsap.context()
     * - IntersectionObserver
     */

    const sectionRef = useRef<HTMLElement | null>(null);


    /*
     * ======================================================================
     * SECTION ENTRANCE
     * ======================================================================
     *
     * This animation runs once.
     *
     * There is deliberately:
     *
     * - no ScrollTrigger
     * - no scrub
     * - no scroll-jacking
     * - no infinite animation
     * - no fake terminal typing
     * - no pulsing availability indicator
     *
     * Once assembled, the final section becomes completely calm.
     */

    useLayoutEffect(() => {

        const section = sectionRef.current;

        if (!section) {
            return;
        }


        /*
         * NATIVE BROWSER API:
         *
         * matchMedia() reads the user's reduced-motion preference.
         *
         * This is not React functionality and is not provided by GSAP.
         */

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


        /*
         * CSS displays everything normally by default.
         *
         * Therefore, reduced-motion users do not need any special GSAP
         * fallback. We simply avoid initializing the animation.
         */

        if (prefersReducedMotion) {
            return;
        }


        /*
         * GSAP:
         *
         * gsap.context() scopes selector-based animation work to this section.
         *
         * context.revert() later restores GSAP-generated inline styles during
         * React cleanup.
         */

        const context = gsap.context(() => {

            /*
             * ==============================================================
             * ELEMENT COLLECTIONS
             * ==============================================================
             *
             * gsap.utils.toArray() is a GSAP utility.
             *
             * It gives us typed arrays that GSAP can stagger predictably.
             */

            const titleLines = gsap.utils.toArray<HTMLElement>(
                ".contact__title-line"
            );

            const contactRows = gsap.utils.toArray<HTMLElement>(
                ".contact__channel"
            );

            const channelRules = gsap.utils.toArray<HTMLElement>(
                ".contact__channel-rule"
            );

            const footerItems = gsap.utils.toArray<HTMLElement>(
                ".contact__footer-item"
            );


            /*
             * ==============================================================
             * TEMPORARY INITIAL STATES
             * ==============================================================
             *
             * These states exist ONLY after JavaScript and GSAP initialize.
             *
             * CSS itself never hides this content.
             */

            gsap.set(".contact__meta-content", {
                autoAlpha: 0,
                y: 12,
            });

            gsap.set(".contact__meta-rule", {
                scaleX: 0,
                transformOrigin: "left center",
            });

            gsap.set(titleLines, {
                yPercent: 110,
            });

            gsap.set(".contact__statement", {
                autoAlpha: 0,
                y: 18,
            });

            gsap.set(".contact__availability", {
                autoAlpha: 0,
                y: 14,
            });

            gsap.set(".contact__body-rule", {
                scaleX: 0,
                transformOrigin: "left center",
            });

            gsap.set(".contact__channels-label", {
                autoAlpha: 0,
                y: 10,
            });

            gsap.set(contactRows, {
                autoAlpha: 0,
                y: 24,
            });

            gsap.set(channelRules, {
                scaleX: 0,
                transformOrigin: "left center",
            });

            gsap.set(".contact__footer-rule", {
                scaleX: 0,
                transformOrigin: "left center",
            });

            gsap.set(footerItems, {
                autoAlpha: 0,
                y: 10,
            });


            /*
             * ==============================================================
             * TIMELINE
             * ==============================================================
             *
             * paused: true
             *
             * The timeline is prepared now but does not begin until the
             * native IntersectionObserver reports that Section 08 is visible.
             */

            const timeline = gsap.timeline({
                paused: true,

                defaults: {
                    ease: "power3.out",
                },
            });


            /*
             * ==============================================================
             * 01 — SECTION IDENTITY
             * ==============================================================
             */

            timeline.to(".contact__meta-content", {
                autoAlpha: 1,
                y: 0,
                duration: 0.42,
            });

            timeline.to(
                ".contact__meta-rule",
                {
                    scaleX: 1,
                    duration: 0.8,
                    ease: "power2.inOut",
                },
                "<0.08"
            );


            /*
             * ==============================================================
             * 02 — CLOSING TITLE
             * ==============================================================
             *
             * yPercent is GSAP-specific shorthand.
             *
             * GSAP converts this to native CSS transforms internally.
             */

            timeline.to(
                titleLines,
                {
                    yPercent: 0,
                    duration: 0.82,
                    stagger: 0.1,
                    ease: "power4.out",
                },
                "<0.12"
            );


            /*
             * ==============================================================
             * 03 — SUPPORTING STATEMENT
             * ==============================================================
             */

            timeline.to(
                ".contact__statement",
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.52,
                },
                "<0.24"
            );


            /*
             * ==============================================================
             * 04 — AVAILABILITY RECORD
             * ==============================================================
             */

            timeline.to(
                ".contact__availability",
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.46,
                },
                "<0.14"
            );


            /*
             * ==============================================================
             * 05 — MAIN STRUCTURAL RULE
             * ==============================================================
             */

            timeline.to(
                ".contact__body-rule",
                {
                    scaleX: 1,
                    duration: 0.85,
                    ease: "power2.inOut",
                },
                "-=0.16"
            );


            /*
             * ==============================================================
             * 06 — CONTACT DIRECTORY
             * ==============================================================
             */

            timeline.to(
                ".contact__channels-label",
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.38,
                },
                "-=0.36"
            );

            timeline.to(
                contactRows,
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.55,
                    stagger: 0.09,
                },
                "-=0.18"
            );


            /*
             * Each contact record gets its own construction line.
             *
             * scaleX is GSAP convenience syntax controlling the native CSS
             * scaleX() transform.
             */

            timeline.to(
                channelRules,
                {
                    scaleX: 1,
                    duration: 0.58,
                    stagger: 0.07,
                    ease: "power2.inOut",
                },
                "-=0.52"
            );


            /*
             * ==============================================================
             * 07 — FINAL PORTFOLIO FOOTER
             * ==============================================================
             *
             * This is deliberately the last animation on the homepage.
             *
             * The footer resolves, and then the page is completely still.
             */

            timeline.to(
                ".contact__footer-rule",
                {
                    scaleX: 1,
                    duration: 0.8,
                    ease: "power2.inOut",
                },
                "-=0.12"
            );

            timeline.to(
                footerItems,
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.42,
                    stagger: 0.06,
                },
                "-=0.38"
            );


            /*
             * ==============================================================
             * VIEWPORT OBSERVER
             * ==============================================================
             *
             * IntersectionObserver is a native browser JavaScript API.
             *
             * It is NOT:
             *
             * - React
             * - GSAP
             * - ScrollTrigger
             *
             * We only need a one-time visibility trigger, so the browser API
             * is sufficient.
             */

            const observer = new IntersectionObserver(
                (entries) => {

                    const entry = entries[0];

                    if (!entry?.isIntersecting) {
                        return;
                    }

                    /*
                     * GSAP:
                     *
                     * Start the previously paused finite timeline.
                     */

                    timeline.play();


                    /*
                     * NATIVE BROWSER:
                     *
                     * Stop observing after the first entrance.
                     *
                     * This guarantees the section does not replay every time
                     * the visitor scrolls away and returns.
                     */

                    observer.unobserve(section);
                },
                {
                    threshold: 0.12,
                }
            );

            observer.observe(section);


            /*
             * ==============================================================
             * LOCAL CLEANUP
             * ==============================================================
             */

            return () => {
                observer.disconnect();
                timeline.kill();
            };

        }, section);


        /*
         * ==================================================================
         * REACT / GSAP CLEANUP
         * ==================================================================
         */

        return () => {
            context.revert();
        };

    }, []);


    /*
     * ======================================================================
     * RENDER
     * ======================================================================
     */

    return (
        <section
            className="contact"
            id="contact"
            aria-labelledby="contact-title"
            ref={sectionRef}
        >
            <div className="contact__container container">

                {/* ----------------------------------------------------------
                    SECTION METADATA
                ---------------------------------------------------------- */}

                <div className="contact__meta">

                    <div className="contact__meta-content text-mono">

                        <span className="contact__section-index">
                            08 /
                        </span>

                        <span className="contact__section-label">
                            CONTACT
                        </span>

                    </div>

                    <span
                        className="contact__meta-rule"
                        aria-hidden="true"
                    />

                </div>


                {/* ----------------------------------------------------------
                    CLOSING HEADER

                    The final heading is intentionally very large.

                    It acts as the visual conclusion to the homepage rather
                    than behaving like a conventional Contact heading.
                ---------------------------------------------------------- */}

                <header className="contact__header">

                    <div className="contact__heading-group">

                        <span className="contact__eyebrow text-mono">
                            OPEN TO NEW OPPORTUNITIES
                        </span>

                        <h2
                            className="contact__title"
                            id="contact-title"
                        >

                            {/*
                                Native CSS overflow clipping lives on each mask.

                                GSAP moves the inner line through that mask
                                during the one-time entrance.
                            */}

                            <span className="contact__title-mask">
                                <span className="contact__title-line">
                                    LET'S
                                </span>
                            </span>

                            <span className="contact__title-mask">
                                <span className="contact__title-line">
                                    BUILD
                                    <span className="contact__title-mark">
                                        .
                                    </span>
                                </span>
                            </span>

                        </h2>

                    </div>


                    {/* ------------------------------------------------------
                        INTRODUCTION / AVAILABILITY
                    ------------------------------------------------------ */}

                    <div className="contact__intro">

                        <p className="contact__statement">
                            Interested in software engineering opportunities
                            involving full-stack systems, machine learning,
                            AI-powered applications, and technically ambitious
                            products.
                        </p>


                        <div className="contact__availability">

                            <span
                                className="contact__availability-marker"
                                aria-hidden="true"
                            />

                            <div className="contact__availability-content">

                                <span className="contact__availability-label text-mono">
                                    CURRENT STATUS
                                </span>

                                <span className="contact__availability-value">
                                    AVAILABLE FOR OPPORTUNITIES
                                </span>

                            </div>

                        </div>

                    </div>

                </header>


                {/* ----------------------------------------------------------
                    CONTACT DIRECTORY
                ---------------------------------------------------------- */}

                <div className="contact__body">

                    <span
                        className="contact__body-rule"
                        aria-hidden="true"
                    />


                    <div className="contact__channels-header">

                        <span className="contact__channels-label text-mono">
                            DIRECT CHANNELS / 03
                        </span>

                        <span className="contact__channels-note text-mono">
                            SELECT DESTINATION
                        </span>

                    </div>


                    <nav
                        className="contact__channels"
                        aria-label="Contact links"
                    >

                        {contactChannels.map((channel) => {

                            const Icon = channel.icon;

                            return (
                                <a
                                    className="contact__channel"
                                    href={channel.href}
                                    key={channel.index}
                                    {...(
                                        channel.external
                                            ? {
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                            }
                                            : {}
                                    )}
                                >

                                    {/* --------------------------------------
                                        CHANNEL IDENTITY
                                    -------------------------------------- */}

                                    <div className="contact__channel-identity">

                                        <span className="contact__channel-index text-mono">
                                            {channel.index}
                                        </span>

                                        <span className="contact__channel-icon-frame">

                                            <Icon
                                                className="contact__channel-icon"
                                                aria-hidden="true"
                                            />

                                        </span>

                                        <span className="contact__channel-label">
                                            {channel.label}
                                        </span>

                                    </div>


                                    {/* --------------------------------------
                                        CHANNEL DESCRIPTION
                                    -------------------------------------- */}

                                    <span className="contact__channel-value text-mono">
                                        {channel.value}
                                    </span>


                                    {/* --------------------------------------
                                        CHANNEL ACTION
                                    -------------------------------------- */}

                                    <div className="contact__channel-action">

                                        <span className="contact__channel-action-label text-mono">
                                            {channel.action}
                                        </span>

                                        <ArrowUpRight
                                            className="contact__channel-arrow"
                                            aria-hidden="true"
                                        />

                                    </div>


                                    {/* --------------------------------------
                                        CONSTRUCTION / INTERACTION RULE

                                        CSS owns the persistent rule.

                                        GSAP constructs it during entrance.

                                        CSS later changes its color when the
                                        visitor interacts with the row.
                                    -------------------------------------- */}

                                    <span
                                        className="contact__channel-rule"
                                        aria-hidden="true"
                                    />

                                </a>
                            );
                        })}

                    </nav>

                </div>


                {/* ----------------------------------------------------------
                    INTEGRATED FINAL FOOTER

                    This footer belongs to the Contact section intentionally.

                    It closes both Section 08 and the entire homepage.
                ---------------------------------------------------------- */}

                <footer className="contact__footer">

                    <span
                        className="contact__footer-rule"
                        aria-hidden="true"
                    />


                    <div className="contact__footer-grid">

                        <div className="contact__footer-item contact__footer-item--identity">

                            <span className="contact__footer-label text-mono">
                                IDENTITY
                            </span>

                            <span className="contact__footer-value">
                                JORGE RAMIREZ
                            </span>

                            <span className="contact__footer-detail text-mono">
                                SOFTWARE ENGINEER
                            </span>

                        </div>


                        <div className="contact__footer-item contact__footer-item--location">

                            <span className="contact__footer-label text-mono">
                                LOCATION
                            </span>

                            <span className="contact__footer-value">
                                SANTA ANA / CALIFORNIA
                            </span>

                            <span className="contact__footer-detail text-mono">
                                UNITED STATES
                            </span>

                        </div>


                        <div className="contact__footer-item contact__footer-item--portfolio">

                            <span className="contact__footer-label text-mono">
                                SYSTEM
                            </span>

                            <span className="contact__footer-value">
                                PORTFOLIO V5
                            </span>

                            <span className="contact__footer-detail text-mono">
                                END / 08
                            </span>

                        </div>

                    </div>

                </footer>

            </div>
        </section>
    );
}

export default Contact;