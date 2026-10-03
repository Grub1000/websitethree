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
 * - ITIL 4.
 *
 * These are presented side-by-side on larger screens so certifications do
 * not feel like an appendix hidden beneath the academic records.
 *
 *
 * VISUAL DIRECTION
 * --------------------------------------------------------------------------
 *
 * Desktop:
 *
 *     EDUCATION                 CERTIFICATIONS
 *     02 / DEGREES              03 / PROFESSIONAL
 *
 *     Master's                  AWS
 *     Bachelor's                CompTIA
 *                               ITIL
 *
 * Mobile:
 *
 *     EDUCATION
 *     Master's
 *     Bachelor's
 *
 *     CERTIFICATIONS
 *     AWS
 *     CompTIA
 *     ITIL
 *
 *
 * ANIMATION RESPONSIBILITIES
 * --------------------------------------------------------------------------
 *
 * GSAP:
 * - Runs one finite entrance sequence.
 * - Uses ScrollTrigger only to begin the sequence.
 * - Constructs structural rules using scaleX.
 * - Reveals Education and Certifications in parallel.
 * - Uses short staggered entrances inside each column.
 *
 * Native CSS / browser:
 * - transform and overflow are native CSS behaviors.
 *
 * GSAP conveniences:
 * - autoAlpha = opacity + visibility.
 * - y / yPercent create CSS translate transforms.
 * - scaleX creates horizontal scaling.
 * - stagger offsets repeated tween start times.
 * - timeline position parameters coordinate parallel animation.
 *
 *
 * ACCESSIBILITY
 * --------------------------------------------------------------------------
 *
 * Animation runs only when:
 *
 *     prefers-reduced-motion: no-preference
 *
 * CSS never hides content by default.
 */

