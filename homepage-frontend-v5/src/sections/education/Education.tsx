/*
 * ==========================================================================
 * EDUCATION + CERTIFICATIONS
 * ==========================================================================
 *
 * Section 05 of the homepage.
 *
 * PURPOSE
 * --------------------------------------------------------------------------
 *
 * This section answers:
 *
 *     "What is Jorge's formal technical foundation?"
 *
 * The section intentionally separates two different qualification types:
 *
 * EDUCATION
 * - Master of Science in Computer Science.
 * - Bachelor of Science in Computer Science.
 *
 * CERTIFICATIONS
 * - AWS Certified Machine Learning Engineer – Associate.
 * - CompTIA Project+.
 * - ITIL 4 Foundation.
 *
 * The two categories remain visually parallel on larger screens so
 * professional certifications do not feel like secondary information.
 *
 *
 * VISUAL DIRECTION
 * --------------------------------------------------------------------------
 *
 * This section uses the portfolio's existing technical/editorial language:
 *
 * - structural rules
 * - qualification indices
 * - compact metadata
 * - large qualification names
 * - orange identity accents
 * - cyan system-response interactions
 *
 * Certification records now behave more like verifiable technical records:
 *
 *     ISSUER
 *     CERTIFICATION
 *     CREDENTIAL ID
 *     ISSUED / VALID THROUGH
 *     VIEW CREDENTIAL ↗
 *
 * The certification itself is NOT made into one giant clickable surface.
 *
 * Instead, the explicit credential action is a semantic <a> element.
 * This makes the destination obvious and preserves expected browser behavior.
 *
 *
 * ANIMATION RESPONSIBILITIES
 * --------------------------------------------------------------------------
 *
 * NATIVE BROWSER JAVASCRIPT:
 * - IntersectionObserver determines when the section enters the viewport.
 * - window.matchMedia checks the user's reduced-motion preference.
 *
 * REACT:
 * - useLayoutEffect connects the animation lifecycle to this component.
 * - useRef gives GSAP and IntersectionObserver access to the section DOM node.
 * - React maps the education and certification data into semantic records.
 *
 * GSAP:
 * - Creates temporary initial animation states after JavaScript initializes.
 * - Builds the section using one finite entrance timeline.
 * - Reveals title lines, records, metadata, and credential actions.
 * - Uses stagger to offset repeated record entrances.
 * - Uses timeline position parameters to overlap related animation phases.
 *
 * NATIVE CSS:
 * - Handles all persistent layout and responsive behavior.
 * - Handles credential-link hover and focus-visible interactions.
 * - Handles overflow clipping used by several GSAP reveals.
 *
 *
 * IMPORTANT GSAP CONVENIENCES
 * --------------------------------------------------------------------------
 *
 * autoAlpha:
 * - GSAP convenience combining CSS opacity + visibility.
 *
 * y / yPercent:
 * - GSAP conveniences that ultimately create CSS translate transforms.
 * - They are NOT native CSS properties.
 *
 * stagger:
 * - GSAP convenience for offsetting the start time of repeated tweens.
 *
 * timeline position strings such as "<" and "-=0.2":
 * - GSAP timeline syntax.
 * - They are NOT JavaScript or CSS syntax.
 *
 *
 * ACCESSIBILITY
 * --------------------------------------------------------------------------
 *
 * - Content is visible in the CSS default state.
 * - Animation runs only when reduced motion is NOT requested.
 * - Credential destinations use real anchor elements.
 * - External links open in a new tab with rel="noopener noreferrer".
 * - Decorative icons are hidden from assistive technology.
 * - :focus-visible provides a clear keyboard interaction state.
 */

import {
    useLayoutEffect,
    useRef,
} from "react";

import gsap from "gsap";

import {
    ArrowUpRight,
} from "lucide-react";

import "./Education.css";


/*
 * ==========================================================================
 * TYPES
 * ==========================================================================
 */

interface EducationItem {
    index: string;
    degree: string;
    field: string;
    focus: string | null;
    institution: string;
    period: string;
}

interface CertificationItem {
    index: string;
    issuer: string;
    name: string;
    credentialId: string;
    issued: string;
    validThrough: string | null;
    credentialUrl: string;
    credentialAction: string;
}


/*
 * ==========================================================================
 * EDUCATION DATA
 * ==========================================================================
 *
 * Keeping section content in data structures prevents the rendered markup
 * from becoming duplicated and makes future qualification updates simple.
 */

