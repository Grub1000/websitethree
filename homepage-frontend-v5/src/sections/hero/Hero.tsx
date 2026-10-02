import { useLayoutEffect, useRef } from "react";

import { ArrowDown, ArrowUpRight } from "lucide-react";

import gsap from "gsap";

import HeroSkyline from "./HeroSkyline";

import "./hero.css";


/*
 * ==========================================================================
 * HERO
 * ==========================================================================
 *
 * Portfolio V2's primary editorial introduction.
 *
 *
 * DESIGN INTENT
 * --------------------------------------------------------------------------
 *
 * The Hero behaves more like an editorial cover than a traditional SaaS
 * landing page.
 *
 * Visual hierarchy:
 *
 * 1. Jorge Ramirez
 * 2. Software Engineer
 * 3. Engineering disciplines
 * 4. Abstract software architecture
 * 5. Navigation into the portfolio
 *
 * The Hero intentionally avoids:
 *
 * - Marketing-oriented headline copy.
 * - Large conventional CTA buttons.
 * - Feature cards.
 * - Technology badge walls.
 * - Decorative animation without technical meaning.
 *
 *
 * ANIMATION LANGUAGE
 * --------------------------------------------------------------------------
 *
 * Different kinds of information receive different kinds of motion:
 *
 * Editorial text
 *     → clip-path reveals
 *
 * Architecture
 *     → structural growth
 *
 * System activity
 *     → cyan signal movement
 *
 * Interactive links
 *     → small native CSS transforms
 *
 * This distinction prevents the Hero from becoming a collection of unrelated
 * animation effects.
 *
 *
 * TECHNOLOGY RESPONSIBILITIES
 * --------------------------------------------------------------------------
 *
 * React:
 *
 * - useRef() provides a reference to this specific Hero DOM tree.
 * - useLayoutEffect() initializes animation after React commits the DOM.
 * - The effect cleanup handles component unmounting.
 *
 *
 * Native browser APIs:
 *
 * - window.matchMedia() reads the user's reduced-motion preference.
 * - clientWidth reads the current rendered width of each architecture
 *   connection.
 *
 *
 * Native CSS:
 *
 * - clip-path defines the clipping behavior used by the editorial reveals.
 * - transform is ultimately responsible for visual translation and scaling.
 * - The static Hero layout remains entirely controlled by CSS.
 *
 *
 * GSAP:
 *
 * - gsap.context() scopes animation selectors to this Hero.
 * - gsap.timeline() sequences the entrance and system signal.
 * - stagger offsets repeated animations.
 * - Timeline position values such as "-=0.3" overlap animation phases.
 * - x / y / scaleX / scaleY are GSAP conveniences that ultimately
 *   manipulate CSS transforms.
 * - Function-based tween values can read fresh layout measurements.
 * - repeatRefresh recalculates dynamic values on repeated timeline cycles.
 *
 *
 * IMPORTANT
 * --------------------------------------------------------------------------
 *
 * clip-path itself is NOT a GSAP feature.
 *
 * It is a native CSS property.
 *
 * GSAP is simply interpolating between native CSS clip-path values and
 * sequencing those changes with the rest of the Hero animation.
 * ==========================================================================
 */