import {
    useEffect,
    useRef,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Education.css";


/*
 * ==========================================================================
 * GSAP PLUGIN REGISTRATION
 * ==========================================================================
 */

gsap.registerPlugin(ScrollTrigger);


/*
 * ==========================================================================
 * EDUCATION DATA
 * ==========================================================================
 */

const educationItems = [
    {
        index: "01",
        degree: "MASTER OF SCIENCE",
        field: "COMPUTER SCIENCE",
        focus: "ARTIFICIAL INTELLIGENCE + MACHINE LEARNING",
        institution: "WESTERN GOVERNORS UNIVERSITY",
    },
    {
        index: "02",
        degree: "BACHELOR OF SCIENCE",
        field: "COMPUTER SCIENCE",
        focus: null,
        institution: "WESTERN GOVERNORS UNIVERSITY",
    },
];


/*
 * ==========================================================================
 * CERTIFICATION DATA
 * ==========================================================================
 */

const certificationItems = [
    {
        index: "01",
        issuer: "AWS",
        name: "CERTIFIED MACHINE LEARNING ENGINEER — ASSOCIATE",
    },
    {
        index: "02",
        issuer: "COMPTIA",
        name: "PROJECT+",
    },
    {
        index: "03",
        issuer: "ITIL",
        name: "ITIL 4",
    },
];


function Education() {

    /*
     * ======================================================================
     * SECTION REFERENCE
     * ======================================================================
     */

    const sectionRef = useRef<HTMLElement | null>(null);


    /*
     * ======================================================================
     * SECTION ENTRANCE
     * ======================================================================
     *
     * Sequence:
     *
     * 01. Section metadata
     * 02. Heading
     * 03. Introduction
     * 04. Main structural rule
     * 05. Education + Certification column headers
     * 06. Both columns populate in parallel
     *
     * The parallel reveal is intentional:
     *
     * Education and Certifications represent separate but equally visible
     * parts of the technical foundation.
     */

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) {
            return;
        }

        const media = gsap.matchMedia();

        const context = gsap.context(() => {

            media.add(
                "(prefers-reduced-motion: no-preference)",
                () => {

                    /*
                     * ======================================================
                     * ELEMENT COLLECTIONS
                     * ======================================================
                     */

                    const titleLines = gsap.utils.toArray<HTMLElement>(
                        ".education__title-line"
                    );

                    const columnHeaders = gsap.utils.toArray<HTMLElement>(
                        ".education__column-header"
                    );

                    const educationItems = gsap.utils.toArray<HTMLElement>(
                        ".education__degree-item"
                    );

                    const certificationItems = gsap.utils.toArray<HTMLElement>(
                        ".education__certification"
                    );


                    /*
                     * ======================================================
                     * TIMELINE
                     * ======================================================
                     */

                    const timeline = gsap.timeline({
                        defaults: {
                            ease: "power3.out",
                        },

                        scrollTrigger: {
                            trigger: section,
                            start: "top 78%",
                            once: true,
                        },
                    });


                    /*
                     * ======================================================
                     * 01 — SECTION METADATA
                     * ======================================================
                     */

                    timeline.from(
                        ".education__meta",
                        {
                            autoAlpha: 0,
                            y: 12,
                            duration: 0.4,
                        }
                    );


                    /*
                     * ======================================================
                     * 02 — MAIN TITLE
                     * ======================================================
                     */

                    timeline.from(
                        titleLines,
                        {
                            autoAlpha: 0,
                            yPercent: 55,
                            duration: 0.65,
                            stagger: 0.08,
                        },
                        "<0.08"
                    );


                    /*
                     * ======================================================
                     * 03 — INTRODUCTION
                     * ======================================================
                     */

                    timeline.from(
                        ".education__introduction",
                        {
                            autoAlpha: 0,
                            y: 14,
                            duration: 0.5,
                        },
                        "<0.14"
                    );


                    /*
                     * ======================================================
                     * 04 — MAIN STRUCTURAL RULE
                     * ======================================================
                     *
                     * scaleX:
                     * - GSAP convenience around native CSS transform.
                     *
                     * transformOrigin:
                     * - Causes the line to construct left → right.
                     */

                    timeline.from(
                        ".education__body-rule",
                        {
                            scaleX: 0,
                            transformOrigin: "left center",
                            duration: 0.7,
                            ease: "power2.inOut",
                        },
                        "-=0.08"
                    );


                    /*
                     * ======================================================
                     * 05 — COLUMN HEADERS
                     * ======================================================
                     */

                    timeline.from(
                        columnHeaders,
                        {
                            autoAlpha: 0,
                            y: 10,
                            duration: 0.4,
                            stagger: 0.08,
                        },
                        "-=0.35"
                    );


                    /*
                     * ======================================================
                     * 06 — EDUCATION COLUMN
                     * ======================================================
                     *
                     * This begins at the same timeline position as the
                     * Certification column below.
                     */

                    timeline.fromTo(
                        educationItems,
                        {
                            autoAlpha: 0,
                            y: 16,
                        },
                        {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.5,
                            stagger: 0.1,

                            clearProps: "opacity,visibility,transform",
                        },
                        "-=0.12"
                    );


                    /*
                     * ======================================================
                     * 07 — CERTIFICATION COLUMN
                     * ======================================================
                     *
                     * "<" is a GSAP timeline position parameter.
                     *
                     * It tells this tween to begin at the same time as the
                     * immediately preceding Education tween.
                     */

                    timeline.fromTo(
                        certificationItems,
                        {
                            autoAlpha: 0,
                            y: 16,
                        },
                        {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.5,
                            stagger: 0.08,

                            clearProps: "opacity,visibility,transform",
                        },
                        "<"
                    );


                    return () => {
                        timeline.kill();
                    };
                }
            );

        }, section);


        /*
         * ==================================================================
         * REACT / GSAP CLEANUP
         * ==================================================================
         */

        return () => {
            media.revert();
            context.revert();
        };

    }, []);


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

                <div className="education__meta text-mono">

                    <span className="education__section-index">
                        05 /
                    </span>

                    <span className="education__section-label">
                        EDUCATION + CERTIFICATIONS
                    </span>

                </div>


                {/* ----------------------------------------------------------
                    SECTION HEADER
                ---------------------------------------------------------- */}

                <header className="education__header">

                    <h2
                        className="education__title"
                        id="education-title"
                    >
                        <span className="education__title-line">
                            ACADEMIC
                        </span>

                        <span className="education__title-line">
                            FOUNDATION
                            <span className="education__title-mark">
                                .
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
                ----------------------------------------------------------
                    
                    The body contains two semantic columns:
                    
                    LEFT  → Education
                    RIGHT → Certifications
                    
                    CSS Grid places them side-by-side at larger breakpoints.
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