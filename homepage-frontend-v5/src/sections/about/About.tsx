/*
 * ==========================================================================
 * ABOUT
 * ==========================================================================
 *
 * Section 03 of the homepage.
 *
 * PURPOSE
 * --------------------------------------------------------------------------
 *
 * Selected Systems establishes technical capability.
 *
 * About intentionally slows the page down and introduces the person behind
 * that work.
 *
 *
 * ANIMATION RESPONSIBILITIES
 * --------------------------------------------------------------------------
 *
 * GSAP:
 * - Controls the one-time entrance sequence.
 * - Uses ScrollTrigger only to determine when the sequence begins.
 * - Uses clip-path to reveal the portrait.
 * - Uses autoAlpha / y / yPercent for supporting entrance motion.
 *
 * CSS:
 * - Controls the permanent layout and visual presentation.
 * - Does NOT hide content before JavaScript runs.
 *
 * Browser / native CSS:
 * - clip-path is a native CSS property.
 * - opacity, visibility, and transform are native CSS properties.
 *
 * GSAP conveniences:
 * - autoAlpha controls opacity + visibility together.
 * - y and yPercent ultimately produce CSS transforms.
 * - stagger offsets the start time of repeated animations.
 * - timeline position parameters such as "<0.1" overlap tweens.
 *
 *
 * ACCESSIBILITY
 * --------------------------------------------------------------------------
 *
 * The animation only runs when the operating system reports:
 *
 *     prefers-reduced-motion: no-preference
 *
 * Otherwise the normal CSS-visible state is left untouched.
 */

