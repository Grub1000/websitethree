/*
 * ==========================================================================
 * TECHNICAL STACK
 * ==========================================================================
 *
 * Section 04 of the homepage.
 *
 * PURPOSE
 * --------------------------------------------------------------------------
 *
 * This section answers:
 *
 *     "What does Jorge primarily build with?"
 *
 * It intentionally focuses on the technologies that define current
 * production work rather than attempting to list every technology,
 * framework, service, or tool Jorge has experience with.
 *
 * Broader technical experience will be represented later in the portfolio
 * through a separate Technology Index.
 *
 *
 * STACK ORGANIZATION
 * --------------------------------------------------------------------------
 *
 * The primary stack follows the layers of a production software system:
 *
 *     APPLICATION
 *          ↓
 *     BACKEND + SYSTEMS
 *          ↓
 *     DATA + AI
 *          ↓
 *     CLOUD + INFRASTRUCTURE
 *
 * This reinforces the full-stack engineering story established by the
 * previous sections.
 *
 *
 * ANIMATION RESPONSIBILITIES
 * --------------------------------------------------------------------------
 *
 * GSAP:
 * - Runs one finite entrance sequence.
 * - Uses ScrollTrigger only to determine when the sequence begins.
 * - Uses clip-path to reveal the primary matrix.
 * - Uses autoAlpha, y, yPercent, and stagger for hierarchy.
 *
 * Native CSS / browser:
 * - clip-path is a native CSS property.
 * - opacity, visibility, and transform are native CSS properties.
 *
 * GSAP conveniences:
 * - autoAlpha controls opacity + visibility together.
 * - y / yPercent produce CSS transforms.
 * - stagger offsets repeated tween start times.
 * - timeline position parameters control tween overlap.
 * - clearProps removes temporary inline animation properties.
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

import "./TechnicalStack.css";


/*
 * ==========================================================================
 * GSAP PLUGIN REGISTRATION
 * ==========================================================================
 *
 * ScrollTrigger:
 * - Third-party GSAP plugin.
 * - Used only to determine when this section enters the viewport.
 *
 * Native page scrolling remains completely untouched.
 */

gsap.registerPlugin(ScrollTrigger);


/*
 * ==========================================================================
 * PRIMARY STACK DATA
 * ==========================================================================
 *
 * These groups represent technologies central to current production work.
 *
 * AWS is intentionally represented as a platform-level competency rather
 * than being reduced to individual AWS services.
 *
 * IAM, EC2, and S3 provide concrete examples of the cloud infrastructure
 * knowledge represented by the broader AWS label.
 */

const stackGroups = [
    {
        index: "01",
        title: "APPLICATION",
        description:
            "Interfaces, responsive systems, SPA architecture, and real-time UI.",
        technologies: [
            "REACT",
            "TYPESCRIPT",
            "JAVASCRIPT",
            "HTML / CSS",
        ],
    },
    {
        index: "02",
        title: "BACKEND + SYSTEMS",
        description:
            "REST APIs, authentication, WebSockets, and application logic.",
        technologies: [
            "PYTHON",
            "DJANGO",
            "DJANGO REST FRAMEWORK",
            "PHP / Laravel",
            "WEBSOCKETS",
        ],
    },
    {
        index: "03",
        title: "DATA + AI",
        description:
            "Relational and vector data, machine learning, RAG, and retrieval systems.",
        technologies: [
            "MYSQL",
            "QDRANT",
            "TENSORFLOW / KERAS",
            "EMBEDDINGS",
            "RAG",
        ],
    },
    {
        index: "04",
        title: "CLOUD + INFRASTRUCTURE",
        description:
            "AWS cloud architecture, identity and access management, compute, storage, deployment, and production application infrastructure.",
        technologies: [
            "AWS",
            "EC2 / S3",
            "REDIS",
            "APACHE / DAPHNE",
        ],
    },
];