const educationItems: EducationItem[] = [
    {
        index: "01",
        degree: "MASTER OF SCIENCE",
        field: "COMPUTER SCIENCE",
        focus: "ARTIFICIAL INTELLIGENCE + MACHINE LEARNING",
        institution: "WESTERN GOVERNORS UNIVERSITY",
        period: "AUG 2025 — JUL 2026",
    },
    {
        index: "02",
        degree: "BACHELOR OF SCIENCE",
        field: "COMPUTER SCIENCE",
        focus: null,
        institution: "WESTERN GOVERNORS UNIVERSITY",
        period: "AUG 2022 — JUN 2025",
    },
];


/*
 * ==========================================================================
 * CERTIFICATION DATA
 * ==========================================================================
 *
 * credentialAction:
 *
 * Credly links point directly to Jorge's public badge, so those actions use
 * "VIEW CREDENTIAL".
 *
 * ITIL currently points to PeopleCert's certificate verification service
 * rather than directly to an individual public certificate page, so its
 * action is more accurately described as "VERIFY CREDENTIAL".
 */

const certificationItems: CertificationItem[] = [
    {
        index: "01",
        issuer: "AWS",
        name: "CERTIFIED MACHINE LEARNING ENGINEER — ASSOCIATE",
        credentialId: "72468fe3-5bce-4cbe-b051-2f348025d216",
        issued: "JUN 2026",
        validThrough: "JUN 2029",
        credentialUrl:
            "https://www.credly.com/badges/72468fe3-5bce-4cbe-b051-2f348025d216/linked_in_profile",
        credentialAction: "VIEW CREDENTIAL",
    },
    {
        index: "02",
        issuer: "COMPTIA",
        name: "PROJECT+",
        credentialId: "COMP001022737827",
        issued: "MAR 2025",
        validThrough: null,
        credentialUrl:
            "https://www.credly.com/badges/674f816e-6e0a-4349-91f0-8e818440bb73/linked_in_profile",
        credentialAction: "VIEW CREDENTIAL",
    },
    {
        index: "03",
        issuer: "ITIL",
        name: "ITIL 4 FOUNDATION CERTIFICATE IN IT SERVICE MANAGEMENT",
        credentialId: "GR671767461JR",
        issued: "APR 2025",
        validThrough: "APR 2028",
        credentialUrl:
            "https://www.peoplecert.org/for-corporations/certificate-verification-service",
        credentialAction: "VERIFY CREDENTIAL",
    },
];


/*
 * ==========================================================================
 * COMPONENT
 * ==========================================================================
 */