function Hero() {
    /*
     * React useRef.
     *
     * This reference gives GSAP a concrete root element for this Hero.
     * Selectors created inside gsap.context() will therefore remain scoped
     * to this component instead of searching the entire document.
     */
    const heroRef = useRef<HTMLElement | null>(null);


    /*
     * ======================================================================
     * HERO ANIMATION LIFECYCLE
     * ======================================================================
     *
     * React useLayoutEffect is used instead of useEffect because animation
     * setup affects the initial visual state of DOM elements.
     *
     * useLayoutEffect runs after React commits the DOM but before the browser
     * paints the resulting frame.
     *
     * This helps prevent visible flashes between the finished CSS state and
     * GSAP's initial animation state.
     */
    useLayoutEffect(() => {
        /*
         * ------------------------------------------------------------------
         * REDUCED MOTION
         * ------------------------------------------------------------------
         *
         * window.matchMedia() is a native browser API.
         *
         * If the user requests reduced motion, no GSAP animation is created.
         *
         * The Hero therefore falls back naturally to its complete static CSS
         * composition.
         */
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;


        if (prefersReducedMotion) {
            return;
        }


        /*
         * ------------------------------------------------------------------
         * GSAP CONTEXT
         * ------------------------------------------------------------------
         *
         * gsap.context() scopes all selector strings below to heroRef.
         *
         * Without this scope:
         *
         *     ".hero__title-line"
         *
         * would query the entire document.
         *
         * With this scope, GSAP searches only inside this Hero instance.
         */
        const context = gsap.context(() => {
            /*
             * ==============================================================
             * ENTRANCE TIMELINE
             * ==============================================================
             *
             * The entrance is intentionally restrained.
             *
             * Nothing dramatically flies onto the screen.
             *
             * The composition instead appears to assemble itself:
             *
             * metadata
             *     ↓
             * identity
             *     ↓
             * engineering information
             *     ↓
             * architecture
             *     ↓
             * navigation
             */
            const entranceTimeline = gsap.timeline({
                defaults: {
                    ease: "power3.out",
                },
            });


            /*
             * --------------------------------------------------------------
             * 01. EDITORIAL METADATA
             * --------------------------------------------------------------
             *
             * The metadata opens horizontally from left to right.
             *
             * clipPath corresponds to the native CSS clip-path property.
             *
             * Starting value:
             *
             *     inset(0% 100% 0% 0%)
             *
             * clips the element completely from the right.
             *
             * Finished value:
             *
             *     inset(0% 0% 0% 0%)
             *
             * exposes the complete metadata row.
             */
            entranceTimeline.fromTo(
                ".hero__meta",
                {
                    clipPath: "inset(0% 100% 0% 0%)",
                },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 0.65,
                },
            );


            /*
             * --------------------------------------------------------------
             * 02. PRIMARY NAME
             * --------------------------------------------------------------
             *
             * Each title line is revealed vertically using the native CSS
             * clip-path property.
             *
             * The final clipping region intentionally extends below the
             * element with a negative bottom inset.
             *
             * Why?
             *
             * Space Grotesk's lowercase "g" descender extends beyond the
             * extremely tight visual line box used by this Hero. A normal:
             *
             *     inset(0% 0% 0% 0%)
             *
             * would continue clipping that descender.
             *
             * Using:
             *
             *     inset(0% 0% -30% 0%)
             *
             * expands the clipping region below the element, allowing the
             * entire glyph to remain visible while preserving the tight
             * editorial spacing.
             *
             * Native CSS:
             * - clip-path / inset() define the clipping region.
             *
             * GSAP:
             * - Interpolates between the two clip-path values.
             * - `stagger` offsets the title-line reveals.
             * - `y` is a GSAP transform convenience.
             */
            entranceTimeline.fromTo(
                ".hero__title-line",
                {
                    clipPath: "inset(100% 0% 0% 0%)",
                    y: 28,
                },
                {
                    clipPath: "inset(0% 0% -30% 0%)",
                    y: 0,
                    duration: 0.85,
                    stagger: 0.08,
                    ease: "power3.out",
                },
                "-=0.2",
            );


            /*
             * --------------------------------------------------------------
             * 03. ENGINEERING IDENTITY
             * --------------------------------------------------------------
             *
             * The role and engineering disciplines use the same clipping
             * language as the name, but with less movement and shorter timing.
             *
             * This keeps the animation vocabulary consistent while preserving
             * the visual dominance of Jorge's name.
             */
            entranceTimeline.fromTo(
                [
                    ".hero__role",
                    ".hero__discipline",
                ],
                {
                    clipPath: "inset(100% 0% 0% 0%)",
                    y: 8,
                },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    y: 0,
                    duration: 0.45,
                    stagger: 0.045,
                    ease: "power2.out",
                },
                "-=0.45",
            );


            /*
             * --------------------------------------------------------------
             * 04. SYSTEM CAPTION
             * --------------------------------------------------------------
             *
             * The system caption behaves like a technical figure label.
             *
             * It therefore uses the same horizontal reveal language as the
             * metadata at the top of the Hero.
             */
            entranceTimeline.fromTo(
                ".hero-skyline__label",
                {
                    clipPath: "inset(0% 100% 0% 0%)",
                },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 0.5,
                    ease: "power2.out",
                },
                "-=0.3",
            );


            /*
             * --------------------------------------------------------------
             * 05. ARCHITECTURAL STRUCTURES
             * --------------------------------------------------------------
             *
             * Buildings grow upward from the shared baseline.
             *
             * scaleY is a GSAP convenience that ultimately manipulates a
             * native CSS transform.
             *
             * transformOrigin ensures each structure grows from its bottom
             * edge instead of expanding from its center.
             */
            entranceTimeline.from(
                ".hero-skyline__building",
                {
                    scaleY: 0,
                    transformOrigin: "bottom center",
                    duration: 0.55,
                    stagger: 0.07,
                    ease: "power2.out",
                },
                "-=0.25",
            );


            /*
             * --------------------------------------------------------------
             * 06. SYSTEM NODES
             * --------------------------------------------------------------
             *
             * Nodes appear after the structural architecture exists.
             *
             * A very small scale transition gives the nodes enough presence
             * to register without turning them into decorative bubbles.
             */
            entranceTimeline.from(
                ".hero-skyline__node",
                {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.3,
                    stagger: 0.04,
                    ease: "power2.out",
                },
                "-=0.25",
            );


            /*
             * --------------------------------------------------------------
             * 07. SYSTEM LABELS
             * --------------------------------------------------------------
             *
             * Labels are revealed independently from the nodes because the
             * structure should become understandable progressively:
             *
             * architecture
             *     ↓
             * nodes
             *     ↓
             * meaning
             */
            entranceTimeline.fromTo(
                ".hero-skyline__node-label",
                {
                    clipPath: "inset(100% 0% 0% 0%)",
                    y: 5,
                },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    y: 0,
                    duration: 0.3,
                    stagger: 0.04,
                    ease: "power2.out",
                },
                "-=0.2",
            );


            /*
             * --------------------------------------------------------------
             * 08. CONNECTION LINES
             * --------------------------------------------------------------
             *
             * Connections reveal horizontally from their source toward their
             * destination.
             *
             * scaleX is a GSAP transform convenience.
             */
            entranceTimeline.from(
                ".hero-skyline__connection-line",
                {
                    scaleX: 0,
                    transformOrigin: "left center",
                    duration: 0.45,
                    stagger: 0.06,
                    ease: "power2.inOut",
                },
                "-=0.3",
            );


            /*
             * --------------------------------------------------------------
             * 09. HERO FOOTER
             * --------------------------------------------------------------
             *
             * The footer receives a horizontal clipping reveal rather than a
             * generic opacity fade.
             *
             * This keeps even the final entrance phase within the editorial
             * animation language.
             */
            entranceTimeline.fromTo(
                ".hero__footer",
                {
                    clipPath: "inset(0% 100% 0% 0%)",
                },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 0.55,
                    ease: "power2.out",
                },
                "-=0.3",
            );


            /*
             * --------------------------------------------------------------
             * SYSTEM DATA SIGNAL
             * --------------------------------------------------------------
             *
             * The cyan signal represents information moving through the
             * architecture:
             *
             * CLIENT → APPLICATION → DATA → CLOUD
             *
             * Each connection owns one signal. The signal travels the full
             * rendered width of that connection, reaches the destination node,
             * triggers a small response from that node, and then hands the
             * animation off to the next connection.
             *
             * RESPONSIVE BEHAVIOR
             * --------------------------------------------------------------
             *
             * Connection widths change as the responsive layout changes.
             *
             * We therefore intentionally DO NOT capture clientWidth once when
             * this effect is created.
             *
             * Instead, each signal tween receives a GSAP function-based value:
             *
             *     x: () => connection.clientWidth
             *
             * Native browser:
             *
             * - parentElement finds the connection containing each signal.
             * - clientWidth reads the connection's current rendered width.
             *
             * GSAP:
             *
             * - `x` moves the signal using a CSS transform.
             * - Function-based values allow the destination to be calculated
             *   dynamically.
             * - repeatRefresh invalidates dynamic tween values whenever the
             *   repeating timeline begins another cycle.
             *
             * This means a viewport resize does not permanently leave the
             * signal targeting dimensions from the old layout.
             */
            const signals = gsap.utils.toArray<HTMLElement>(
                ".hero-skyline__signal",
            );

            const nodes = gsap.utils.toArray<HTMLElement>(
                ".hero-skyline__node",
            );


            /*
             * Start every signal at the beginning of its connection and keep
             * it hidden until its portion of the sequence begins.
             *
             * GSAP `x` is used instead of `xPercent`.
             *
             * Important:
             *
             * xPercent would move the signal relative to the SIGNAL'S OWN
             * width. It would not mean "100% across the connection."
             */
            gsap.set(signals, {
                x: 0,
                opacity: 0,
            });


            /*
             * This timeline runs independently from the Hero entrance.
             *
             * repeatRefresh is a GSAP feature.
             *
             * On every repeated cycle GSAP invalidates function-based values
             * so responsive measurements can be evaluated again.
             */
            const signalTimeline = gsap.timeline({
                repeat: -1,
                repeatDelay: 3,
                delay: 1.8,
                repeatRefresh: true,
            });


            signals.forEach((signal, index) => {
                /*
                 * Each signal is rendered inside its corresponding connection.
                 *
                 * Example:
                 *
                 * CLIENT ●────────────● APPLICATION
                 *          ↑ signal
                 *
                 * The parent therefore represents the connection this
                 * particular signal must cross.
                 */
                const connection = signal.parentElement;


                /*
                 * Signal 0 travels toward node 1.
                 * Signal 1 travels toward node 2.
                 * Signal 2 travels toward node 3.
                 */
                const destinationNode = nodes[index + 1];


                if (!connection || !destinationNode) {
                    return;
                }


                /*
                 * Reveal the signal at the beginning of the connection.
                 *
                 * Resetting x to 0 here is also important because the same
                 * signal participates in every repeated timeline cycle.
                 */
                signalTimeline.fromTo(
                    signal,
                    {
                        x: 0,
                        opacity: 0,
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.12,
                    },
                );


                /*
                 * Move the signal across the ENTIRE connection.
                 *
                 * IMPORTANT RESPONSIVE CHANGE:
                 *
                 * `connection.clientWidth` is inside a function rather than
                 * being captured in a constant during effect initialization.
                 *
                 * Native browser:
                 *     connection.clientWidth
                 *
                 * GSAP:
                 *     x: () => ...
                 *
                 * GSAP evaluates the function to obtain the transform target.
                 * Because the parent timeline uses repeatRefresh, this value
                 * can be recalculated after responsive layout changes.
                 */
                signalTimeline.to(signal, {
                    x: () => connection.clientWidth,
                    duration: 0.75,
                    ease: "power1.inOut",
                });


                /*
                 * The destination node reacts only after the signal reaches it.
                 *
                 * This gives the animation a clear:
                 *
                 * travel → arrival → response → handoff
                 *
                 * relationship.
                 *
                 * Cyan is used for the active destination state because cyan
                 * represents data / activity throughout the system visual.
                 */
                signalTimeline.to(destinationNode, {
                    scale: 1.18,
                    borderColor: "#35d5e5",
                    duration: 0.60,
                    ease: "power2.out",
                });


                /*
                 * Return the node to its resting size before the next signal
                 * begins traveling.
                 *
                 * The border remains cyan after activation, matching the
                 * current behavior of the existing Hero animation.
                 */
                signalTimeline.to(destinationNode, {
                    scale: 1,
                    duration: 0.60,
                    ease: "power2.out",
                    borderColor: "#292929"
                });


                /*
                 * Hide the completed signal before the next architecture
                 * connection begins.
                 */
                signalTimeline.to(signal, {
                    opacity: 0,
                    duration: 0.1,
                });
            });
        }, heroRef);


        /*
         * ------------------------------------------------------------------
         * REACT / GSAP CLEANUP
         * ------------------------------------------------------------------
         *
         * React calls this function when the Hero unmounts.
         *
         * context.revert():
         *
         * - Kills animations created inside the GSAP context.
         * - Restores GSAP-modified inline styles.
         * - Prevents duplicate timelines after remounts.
         * - Helps keep development hot reloads predictable.
         *
         * This is especially important for infinitely repeating timelines such
         * as the cyan system signal.
         */
        return () => {
            context.revert();
        };
    }, []);


    /*
     * ======================================================================
     * HERO MARKUP
     * ======================================================================
     */
    return (
        <section
            className="hero"
            id="hero"
            ref={heroRef}
            aria-labelledby="hero-title"
        >
            <div className="hero__container container">
                {/*
                 * ----------------------------------------------------------
                 * EDITORIAL METADATA
                 * ----------------------------------------------------------
                 */}
                <div className="hero__meta">
                    <p className="hero__index text-mono">
                        01 / Portfolio
                    </p>

                    <p className="hero__year text-mono">
                        Software / 2026
                    </p>
                </div>


                {/*
                 * ----------------------------------------------------------
                 * PRIMARY IDENTITY
                 * ----------------------------------------------------------
                 */}
                <div className="hero__content">
                    <h1
                        className="hero__title"
                        id="hero-title"
                    >
                        <span className="hero__title-line">
                            Jorge
                        </span>

                        <span className="hero__title-line">
                            Ramirez
                            <span className="hero__title-mark">
                                .
                            </span>
                        </span>
                    </h1>


                    {/*
                     * ------------------------------------------------------
                     * ENGINEERING IDENTITY
                     * ------------------------------------------------------
                     */}
                    <div className="hero__identity">
                        <p className="hero__role">
                            Software Engineer
                        </p>

                        <div className="hero__disciplines">
                            <span className="hero__discipline text-mono">
                                Full-Stack
                            </span>

                            <span className="hero__discipline text-mono">
                                AI / Machine Learning
                            </span>

                            <span className="hero__discipline text-mono">
                                Real-Time Systems
                            </span>

                            <span className="hero__discipline text-mono">
                                Cloud Infrastructure
                            </span>
                        </div>
                    </div>
                </div>


                {/*
                 * ----------------------------------------------------------
                 * ARCHITECTURAL VISUAL
                 * ----------------------------------------------------------
                 *
                 * HeroSkyline owns structure only.
                 *
                 * The parent Hero owns its animation because the architecture
                 * participates directly in this component's entrance sequence.
                 */}
                <div className="hero__visual">
                    <HeroSkyline />
                </div>


                {/*
                 * ----------------------------------------------------------
                 * HERO FOOTER
                 * ----------------------------------------------------------
                 */}
                <div className="hero__footer">
                    <div className="hero__socials">
                        <a
                            className="hero__social-link text-mono"
                            href="https://github.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <span className="hero__social-label">
                                GitHub
                            </span>

                            <ArrowUpRight
                                className="hero__social-icon"
                                aria-hidden="true"
                                size={14}
                                strokeWidth={1.5}
                            />
                        </a>

                        <a
                            className="hero__social-link text-mono"
                            href="https://www.linkedin.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <span className="hero__social-label">
                                LinkedIn
                            </span>

                            <ArrowUpRight
                                className="hero__social-icon"
                                aria-hidden="true"
                                size={14}
                                strokeWidth={1.5}
                            />
                        </a>
                    </div>


                    <a
                        className="hero__scroll text-mono"
                        href="#work"
                    >
                        <span className="hero__scroll-label">
                            Selected Work
                        </span>

                        <ArrowDown
                            className="hero__scroll-icon"
                            aria-hidden="true"
                            size={14}
                            strokeWidth={1.5}
                        />
                    </a>
                </div>
            </div>
        </section>
    );
}


export default Hero;