import {
    useLayoutEffect,
    useRef,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./About.css";


gsap.registerPlugin(ScrollTrigger);


export default function About() {
    /*
     * REACT REF
     *
     * sectionRef gives GSAP one DOM boundary for this entire section.
     *
     * gsap.context() below uses that element as its scope, which means our
     * class selectors only target elements inside this About section rather
     * than accidentally matching similarly named elements elsewhere.
     */
    const sectionRef = useRef<HTMLElement>(null);


    useLayoutEffect(() => {
        const section = sectionRef.current;


        if (!section) {
            return;
        }


        /*
         * NATIVE BROWSER API
         *
         * matchMedia() checks the user's operating-system motion preference.
         *
         * Unlike the Services hover interaction, this animation coordinates
         * several independently positioned editorial elements as the section
         * enters the viewport. That makes GSAP + ScrollTrigger appropriate
         * here rather than ordinary CSS transitions.
         */
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


        if (reducedMotion.matches) {
            return;
        }


        const context = gsap.context(() => {
            /*
             * GSAP CORE — timeline()
             *
             * A timeline lets the statement, body copy, and supporting
             * fragments enter at intentionally different moments while still
             * belonging to one coordinated animation.
             *
             * SCROLLTRIGGER — this is NOT a native browser or CSS feature.
             *
             * trigger:
             *     The About section controls when the timeline begins.
             *
             * start: "top 72%"
             *     Start when the TOP of the section reaches 72% down the
             *     viewport.
             *
             * once: true
             *     Play only the first time the section enters. This is an
             *     entrance reveal, not an animation controlled continuously
             *     by scroll position, so scrub would be inappropriate.
             */
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 72%",
                    once: true,
                },
            });


            /*
             * GSAP .from()
             *
             * IMPORTANT:
             *
             * The values below describe where the elements START.
             * Their existing CSS describes where they FINISH.
             *
             * That keeps layout responsibility in CSS and animation
             * responsibility in GSAP.
             */
            timeline.from(
                ".agency-about__header",
                {
                    y: 20,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.out",
                }
            );


            /*
             * Each line has an overflow-hidden wrapper.
             *
             * We animate the inner text rather than the wrapper so the wrapper
             * remains stationary and clips the text while it travels upward.
             *
             * yPercent is a GSAP convenience — NOT a CSS property.
             *
             * yPercent: 110 moves each line down by 110% of that line's own
             * height before GSAP animates it back to the CSS position.
             */
            timeline.from(
                ".agency-about__statement-content",
                {
                    yPercent: 110,
                    duration: 0.9,
                    stagger: 0.09,
                    ease: "power3.out",
                },
                "-=0.25"
            );


            /*
             * GSAP timeline position syntax:
             *
             * "-=0.45" means this animation begins 0.45 seconds before the
             * previous animation would otherwise finish.
             *
             * This overlap prevents the section from feeling like a sequence
             * of disconnected animations.
             */
            timeline.from(
                ".agency-about__body",
                {
                    y: 24,
                    opacity: 0,
                    duration: 0.7,
                    ease: "power2.out",
                },
                "-=0.45"
            );


            /*
             * The two supporting editorial fragments enter from opposite
             * directions.
             *
             * x is a GSAP convenience that manages CSS transform:
             * translateX() internally.
             *
             * opacity itself is a native CSS property.
             */
            timeline.from(
                ".agency-about__fragment--small",
                {
                    x: -24,
                    opacity: 0,
                    duration: 0.65,
                    ease: "power2.out",
                },
                "-=0.4"
            );


            timeline.from(
                ".agency-about__fragment--big",
                {
                    x: 24,
                    opacity: 0,
                    duration: 0.65,
                    ease: "power2.out",
                },
                "<0.08"
            );


            /*
             * "<0.08" is GSAP timeline position syntax.
             *
             * "<" refers to the START of the previous animation.
             * Adding 0.08 begins this animation 0.08 seconds after that
             * previous animation starts.
             */
            timeline.from(
                ".agency-about__meta",
                {
                    y: 16,
                    opacity: 0,
                    duration: 0.55,
                    ease: "power2.out",
                },
                "<0.08"
            );
        }, section);


        /*
         * REACT EFFECT CLEANUP
         *
         * context.revert() removes the animations and ScrollTrigger created
         * inside this context and restores properties GSAP changed.
         *
         * This is particularly important during React development where
         * Strict Mode may mount effects more than once to expose unsafe side
         * effects.
         */
        return () => {
            context.revert();
        };
    }, []);


    return (
        <section
            className="agency-about"
            id="about"
            aria-labelledby="agency-about-title"
            ref={sectionRef}
        >
            <div className="agency-about__container">
                <header className="agency-about__header">
                    <p className="agency-about__index">
                        05 — About
                    </p>

                    <p className="agency-about__edition">
                        LUXURE / 2026
                    </p>
                </header>


                {/*
                 * MAIN EDITORIAL STATEMENT
                 *
                 * Each line receives two elements:
                 *
                 * 1. reveal wrapper
                 *    Owns overflow:hidden and stays stationary.
                 *
                 * 2. reveal content
                 *    Moves vertically during the GSAP entrance.
                 *
                 * This is the same underlying masking concept used in print-
                 * inspired motion design: the mask defines what is visible
                 * while the content moves independently behind it.
                 */}
                <div className="agency-about__statement">
                    <div className="agency-about__statement-line">
                        <div className="agency-about__statement-reveal">
                            <span className="agency-about__statement-content">
                                We don't
                            </span>
                        </div>
                    </div>

                    <div className="agency-about__statement-line agency-about__statement-line--offset">
                        <div className="agency-about__statement-reveal">
                            <span className="agency-about__statement-content">
                                decorate the
                            </span>
                        </div>
                    </div>

                    <div className="agency-about__statement-line agency-about__statement-line--serif">
                        <div className="agency-about__statement-reveal">
                            <span className="agency-about__statement-content agency-about__statement-content--serif">
                                internet.
                            </span>
                        </div>
                    </div>
                </div>


                {/*
                 * BODY COPY
                 *
                 * This stays ordinary readable content at every breakpoint.
                 * Its desktop placement becomes more unusual, but the DOM
                 * reading order remains logical for smaller screens and
                 * assistive technology.
                 */}
                <div className="agency-about__body">
                    <h2
                        className="agency-about__title"
                        id="agency-about-title"
                    >
                        Design and development from the same conversation.
                    </h2>

                    <p className="agency-about__description">
                        We work across design and development from the
                        beginning, allowing the idea and the technology behind
                        it to evolve together.
                    </p>
                </div>


                <div className="agency-about__fragment agency-about__fragment--small">
                    <p className="agency-about__fragment-text">
                        Small teams.
                    </p>

                    <p className="agency-about__fragment-text">
                        Close collaboration.
                    </p>
                </div>


                <div className="agency-about__fragment agency-about__fragment--big">
                    <p className="agency-about__fragment-text">
                        Big ideas,
                    </p>

                    <p className="agency-about__fragment-text">
                        built properly.
                    </p>
                </div>


                <div className="agency-about__meta">
                    <p className="agency-about__meta-label">
                        Independent studio
                    </p>

                    <p className="agency-about__meta-location">
                        Los Angeles — CA
                    </p>
                </div>
            </div>
        </section>
    );
}