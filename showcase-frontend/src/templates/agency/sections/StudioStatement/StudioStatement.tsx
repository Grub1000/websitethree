import { useEffect, useRef } from "react";

// Stlying Sheet Import
import "./StudioStatement.css";


// GSAP Imports and GSAP plugin registering
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);







export default function StudioStatement() {
    const studioRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const studio = studioRef.current;

        if (!studio) {
            return;
        }

        /*
         * The complete Studio section remains visible and usable when
         * reduced motion is requested. GSAP never applies the hidden
         * starting states in that case.
         */
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        if (prefersReducedMotion) {
            return;
        }

        /*
         * Scope every selector and animation to this Studio instance.
         *
         * This keeps the animation isolated from similarly named
         * elements elsewhere and lets context.revert() cleanly remove
         * GSAP's inline styles when React unmounts the component.
         */
        const context = gsap.context(() => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: studio,
                    start: "top 72%",
                    once: true,
                },
                defaults: {
                    ease: "power3.out",
                },
            });

            /*
             * Small editorial metadata enters first but remains quiet.
             * It establishes the section before the oversized statement
             * becomes the visual focus.
             */
            timeline.from(
                ".agency-studio__header",
                {
                    y: 16,
                    opacity: 0,
                    duration: 0.55,
                },
            );

            /*
             * Each headline fragment has its own clipping wrapper.
             * Moving the inner text upward through that wrapper gives
             * us the same editorial reveal language introduced by the
             * Hero without simply replaying the exact Hero animation.
             */
            timeline.from(
                ".agency-studio__reveal-content",
                {
                    yPercent: 115,
                    duration: 0.85,
                    stagger: 0.1,
                },
                "-=0.25",
            );

            /*
             * The serif receives additional horizontal movement.
             *
             * Its different motion reinforces the typographic contrast:
             * the grotesk feels rigid and structural while the serif
             * feels more fluid and expressive.
             */
            timeline.from(
                ".agency-studio__title-serif",
                {
                    xPercent: 8,
                    duration: 0.9,
                },
                "<0.1",
            );

            /*
             * Supporting content enters after the statement has mostly
             * resolved so it never competes with the primary typography.
             */
            timeline.from(
                ".agency-studio__description",
                {
                    y: 24,
                    opacity: 0,
                    duration: 0.65,
                },
                "-=0.35",
            );

            timeline.from(
                ".agency-studio__footer",
                {
                    y: 16,
                    opacity: 0,
                    duration: 0.55,
                },
                "-=0.35",
            );
        }, studio);

        return () => {
            context.revert();
        };
    }, []);

    return (
        <section
            className="agency-studio"
            id="studio"
            ref={studioRef}
            aria-labelledby="agency-studio-title"
        >
            <div className="agency-studio__container">
                <header className="agency-studio__header">
                    <p className="agency-studio__index">
                        02 — Studio
                    </p>

                    <p className="agency-studio__year">
                        Est. 2026
                    </p>
                </header>

                <div className="agency-studio__statement">
                    <h2
                        className="agency-studio__title"
                        id="agency-studio-title"
                    >
                        <span className="agency-studio__title-intro agency-studio__reveal">
                            <span className="agency-studio__reveal-content">
                                We work at the
                                <br />
                                intersection of
                            </span>
                        </span>

                        <span className="agency-studio__title-primary agency-studio__reveal">
                            <span className="agency-studio__reveal-content">
                                Creative
                            </span>
                        </span>

                        <span className="agency-studio__title-serif agency-studio__reveal">
                            <span className="agency-studio__reveal-content">
                                development,
                            </span>
                        </span>

                        <span className="agency-studio__title-outro agency-studio__reveal">
                            <span className="agency-studio__reveal-content">
                                design and motion.
                            </span>
                        </span>
                    </h2>

                    <div className="agency-studio__description">
                        <p className="agency-studio__description-text">
                            We partner with ambitious brands and people to
                            create digital experiences that refuse to stand
                            still.
                        </p>
                    </div>
                </div>

                <footer className="agency-studio__footer">
                    <ul
                        className="agency-studio__capabilities"
                        role="list"
                    >
                        <li className="agency-studio__capability">
                            Art Direction
                        </li>

                        <li className="agency-studio__capability">
                            Creative Development
                        </li>

                        <li className="agency-studio__capability">
                            Interaction
                        </li>

                        <li className="agency-studio__capability">
                            Motion
                        </li>
                    </ul>

                    <p className="agency-studio__location">
                        Los Angeles — CA
                    </p>
                </footer>
            </div>
        </section>
    );
}