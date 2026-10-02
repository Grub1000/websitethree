/*
 * ==========================================================================
 * FEATURED PROJECTS
 * ==========================================================================
 *
 * Section 02 of the homepage.
 *
 * Unlike a conventional portfolio grid, the projects live inside one shared
 * engineering board. The board gives each project visual containment without
 * turning them into independent floating cards.
 *
 * React:
 * - Provides semantic section structure.
 * - Composes the ProjectBoard.
 * - Provides the section DOM reference used to scope the animation.
 * - Runs and cleans up the GSAP animation lifecycle.
 *
 * CSS:
 * - Controls the editorial layout and responsive behavior.
 * - clip-path is a native CSS property, even when GSAP animates its value.
 *
 * GSAP:
 * - Sequences the one-time section entrance.
 * - ScrollTrigger starts the entrance when the section reaches the viewport.
 * - Does NOT control scrolling.
 * - Does NOT animate the architecture diagrams themselves.
 */

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ProjectBoard from "./ProjectBoard";

import "./FeaturedProjects.css";


/*
 * ==========================================================================
 * GSAP PLUGIN REGISTRATION
 * ==========================================================================
 *
 * ScrollTrigger is a GSAP plugin.
 *
 * It observes the section's relationship to the viewport and starts the
 * animation at the configured point.
 *
 * Browser scrolling remains completely native.
 */
gsap.registerPlugin(ScrollTrigger);