function Education() {

    /*
     * ======================================================================
     * SECTION REFERENCE
     * ======================================================================
     *
     * REACT:
     *
     * useRef stores a reference to the actual <section> DOM element.
     *
     * GSAP uses this element as the scope for selector queries.
     *
     * IntersectionObserver also uses this same element as its observation
     * target.
     */

    const sectionRef = useRef<HTMLElement | null>(null);


    /*
     * ======================================================================
     * SECTION ENTRANCE
     * ======================================================================
     *
     * The section intentionally uses a finite animation sequence.
     *
     * There is:
     *
     * - no ScrollTrigger
     * - no scrub
     * - no scroll-jacking
     * - no continuous animation
     *
     * Native scrolling remains completely untouched.
     *
     *
     * SEQUENCE
     * ----------------------------------------------------------------------
     *
     * 01. Section metadata enters.
     * 02. Main metadata rule constructs.
     * 03. Heading reveals.
     * 04. Introduction enters.
     * 05. Main qualification rule constructs.
     * 06. Column headers enter.
     * 07. Education and Certifications populate in parallel.
     * 08. Internal record content resolves.
     * 09. Credential actions finish the certification sequence.
     */

    useLayoutEffect(() => {

        const section = sectionRef.current;

        if (!section) {
            return;
        }


        /*
         * NATIVE BROWSER API:
         *
         * matchMedia() reads the user's operating-system/browser preference.
         *
         * This is NOT a React API and is NOT provided by GSAP.
         */

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


        /*
         * If reduced motion is requested, we intentionally do not create
         * temporary hidden/transformed states.
         *
         * Because CSS leaves everything visible by default, simply returning
         * here produces the complete static section.
         */

        if (prefersReducedMotion) {
            return;
        }


        /*
         * GSAP:
         *
         * gsap.context() scopes selector-based animation work to this section.
         *
         * This prevents selectors such as ".education__degree-item" from
         * accidentally targeting similarly named elements elsewhere.
         *
         * context.revert() later restores GSAP-modified inline properties.
         */

        const context = gsap.context(() => {

            /*
             * ==============================================================
             * ELEMENT COLLECTIONS
             * ==============================================================
             *
             * gsap.utils.toArray() is a GSAP utility.
             *
             * It converts selector results into predictable arrays that can
             * be staggered by GSAP.
             */

            const titleLines = gsap.utils.toArray<HTMLElement>(
                ".education__title-line"
            );

            const columnHeaders = gsap.utils.toArray<HTMLElement>(
                ".education__column-header"
            );

            const degreeItems = gsap.utils.toArray<HTMLElement>(
                ".education__degree-item"
            );

            const certificationItems = gsap.utils.toArray<HTMLElement>(
                ".education__certification"
            );

            const degreeNames = gsap.utils.toArray<HTMLElement>(
                ".education__degree-name"
            );

            const degreeDetails = gsap.utils.toArray<HTMLElement>(
                ".education__degree-detail"
            );

            const certificationIssuers = gsap.utils.toArray<HTMLElement>(
                ".education__certification-issuer"
            );

            const certificationNames = gsap.utils.toArray<HTMLElement>(
                ".education__certification-name"
            );

            const credentialRows = gsap.utils.toArray<HTMLElement>(
                ".education__credential-row"
            );

            const certificationPeriods = gsap.utils.toArray<HTMLElement>(
                ".education__certification-period"
            );

            const credentialLinks = gsap.utils.toArray<HTMLElement>(
                ".education__credential-link"
            );


            /*
             * ==============================================================
             * TEMPORARY INITIAL STATES
             * ==============================================================
             *
             * GSAP creates these states only after JavaScript initializes.
             *
             * That is important for progressive enhancement:
             *
             * if JavaScript fails, CSS still displays all content.
             *
             *
             * clipPath:
             * - clip-path itself is native CSS.
             * - GSAP is merely interpolating between CSS clip-path values.
             */

            gsap.set(".education__meta", {
                autoAlpha: 0,
                y: 12,
            });

            gsap.set(".education__meta-rule", {
                scaleX: 0,
                transformOrigin: "left center",
            });

            gsap.set(titleLines, {
                yPercent: 110,
            });

            gsap.set(".education__introduction", {
                autoAlpha: 0,
                y: 18,
            });

            gsap.set(".education__body-rule", {
                scaleX: 0,
                transformOrigin: "left center",
            });

            gsap.set(columnHeaders, {
                autoAlpha: 0,
                y: 12,
            });

            gsap.set(degreeItems, {
                autoAlpha: 0,
                y: 24,
            });

            gsap.set(certificationItems, {
                autoAlpha: 0,
                y: 24,
            });

            gsap.set(degreeNames, {
                clipPath: "inset(0 100% 0 0)",
            });

            gsap.set(degreeDetails, {
                autoAlpha: 0,
                y: 8,
            });

            gsap.set(certificationIssuers, {
                clipPath: "inset(0 100% 0 0)",
            });

            gsap.set(certificationNames, {
                autoAlpha: 0,
                y: 8,
            });

            gsap.set(credentialRows, {
                autoAlpha: 0,
                x: -8,
            });

            gsap.set(certificationPeriods, {
                autoAlpha: 0,
                y: 8,
            });

            gsap.set(credentialLinks, {
                autoAlpha: 0,
                y: 8,
            });


            /*
             * ==============================================================
             * ENTRANCE TIMELINE
             * ==============================================================
             *
             * paused: true
             *
             * The timeline is constructed now but does not play immediately.
             *
             * Native IntersectionObserver below decides when it should play.
             */

            const timeline = gsap.timeline({
                paused: true,

                defaults: {
                    ease: "power3.out",
                },
            });


            /*
             * ==============================================================
             * 01 — SECTION METADATA
             * ==============================================================
             */

            timeline.to(".education__meta", {
                autoAlpha: 1,
                y: 0,
                duration: 0.42,
            });


            /*
             * ==============================================================
             * 02 — METADATA RULE
             * ==============================================================
             *
             * scaleX is a GSAP convenience that controls the native CSS
             * transform scaleX().
             */

            timeline.to(
                ".education__meta-rule",
                {
                    scaleX: 1,
                    duration: 0.7,
                    ease: "power2.inOut",
                },
                "<0.08"
            );


            /*
             * ==============================================================
             * 03 — MAIN TITLE
             * ==============================================================
             *
             * yPercent is GSAP-specific convenience syntax.
             *
             * The actual browser output is a CSS translate transform.
             */

            timeline.to(
                titleLines,
                {
                    yPercent: 0,
                    duration: 0.72,
                    stagger: 0.08,
                    ease: "power4.out",
                },
                "<0.08"
            );


            /*
             * ==============================================================
             * 04 — INTRODUCTION
             * ==============================================================
             */

            timeline.to(
                ".education__introduction",
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.52,
                },
                "<0.18"
            );


            /*
             * ==============================================================
             * 05 — MAIN STRUCTURAL RULE
             * ==============================================================
             */

            timeline.to(
                ".education__body-rule",
                {
                    scaleX: 1,
                    duration: 0.75,
                    ease: "power2.inOut",
                },
                "-=0.12"
            );


            /*
             * ==============================================================
             * 06 — COLUMN HEADERS
             * ==============================================================
             */

            timeline.to(
                columnHeaders,
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.42,
                    stagger: 0.08,
                },
                "-=0.38"
            );


            /*
             * ==============================================================
             * 07 — PRIMARY RECORD CONSTRUCTION
             * ==============================================================
             *
             * Education and Certifications enter together.
             *
             * The "<" timeline position parameter below is GSAP syntax.
             *
             * It starts the certification tween at the same timeline position
             * as the immediately preceding degree tween.
             */

            timeline.to(
                degreeItems,
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.56,
                    stagger: 0.1,
                },
                "-=0.12"
            );

            timeline.to(
                certificationItems,
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.56,
                    stagger: 0.1,
                },
                "<"
            );


            /*
             * ==============================================================
             * 08 — DEGREE CONTENT
             * ==============================================================
             *
             * The degree title is uncovered using native CSS clip-path values
             * interpolated by GSAP.
             */

            timeline.to(
                degreeNames,
                {
                    clipPath: "inset(0 0% 0 0)",
                    duration: 0.62,
                    stagger: 0.08,
                    ease: "power3.inOut",
                },
                "-=0.34"
            );

            timeline.to(
                degreeDetails,
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.045,
                },
                "-=0.42"
            );


            /*
             * ==============================================================
             * 09 — CERTIFICATION CONTENT
             * ==============================================================
             *
             * These stages give the certification side a small verification
             * / record-building feeling without implying fake system activity.
             */

            timeline.to(
                certificationIssuers,
                {
                    clipPath: "inset(0 0% 0 0)",
                    duration: 0.58,
                    stagger: 0.08,
                    ease: "power3.inOut",
                },
                "-=0.58"
            );

            timeline.to(
                certificationNames,
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.06,
                },
                "-=0.42"
            );

            timeline.to(
                credentialRows,
                {
                    autoAlpha: 1,
                    x: 0,
                    duration: 0.38,
                    stagger: 0.055,
                },
                "-=0.26"
            );

            timeline.to(
                certificationPeriods,
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.38,
                    stagger: 0.055,
                },
                "-=0.28"
            );

            timeline.to(
                credentialLinks,
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.06,
                },
                "-=0.24"
            );


            /*
             * ==============================================================
             * NATIVE VIEWPORT TRIGGER
             * ==============================================================
             *
             * IntersectionObserver is a native browser JavaScript API.
             *
             * It is NOT:
             * - React
             * - GSAP
             * - ScrollTrigger
             *
             * We only need to know when the section becomes visible.
             * Therefore, loading ScrollTrigger would add unnecessary
             * responsibility for this section.
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
                     * play() begins the already-created finite timeline.
                     */

                    timeline.play();


                    /*
                     * NATIVE BROWSER API:
                     *
                     * Once the section has entered, we no longer need to watch
                     * it. This guarantees the entrance does not replay whenever
                     * the user scrolls away and back.
                     */

                    observer.unobserve(section);
                },
                {
                    threshold: 0.18,
                }
            );

            observer.observe(section);


            /*
             * ==============================================================
             * CONTEXT-LOCAL CLEANUP
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
         *
         * React runs this function when the component unmounts.
         *
         * GSAP context.revert():
         * - kills scoped GSAP animations
         * - restores GSAP-modified inline properties
         *
         * This prevents stale animation state from surviving a React
         * unmount/remount cycle.
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
            className="education"
            id="education"
            aria-labelledby="education-title"
            ref={sectionRef}
        >
            <div className="education__container container">

                {/* ----------------------------------------------------------
                    SECTION METADATA
                ---------------------------------------------------------- */}

                <div className="education__meta">

                    <div className="education__meta-content text-mono">

                        <span className="education__section-index">
                            05 /
                        </span>

                        <span className="education__section-label">
                            EDUCATION + CERTIFICATIONS
                        </span>

                    </div>

                    {/*
                        Structural line used by the GSAP entrance.

                        Native CSS owns the line itself.
                        GSAP temporarily animates its scaleX transform.
                    */}

                    <span
                        className="education__meta-rule"
                        aria-hidden="true"
                    />

                </div>


                {/* ----------------------------------------------------------
                    SECTION HEADER
                ---------------------------------------------------------- */}

                <header className="education__header">

                    {/*
                        Each title line has its own clipping wrapper.

                        overflow: hidden is native CSS.

                        GSAP translates the inner text using yPercent.
                    */}

                    <h2
                        className="education__title"
                        id="education-title"
                    >
                        <span className="education__title-mask">
                            <span className="education__title-line">
                                ACADEMIC
                            </span>
                        </span>

                        <span className="education__title-mask">
                            <span className="education__title-line">
                                FOUNDATION
                                <span className="education__title-mark">
                                    .
                                </span>
                            </span>
                        </span>
                    </h2>


                    <div className="education__introduction">

                        <span className="education__introduction-label text-mono">
                            COMPUTER SCIENCE / AI + ML
                        </span>

                        <p className="education__introduction-copy">
                            Formal computer science education supported by
                            professional certifications across machine
                            learning, cloud systems, project management, and
                            IT service practices.
                        </p>

                    </div>

                </header>


                {/* ----------------------------------------------------------
                    QUALIFICATIONS BODY

                    Mobile:
                    Education → Certifications.

                    Tablet / Desktop:
                    Education | Certifications.

                    CSS Grid owns this responsive layout.
                ---------------------------------------------------------- */}

                <div className="education__body">

                    <span
                        className="education__body-rule"
                        aria-hidden="true"
                    />


                    {/* ------------------------------------------------------
                        EDUCATION COLUMN
                    ------------------------------------------------------ */}

                    <section
                        className="education__column education__column--degrees"
                        aria-labelledby="education-degrees-title"
                    >

                        <header className="education__column-header">

                            <div className="education__column-identity">

                                <span className="education__column-index text-mono">
                                    05.1 /
                                </span>

                                <h3
                                    className="education__column-title"
                                    id="education-degrees-title"
                                >
                                    EDUCATION
                                    <span className="education__column-mark">
                                        .
                                    </span>
                                </h3>

                            </div>

                            <span className="education__column-count text-mono">
                                02 / DEGREES
                            </span>

                        </header>


                        {/* --------------------------------------------------
                            DEGREE RECORDS
                        -------------------------------------------------- */}

                        <div className="education__degree-list">

                            {educationItems.map((item) => (

                                <article
                                    className="education__degree-item"
                                    key={item.index}
                                >

                                    <div className="education__degree-meta text-mono">

                                        <span className="education__degree-index">
                                            {item.index}
                                        </span>

                                        <span className="education__degree-type">
                                            DEGREE
                                        </span>

                                    </div>


                                    <h4 className="education__degree-name">

                                        <span className="education__degree-name-line">
                                            {item.degree}
                                        </span>

                                        <span className="education__degree-name-line">
                                            {item.field}

                                            <span className="education__degree-mark">
                                                .
                                            </span>
                                        </span>

                                    </h4>


                                    <div className="education__degree-details">

                                        {item.focus && (

                                            <div className="education__degree-detail">

                                                <span className="education__degree-detail-label text-mono">
                                                    FOCUS
                                                </span>

                                                <span className="education__degree-detail-value">
                                                    {item.focus}
                                                </span>

                                            </div>

                                        )}


                                        <div className="education__degree-detail">

                                            <span className="education__degree-detail-label text-mono">
                                                INSTITUTION
                                            </span>

                                            <span className="education__degree-detail-value">
                                                {item.institution}
                                            </span>

                                        </div>


                                        <div className="education__degree-detail">

                                            <span className="education__degree-detail-label text-mono">
                                                PERIOD
                                            </span>

                                            <span className="education__degree-detail-value">
                                                {item.period}
                                            </span>

                                        </div>

                                    </div>

                                </article>

                            ))}

                        </div>

                    </section>


                    {/* ------------------------------------------------------
                        CERTIFICATIONS COLUMN
                    ------------------------------------------------------ */}

                    <section
                        className="education__column education__column--certifications"
                        aria-labelledby="education-certifications-title"
                    >

                        <header className="education__column-header">

                            <div className="education__column-identity">

                                <span className="education__column-index text-mono">
                                    05.2 /
                                </span>

                                <h3
                                    className="education__column-title"
                                    id="education-certifications-title"
                                >
                                    CERTIFICATIONS

                                    <span className="education__column-mark">
                                        .
                                    </span>
                                </h3>

                            </div>

                            <span className="education__column-count text-mono">
                                03 / PROFESSIONAL
                            </span>

                        </header>


                        {/* --------------------------------------------------
                            CERTIFICATION RECORDS
                        -------------------------------------------------- */}

                        <div className="education__certification-list">

                            {certificationItems.map((item) => (

                                <article
                                    className="education__certification"
                                    key={item.index}
                                >

                                    <div className="education__certification-meta text-mono">

                                        <span className="education__certification-index">
                                            {item.index}
                                        </span>

                                        <span className="education__certification-type">
                                            CERTIFICATION
                                        </span>

                                    </div>


                                    <div className="education__certification-content">

                                        <span className="education__certification-issuer">
                                            {item.issuer}
                                        </span>

                                        <span className="education__certification-name">
                                            {item.name}
                                        </span>

                                    </div>


                                    {/* --------------------------------------
                                        CREDENTIAL IDENTIFIER

                                        This is informational text, not the
                                        interactive link itself.

                                        Keeping it separate prevents users from
                                        having to guess what is clickable.
                                    -------------------------------------- */}

                                    <div className="education__credential-row">

                                        <span className="education__credential-label text-mono">
                                            CREDENTIAL ID
                                        </span>

                                        <span className="education__credential-value text-mono">
                                            {item.credentialId}
                                        </span>

                                    </div>


                                    {/* --------------------------------------
                                        CERTIFICATION PERIOD

                                        CSS Grid allows the two values to share
                                        a row when space permits while stacking
                                        naturally on narrow screens.
                                    -------------------------------------- */}

                                    <div className="education__certification-period">

                                        <div className="education__certification-date">

                                            <span className="education__certification-date-label text-mono">
                                                ISSUED
                                            </span>

                                            <span className="education__certification-date-value">
                                                {item.issued}
                                            </span>

                                        </div>


                                        {item.validThrough && (

                                            <div className="education__certification-date">

                                                <span className="education__certification-date-label text-mono">
                                                    VALID THROUGH
                                                </span>

                                                <span className="education__certification-date-value">
                                                    {item.validThrough}
                                                </span>

                                            </div>

                                        )}

                                    </div>


                                    {/* --------------------------------------
                                        CREDENTIAL ACTION

                                        Native HTML:
                                        <a> provides actual link semantics,
                                        keyboard support, browser status-bar
                                        behavior, and expected open-in-new-tab
                                        behavior.

                                        No onClick / window.open() is needed.

                                        CSS handles hover/focus interaction.
                                    -------------------------------------- */}

                                    <a
                                        className="education__credential-link text-mono"
                                        href={item.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${item.credentialAction}: ${item.issuer} ${item.name}`}
                                    >

                                        <span className="education__credential-link-label">
                                            {item.credentialAction}
                                        </span>

                                        <span
                                            className="education__credential-link-line"
                                            aria-hidden="true"
                                        />

                                        <span className="education__credential-link-icon-frame">

                                            <ArrowUpRight
                                                className="education__credential-link-icon"
                                                aria-hidden="true"
                                            />

                                        </span>

                                    </a>

                                </article>

                            ))}

                        </div>

                    </section>

                </div>

            </div>
        </section>
    );
}

export default Education;