import {
    useEffect,
    useRef,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Portrait from "../../assets/images/about/Portrait.jpg";

import "./About.css";


/*
 * ScrollTrigger is a GSAP plugin.
 *
 * Registering it once makes the plugin available to timelines created by
 * this module.
 */
gsap.registerPlugin(ScrollTrigger);


function About() {

    /*
     * ======================================================================
     * SECTION REFERENCE
     * ======================================================================
     *
     * React:
     * - useRef gives us the actual section DOM element after render.
     *
     * GSAP:
     * - gsap.context() uses this element as the animation scope.
     *
     * This prevents selectors such as ".about__title-line" from accidentally
     * targeting similarly named elements elsewhere in the application.
     */
    const sectionRef = useRef<HTMLElement | null>(null);


    /*
     * ======================================================================
     * ABOUT ENTRANCE
     * ======================================================================
     *
     * The sequence intentionally moves from editorial structure toward the
     * human focal point:
     *
     * 01. Section metadata
     * 02. Large heading
     * 03. Personal introduction
     * 04. Portrait
     * 05. Supporting copy
     * 06. Profile information
     *
     * The entire sequence is finite and plays once.
     */
    useEffect(() => {
        const section = sectionRef.current;

        if (!section) {
            return;
        }


        /*
        * ======================================================================
        * GSAP MEDIA QUERY
        * ======================================================================
        *
        * gsap.matchMedia():
        * - GSAP utility for creating media-query-specific animations.
        *
        * The actual prefers-reduced-motion query is a native CSS/browser
        * media feature.
        */
        const media = gsap.matchMedia();


        /*
        * ======================================================================
        * GSAP CONTEXT
        * ======================================================================
        *
        * gsap.context():
        * - Scopes selector text to this About section.
        * - Tracks GSAP animations created inside the context.
        * - Allows everything to be reverted cleanly on React unmount.
        */
        const context = gsap.context(() => {

            media.add(
                "(prefers-reduced-motion: no-preference)",
                () => {

                    /*
                    * ==========================================================
                    * ELEMENT COLLECTIONS
                    * ==========================================================
                    *
                    * gsap.utils.toArray():
                    * - GSAP convenience for producing predictable arrays of
                    *   matching DOM elements.
                    */
                    const titleLines = gsap.utils.toArray<HTMLElement>(
                        ".about__title-line"
                    );

                    const paragraphs = gsap.utils.toArray<HTMLElement>(
                        ".about__paragraph"
                    );

                    const profileItems = gsap.utils.toArray<HTMLElement>(
                        ".about__profile-item"
                    );


                    /*
                    * ==========================================================
                    * TIMELINE
                    * ==========================================================
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
                    * ==========================================================
                    * 01 — SECTION METADATA
                    * ==========================================================
                    */
                    timeline.from(
                        ".about__meta",
                        {
                            autoAlpha: 0,
                            y: 12,
                            duration: 0.4,
                        }
                    );


                    /*
                    * ==========================================================
                    * 02 — TITLE
                    * ==========================================================
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
                    * ==========================================================
                    * 03 — PERSONAL INTRODUCTION
                    * ==========================================================
                    */
                    timeline.from(
                        ".about__lead",
                        {
                            autoAlpha: 0,
                            y: 18,
                            duration: 0.55,
                        },
                        "<0.18"
                    );


                    /*
                    * ==========================================================
                    * 04 — PORTRAIT
                    * ==========================================================
                    *
                    * clipPath:
                    * - Native CSS property.
                    *
                    * GSAP:
                    * - Interpolates between the two CSS clip-path values.
                    */
                    timeline.fromTo(
                        ".about__portrait-frame",
                        {
                            clipPath: "inset(0 0 100% 0)",
                        },
                        {
                            clipPath: "inset(0 0 0% 0)",
                            duration: 0.75,
                            ease: "power2.inOut",

                            /*
                            * GSAP clearProps removes the temporary inline
                            * clip-path after the reveal completes.
                            */
                            clearProps: "clipPath",
                        },
                        "-=0.28"
                    );


                    /*
                    * ==========================================================
                    * 05 — PORTRAIT CAPTION
                    * ==========================================================
                    */
                    timeline.from(
                        ".about__portrait-caption",
                        {
                            autoAlpha: 0,
                            y: 8,
                            duration: 0.35,
                        },
                        "-=0.2"
                    );


                    /*
                    * ==========================================================
                    * 06 — SUPPORTING COPY
                    * ==========================================================
                    */
                    timeline.from(
                        paragraphs,
                        {
                            autoAlpha: 0,
                            y: 12,
                            duration: 0.45,
                            stagger: 0.08,
                        },
                        "-=0.18"
                    );


                    /*
                    * ==========================================================
                    * 07 — PROFILE ROWS
                    * ==========================================================
                    */
                    timeline.fromTo(
                        profileItems,
                        {
                            autoAlpha: 0,
                            y: 10,
                        },
                        {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.35,
                            stagger: 0.06,

                            clearProps: "opacity,visibility,transform",
                        },
                        "-=0.12"
                    );


                    /*
                    * GSAP matchMedia() supports returning cleanup from the
                    * matching media-query callback.
                    */
                    return () => {
                        timeline.kill();
                    };
                }
            );

        }, section);


        /*
        * ======================================================================
        * REACT CLEANUP
        * ======================================================================
        *
        * IMPORTANT:
        *
        * media and context have both been fully initialized before this cleanup
        * function can run.
        *
        * media.revert():
        * - Removes matchMedia-created animation state.
        *
        * context.revert():
        * - Reverts GSAP animations associated with this section.
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
            className="about"
            id="about"
            aria-labelledby="about-title"
            ref={sectionRef}
        >
            <div className="about__container container">

                {/* ----------------------------------------------------------
                    SECTION METADATA
                ---------------------------------------------------------- */}
                <div className="about__meta text-mono">

                    <span className="about__index">
                        03 /
                    </span>

                    <span className="about__label">
                        ABOUT
                    </span>

                </div>


                {/* ----------------------------------------------------------
                    SECTION HEADING
                ---------------------------------------------------------- */}
                <header className="about__header">

                    <h2
                        className="about__title"
                        id="about-title"
                    >
                        <span className="about__title-line">
                            BEHIND
                        </span>

                        <span className="about__title-line">
                            THE SYSTEMS
                            <span className="about__title-mark">
                                .
                            </span>
                        </span>
                    </h2>

                </header>


                {/* ----------------------------------------------------------
                    ABOUT CONTENT
                ---------------------------------------------------------- */}
                <div className="about__content">

                    {/* ------------------------------------------------------
                        PRIMARY INTRODUCTION
                    ------------------------------------------------------ */}
                    <div className="about__introduction">

                        <p className="about__lead">
                            I'm Jorge — a full-stack software developer and
                            machine learning engineer who likes understanding
                            how the entire system fits together.
                        </p>

                    </div>


                    {/* ------------------------------------------------------
                        PORTRAIT
                    ------------------------------------------------------ */}
                    <figure className="about__portrait">

                        <div className="about__portrait-frame">

                            <img
                                className="about__portrait-image"
                                src={Portrait}
                                alt="Jorge Ramirez"
                            />

                            <span
                                className="
                                    about__registration-mark
                                    about__registration-mark--top
                                "
                                aria-hidden="true"
                            />

                            <span
                                className="
                                    about__registration-mark
                                    about__registration-mark--bottom
                                "
                                aria-hidden="true"
                            />

                        </div>


                        <figcaption className="about__portrait-caption text-mono">

                            <span className="about__portrait-id">
                                JR / 03
                            </span>

                            <span className="about__portrait-location">
                                SOUTHERN CALIFORNIA
                            </span>

                        </figcaption>

                    </figure>


                    {/* ------------------------------------------------------
                        SUPPORTING COPY
                    ------------------------------------------------------ */}
                    <div className="about__body">

                        <p className="about__paragraph">
                            I enjoy working across the full software stack —
                            building interfaces, designing APIs, modeling data,
                            deploying infrastructure, and connecting those
                            pieces into complete applications.
                        </p>

                        <p className="about__paragraph">
                            My background in computer science and artificial
                            intelligence shapes the way I approach engineering:
                            understand the problem, understand the system, and
                            build the simplest reliable solution that solves it.
                        </p>

                    </div>


                    {/* ------------------------------------------------------
                        ENGINEERING PROFILE
                    ------------------------------------------------------ */}
                    <dl className="about__profile">

                        <div className="about__profile-item">

                            <dt className="about__profile-label text-mono">
                                01 / APPROACH
                            </dt>

                            <dd className="about__profile-value">
                                FULL-STACK THINKING
                            </dd>

                        </div>


                        <div className="about__profile-item">

                            <dt className="about__profile-label text-mono">
                                02 / FOCUS
                            </dt>

                            <dd className="about__profile-value">
                                SOFTWARE + AI / ML
                            </dd>

                        </div>


                        <div className="about__profile-item">

                            <dt className="about__profile-label text-mono">
                                03 / LOCATION
                            </dt>

                            <dd className="about__profile-value">
                                SOUTHERN CALIFORNIA
                            </dd>

                        </div>

                    </dl>

                </div>

            </div>
        </section>
    );
}


export default About;