function TechnicalStack() {

    /*
     * ======================================================================
     * SECTION REFERENCE
     * ======================================================================
     *
     * React:
     * - useRef provides access to the rendered section element.
     *
     * GSAP:
     * - Uses this element as the ScrollTrigger target.
     * - Uses this element as the selector scope through gsap.context().
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
     * 02. Large heading
     * 03. Supporting introduction
     * 04. Matrix structural reveal
     * 05. Capability groups
     * 06. Technology names
     * 07. Closing statement
     *
     * The animation is finite.
     *
     * There is:
     * - no scrub
     * - no scroll-jacking
     * - no perpetual animation
     */

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) {
            return;
        }


        /*
         * GSAP:
         * - matchMedia provides media-query-aware animation setup.
         *
         * Browser:
         * - prefers-reduced-motion is a native media feature.
         */

        const media = gsap.matchMedia();


        /*
         * GSAP:
         * - context scopes selector strings to this section.
         * - context also tracks GSAP instances for lifecycle cleanup.
         */

        const context = gsap.context(() => {

            media.add(
                "(prefers-reduced-motion: no-preference)",
                () => {

                    /*
                     * ======================================================
                     * ELEMENT COLLECTIONS
                     * ======================================================
                     *
                     * gsap.utils.toArray():
                     * - GSAP convenience.
                     * - Produces predictable arrays from selector results.
                     */

                    const titleLines = gsap.utils.toArray<HTMLElement>(
                        ".technical-stack__title-line"
                    );

                    const groups = gsap.utils.toArray<HTMLElement>(
                        ".technical-stack__group"
                    );

                    const technologies = gsap.utils.toArray<HTMLElement>(
                        ".technical-stack__technology"
                    );

                    const statementLines = gsap.utils.toArray<HTMLElement>(
                        ".technical-stack__statement-line"
                    );


                    /*
                     * ======================================================
                     * TIMELINE
                     * ======================================================
                     *
                     * ScrollTrigger:
                     * - GSAP plugin.
                     * - Begins the timeline when the section reaches roughly
                     *   78% of the viewport.
                     *
                     * once:
                     * - Prevents the entrance from replaying when scrolling
                     *   back through the section.
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
                        ".technical-stack__meta",
                        {
                            autoAlpha: 0,
                            y: 12,
                            duration: 0.4,
                        }
                    );


                    /*
                     * ======================================================
                     * 02 — TITLE
                     * ======================================================
                     *
                     * yPercent:
                     * - GSAP transform convenience.
                     * - Moves each title line relative to its own height.
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
                        ".technical-stack__introduction",
                        {
                            autoAlpha: 0,
                            y: 14,
                            duration: 0.5,
                        },
                        "<0.14"
                    );


                    /*
                     * ======================================================
                     * 04 — MATRIX STRUCTURE
                     * ======================================================
                     *
                     * clipPath:
                     * - Native CSS property.
                     *
                     * GSAP:
                     * - Interpolates between the two inset values.
                     *
                     * The matrix reveals from top to bottom so the structural
                     * framework appears before its detailed content.
                     */

                    timeline.fromTo(
                        ".technical-stack__matrix",
                        {
                            clipPath: "inset(0 0 100% 0)",
                        },
                        {
                            clipPath: "inset(0 0 0% 0)",
                            duration: 0.8,
                            ease: "power2.inOut",

                            /*
                             * Remove GSAP's temporary inline clip-path once
                             * the structural reveal has completed.
                             */

                            clearProps: "clipPath",
                        },
                        "-=0.1"
                    );


                    /*
                     * ======================================================
                     * 05 — CAPABILITY GROUPS
                     * ======================================================
                     *
                     * Movement remains small because the matrix reveal should
                     * remain the dominant structural animation.
                     */

                    timeline.from(
                        groups,
                        {
                            autoAlpha: 0,
                            y: 14,
                            duration: 0.45,
                            stagger: 0.07,
                        },
                        "-=0.48"
                    );


                    /*
                     * ======================================================
                     * 06 — TECHNOLOGY NAMES
                     * ======================================================
                     *
                     * A fast stagger lets the stack populate without making
                     * every individual technology feel like its own event.
                     */

                    timeline.from(
                        technologies,
                        {
                            autoAlpha: 0,
                            y: 8,
                            duration: 0.28,
                            stagger: 0.018,
                        },
                        "-=0.3"
                    );


                    /*
                     * ======================================================
                     * 07 — CLOSING STATEMENT
                     * ======================================================
                     *
                     * The statement summarizes the range represented by the
                     * four capability groups:
                     *
                     *     FROM INTERFACE
                     *     TO INFRASTRUCTURE.
                     */

                    timeline.from(
                        statementLines,
                        {
                            autoAlpha: 0,
                            yPercent: 45,
                            duration: 0.55,
                            stagger: 0.07,
                        },
                        "-=0.08"
                    );


                    timeline.from(
                        ".technical-stack__footer-meta",
                        {
                            autoAlpha: 0,
                            y: 8,
                            duration: 0.3,
                        },
                        "<0.15"
                    );


                    /*
                     * GSAP matchMedia() supports returning cleanup from its
                     * matching callback.
                     */

                    return () => {
                        timeline.kill();
                    };
                }
            );

        }, section);


        /*
         * ==================================================================
         * REACT CLEANUP
         * ==================================================================
         *
         * media.revert():
         * - Removes animation state associated with matchMedia().
         *
         * context.revert():
         * - Reverts GSAP animations and ScrollTriggers associated with this
         *   section.
         *
         * This also keeps development behavior clean under React StrictMode.
         */

        return () => {
            media.revert();
            context.revert();
        };

    }, []);


    return (
        <section
            className="technical-stack"
            id="stack"
            aria-labelledby="technical-stack-title"
            ref={sectionRef}
        >
            <div className="technical-stack__container container">

                {/* ----------------------------------------------------------
                    SECTION METADATA
                ---------------------------------------------------------- */}

                <div className="technical-stack__meta text-mono">

                    <span className="technical-stack__section-index">
                        04 /
                    </span>

                    <span className="technical-stack__label">
                        TECHNICAL STACK
                    </span>

                </div>


                {/* ----------------------------------------------------------
                    SECTION HEADER
                ---------------------------------------------------------- */}

                <header className="technical-stack__header">

                    <h2
                        className="technical-stack__title"
                        id="technical-stack-title"
                    >
                        <span className="technical-stack__title-line">
                            TOOLS
                        </span>

                        <span className="technical-stack__title-line">
                            OF THE TRADE
                            <span className="technical-stack__title-mark">
                                .
                            </span>
                        </span>
                    </h2>


                    <div className="technical-stack__introduction">

                        <span className="technical-stack__introduction-label text-mono">
                            PRODUCTION STACK / 2026
                        </span>

                        <p className="technical-stack__introduction-copy">
                            Technologies I use across application development,
                            backend systems, AI, data, and cloud infrastructure.
                        </p>

                    </div>

                </header>


                {/* ----------------------------------------------------------
                    PRIMARY STACK MATRIX
                ----------------------------------------------------------
                
                    The four groups represent layers of a complete production
                    system rather than independent skill cards.
                ---------------------------------------------------------- */}

                <div className="technical-stack__matrix">

                    {stackGroups.map((group) => (
                        <article
                            className="technical-stack__group"
                            key={group.index}
                        >

                            {/* ----------------------------------------------
                                GROUP IDENTITY
                            ---------------------------------------------- */}

                            <div className="technical-stack__group-meta text-mono">

                                <span className="technical-stack__group-index">
                                    {group.index} /
                                </span>

                                <span className="technical-stack__group-title">
                                    {group.title}
                                </span>

                            </div>


                            {/* ----------------------------------------------
                                TECHNOLOGIES
                            ---------------------------------------------- */}

                            <ul className="technical-stack__technologies">

                                {group.technologies.map((technology) => (
                                    <li
                                        className="technical-stack__technology"
                                        key={technology}
                                    >
                                        {technology}
                                    </li>
                                ))}

                            </ul>


                            {/* ----------------------------------------------
                                CAPABILITY DESCRIPTION
                            ---------------------------------------------- */}

                            <p className="technical-stack__group-description">
                                {group.description}
                            </p>

                        </article>
                    ))}

                </div>


                {/* ----------------------------------------------------------
                    SECTION CLOSING STATEMENT
                ----------------------------------------------------------
                
                    This turns the technology inventory back into the larger
                    engineering story:
                    
                    Jorge works across the production system rather than at
                    one isolated layer.
                ---------------------------------------------------------- */}

                <footer className="technical-stack__footer">

                    <p className="technical-stack__statement">

                        <span className="technical-stack__statement-line">
                            FROM INTERFACE
                        </span>

                        <span className="technical-stack__statement-line">
                            TO INFRASTRUCTURE
                            <span className="technical-stack__statement-mark">
                                .
                            </span>
                        </span>

                    </p>


                    <span className="technical-stack__footer-meta text-mono">
                        04 / STACK
                    </span>

                </footer>

            </div>
        </section>
    );
}


export default TechnicalStack;