function FeaturedProjects() {
    /*
     * React useRef:
     *
     * Gives us the actual <section> DOM element after React mounts it.
     *
     * That element becomes the animation scope so GSAP selectors cannot
     * accidentally target matching classes elsewhere on the website.
     */
    const sectionRef = useRef<HTMLElement | null>(null);


    useEffect(() => {
        const section = sectionRef.current;

        if (!section) {
            return;
        }


        /*
         * ==================================================================
         * GSAP CONTEXT
         * ==================================================================
         *
         * gsap.context() is GSAP-specific.
         *
         * Passing `section` as the scope means selectors used inside this
         * callback search only within FeaturedProjects.
         *
         * This also gives us one cleanup point when React unmounts the
         * section or remounts it during development.
         */
        const context = gsap.context(() => {

            /*
             * gsap.matchMedia() is GSAP-specific.
             *
             * It lets GSAP manage the reduced-motion media query and clean up
             * the appropriate animation automatically.
             *
             * The media-query syntax itself is the standard CSS/browser
             * prefers-reduced-motion feature.
             */
            const media = gsap.matchMedia();


            media.add(
                "(prefers-reduced-motion: no-preference)",
                () => {

                    /*
                     * ======================================================
                     * ELEMENT COLLECTIONS
                     * ======================================================
                     *
                     * gsap.utils.toArray() is a GSAP utility.
                     *
                     * It converts selector results into predictable arrays
                     * that can be animated and staggered.
                     */

                    const titleLines = gsap.utils.toArray<HTMLElement>(
                        ".featured-projects__title-line"
                    );

                    const cards = gsap.utils.toArray<HTMLElement>(
                        ".project-board__card"
                    );

                    const visuals = gsap.utils.toArray<HTMLElement>(
                        ".project-board__visual"
                    );

                    const technologyRows = gsap.utils.toArray<HTMLElement>(
                        ".project-board__technology-row"
                    );

                    const actions = gsap.utils.toArray<HTMLElement>(
                        ".project-board__action"
                    );


                    /*
                     * ======================================================
                     * ENTRANCE TIMELINE
                     * ======================================================
                     *
                     * This animation is intentionally finite.
                     *
                     * There is no scrub and therefore no direct relationship
                     * between scroll distance and animation progress.
                     *
                     * The visitor scrolls normally.
                     *
                     * ScrollTrigger simply starts the sequence once.
                     */
                    const timeline = gsap.timeline({
                        defaults: {
                            ease: "power3.out",
                        },

                        scrollTrigger: {
                            trigger: section,

                            /*
                             * Start when the top of the section reaches 78%
                             * of the viewport height.
                             */
                            start: "top 78%",

                            /*
                             * The entrance should communicate hierarchy once,
                             * not replay every time the visitor scrolls back.
                             */
                            once: true,
                        },
                    });


                    /*
                     * ======================================================
                     * 01 — SECTION INDEX
                     * ======================================================
                     *
                     * A restrained vertical entrance establishes the section
                     * before the larger heading arrives.
                     */
                    timeline.from(
                        ".featured-projects__meta",
                        {
                            autoAlpha: 0,
                            y: 12,
                            duration: 0.4,
                        }
                    );


                    /*
                     * ======================================================
                     * 02 — SECTION TITLE
                     * ======================================================
                     *
                     * yPercent is a GSAP convenience.
                     *
                     * It is NOT the native CSS `translateY()` syntax.
                     * GSAP converts it into the required transform.
                     *
                     * stagger is also GSAP-specific and offsets the start time
                     * of each title line.
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
                     *
                     * "<0.12" is GSAP timeline position syntax.
                     *
                     * It begins this tween 0.12 seconds after the previous
                     * tween starts rather than waiting for it to finish.
                     */
                    timeline.from(
                        ".featured-projects__introduction",
                        {
                            autoAlpha: 0,
                            y: 14,
                            duration: 0.5,
                        },
                        "<0.12"
                    );


                    /*
                     * ======================================================
                     * 04 — ENGINEERING BOARD
                     * ======================================================
                     *
                     * clip-path is a NATIVE CSS property.
                     *
                     * GSAP is simply interpolating between two valid CSS
                     * clip-path values.
                     *
                     * The board does not scale or fly into the viewport.
                     * Instead, it is uncovered like a technical drawing.
                     */
                    timeline.fromTo(
                        ".project-board",
                        {
                            clipPath: "inset(0 0 100% 0)",
                        },
                        {
                            clipPath: "inset(0 0 0% 0)",
                            duration: 0.8,
                            ease: "power2.inOut",
                        },
                        "-=0.1"
                    );


                    /*
                     * ======================================================
                     * 05 — PROJECT REGIONS
                     * ======================================================
                     *
                     * The cards only travel a small distance.
                     *
                     * Their movement establishes reading order without
                     * turning the board into a collection of floating cards.
                     */
                    timeline.from(
                        cards,
                        {
                            autoAlpha: 0,
                            y: 16,
                            duration: 0.5,
                            stagger: 0.08,
                        },
                        "-=0.45"
                    );


                    /*
                     * ======================================================
                     * 06 — BOARD LEGEND
                     * ======================================================
                     *
                     * The legend is intentionally separate from the project
                     * card collection because it is editorial information,
                     * not another project.
                     */
                    timeline.from(
                        ".project-board__legend",
                        {
                            autoAlpha: 0,
                            y: 16,
                            duration: 0.5,
                        },
                        "<0.16"
                    );


                    /*
                     * ======================================================
                     * 07 — PRODUCT + SYSTEM VISUALS
                     * ======================================================
                     *
                     * The board exists first.
                     *
                     * Its product screenshots and technical schematics are
                     * then uncovered inside that established structure.
                     *
                     * IMPORTANT:
                     *
                     * We animate the visual CONTAINER only.
                     *
                     * Relay's nodes, RAGspace's retrieval stages, and
                     * ResuScan's workflow remain completely static so motion
                     * cannot imply an inaccurate architecture sequence.
                     */
                    timeline.fromTo(
                        visuals,
                        {
                            clipPath: "inset(0 0 100% 0)",
                        },
                        {
                            clipPath: "inset(0 0 0% 0)",
                            duration: 0.6,
                            stagger: 0.07,
                            ease: "power2.inOut",
                        },
                        "-=0.22"
                    );


                    /*
                     * ======================================================
                     * 08 — TECHNOLOGY MATRIX
                     * ======================================================
                     *
                     * These rows settle in quickly after the visual evidence.
                     *
                     * The small stagger reads more like information being
                     * populated than a decorative list animation.
                     */
                    timeline.from(
                        technologyRows,
                        {
                            autoAlpha: 0,
                            y: 7,
                            duration: 0.3,
                            stagger: 0.025,
                        },
                        "-=0.25"
                    );


                    /*
                    * ======================================================
                    * 09 — PROJECT ACTIONS
                    * ======================================================
                    *
                    * The project action closes each card's reveal sequence.
                    *
                    * autoAlpha:
                    * - GSAP convenience controlling opacity + visibility.
                    *
                    * y:
                    * - GSAP convenience that produces a CSS translateY().
                    *
                    * fromTo() gives both states explicitly so the action cannot
                    * remain stuck in its hidden starting state after the timeline.
                    */
                    timeline.fromTo(
                        actions,
                        {
                            autoAlpha: 0,
                            y: 12,
                        },
                        {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.4,
                            stagger: 0.06,
                            clearProps: "opacity,visibility,transform",
                        },
                        "-=0.08"
                    );


                    /*
                     * Returning cleanup from the matchMedia callback allows
                     * GSAP to clean this timeline if the media query changes.
                     */
                    return () => {
                        timeline.kill();
                    };
                }
            );


            /*
             * Clean up the GSAP matchMedia instance when the surrounding
             * gsap.context() is reverted.
             */
            return () => {
                media.revert();
            };

        }, section);


        /*
         * ==================================================================
         * REACT CLEANUP
         * ==================================================================
         *
         * React runs this when the component unmounts.
         *
         * context.revert() is GSAP-specific.
         *
         * It removes animation-created inline styles and cleans up GSAP work
         * scoped to this component, which is important during route changes
         * and React development remounts.
         */
        return () => {
            context.revert();
        };

    }, []);


    return (
        <section
            className="featured-projects"
            id="work"
            ref={sectionRef}
            aria-labelledby="featured-projects-title"
        >
            <div className="featured-projects__container container">

                {/* ----------------------------------------------------------
                    SECTION INDEX
                ---------------------------------------------------------- */}
                <div className="featured-projects__meta text-mono">
                    <span className="featured-projects__index">
                        02 /
                    </span>

                    <span className="featured-projects__label">
                        SELECTED WORK
                    </span>
                </div>


                {/* ----------------------------------------------------------
                    SECTION INTRODUCTION
                ---------------------------------------------------------- */}
                <header className="featured-projects__header">

                    <h2
                        className="featured-projects__title"
                        id="featured-projects-title"
                    >
                        <span className="featured-projects__title-line">
                            SELECTED
                        </span>

                        <span className="featured-projects__title-line">
                            SYSTEMS
                            <span className="featured-projects__title-mark">
                                .
                            </span>
                        </span>
                    </h2>


                    <div className="featured-projects__introduction">

                        <span className="featured-projects__introduction-label text-mono">
                            THREE SYSTEMS / DIFFERENT PROBLEMS
                        </span>

                        <p className="featured-projects__introduction-copy">
                            Production software spanning real-time communication,
                            AI retrieval, and full-stack product engineering.
                        </p>

                    </div>

                </header>


                {/* ----------------------------------------------------------
                    ENGINEERING BOARD
                ---------------------------------------------------------- */}
                <ProjectBoard />

            </div>
        </section>
    );
}


export default FeaturedProjects;