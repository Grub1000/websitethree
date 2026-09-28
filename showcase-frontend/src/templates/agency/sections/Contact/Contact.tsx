import {
    useLayoutEffect,
    useRef,
} from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

import "./Contact.css";


export default function Contact() {
    /*
     * REACT REFS
     *
     * sectionRef:
     *     Gives GSAP a scope for this section.
     *
     * ctaRef:
     *     Gives us direct access to the magnetic CTA element.
     *
     * ctaLabelRef:
     *     Lets the CTA label move independently from the outer CTA.
     *
     * That independent movement is what makes the interaction feel magnetic
     * rather than simply translating the entire button under the pointer.
     */
    const sectionRef = useRef<HTMLElement>(null);
    const ctaRef = useRef<HTMLAnchorElement>(null);
    const ctaLabelRef = useRef<HTMLSpanElement>(null);


    useLayoutEffect(() => {
        const section = sectionRef.current;
        const cta = ctaRef.current;
        const ctaLabel = ctaLabelRef.current;


        if (!section || !cta || !ctaLabel) {
            return;
        }


        /*
         * NATIVE BROWSER APIs
         *
         * The magnetic interaction only activates when:
         *
         * 1. The layout is at least 64REM wide.
         * 2. The primary input device supports hover.
         * 3. The user has NOT requested reduced motion.
         *
         * Mobile and touch users simply receive the normal CTA.
         */
        const largeHoverLayout = window.matchMedia(
            "(min-width: 64rem) and (hover: hover) and (pointer: fine)"
        );

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


        if (!largeHoverLayout.matches || reducedMotion.matches) {
            return;
        }


        const context = gsap.context(() => {
            /*
             * GSAP QUICKTO
             *
             * quickTo() creates reusable functions for repeatedly animating
             * one property toward a new value.
             *
             * This is especially useful for pointer movement because
             * pointermove can fire many times every second.
             *
             * Creating a brand-new gsap.to() on every pointer event would
             * continuously create overlapping tweens. quickTo() instead
             * reuses the same tween machinery.
             *
             * `x` and `y` are GSAP conveniences, NOT CSS properties.
             * GSAP manages CSS transform: translate(...) internally.
             */
            const moveCtaX = gsap.quickTo(
                cta,
                "x",
                {
                    duration: 0.45,
                    ease: "power3.out",
                }
            );

            const moveCtaY = gsap.quickTo(
                cta,
                "y",
                {
                    duration: 0.45,
                    ease: "power3.out",
                }
            );

            const moveLabelX = gsap.quickTo(
                ctaLabel,
                "x",
                {
                    duration: 0.35,
                    ease: "power3.out",
                }
            );

            const moveLabelY = gsap.quickTo(
                ctaLabel,
                "y",
                {
                    duration: 0.35,
                    ease: "power3.out",
                }
            );


            const handlePointerMove = (
                event: PointerEvent
            ) => {
                /*
                 * NATIVE BROWSER API — getBoundingClientRect()
                 *
                 * Returns the CTA's current dimensions and viewport position.
                 *
                 * From that rectangle we calculate the CTA's center point,
                 * then measure how far the pointer is from that center.
                 */
                const bounds = cta.getBoundingClientRect();

                const centerX =
                    bounds.left + bounds.width / 2;

                const centerY =
                    bounds.top + bounds.height / 2;

                const pointerX =
                    event.clientX - centerX;

                const pointerY =
                    event.clientY - centerY;


                /*
                 * The outer CTA follows only a fraction of the pointer
                 * distance.
                 *
                 * We intentionally do NOT move it directly underneath the
                 * cursor. The goal is a subtle magnetic pull, not a button
                 * physically attached to the pointer.
                 */
                moveCtaX(pointerX * 0.16);
                moveCtaY(pointerY * 0.16);

                /*
                 * The inner label moves slightly farther than the outer CTA.
                 *
                 * That difference creates depth:
                 *
                 * pointer
                 *    ↓
                 * label moves more
                 * CTA moves less
                 *
                 * The two layers therefore appear to respond independently.
                 */
                moveLabelX(pointerX * 0.08);
                moveLabelY(pointerY * 0.08);
            };


            const handlePointerLeave = () => {
                /*
                 * Returning every value to zero restores the position defined
                 * by CSS.
                 *
                 * CSS remains responsible for layout. GSAP temporarily adds
                 * transform-based movement during interaction.
                 */
                moveCtaX(0);
                moveCtaY(0);

                moveLabelX(0);
                moveLabelY(0);
            };


            cta.addEventListener(
                "pointermove",
                handlePointerMove
            );

            cta.addEventListener(
                "pointerleave",
                handlePointerLeave
            );


            /*
             * Register native listener cleanup with the GSAP context.
             *
             * GSAP can clean up animations it creates, but browser event
             * listeners are a separate system and must also be removed.
             */
            return () => {
                cta.removeEventListener(
                    "pointermove",
                    handlePointerMove
                );

                cta.removeEventListener(
                    "pointerleave",
                    handlePointerLeave
                );
            };
        }, section);


        return () => {
            context.revert();
        };
    }, []);


    return (
        <section
            className="agency-contact"
            id="contact"
            aria-labelledby="agency-contact-title"
            ref={sectionRef}
        >
            <div className="agency-contact__container">
                <header className="agency-contact__header">
                    <p className="agency-contact__index">
                        07 — Contact
                    </p>

                    <p className="agency-contact__location">
                        Los Angeles — CA
                    </p>
                </header>


                <div className="agency-contact__main">
                    {/*
                     * MAIN CTA STATEMENT
                     *
                     * The line breaks are controlled structurally so the
                     * composition remains predictable as typography scales.
                     *
                     * Desktop Grid placement later shifts the individual
                     * lines without changing their logical DOM order.
                     */}
                    <h2
                        className="agency-contact__title"
                        id="agency-contact-title"
                    >
                        <span className="agency-contact__title-line agency-contact__title-line--first">
                            Have something
                        </span>

                        <span className="agency-contact__title-line agency-contact__title-line--serif">
                            in mind?
                        </span>

                        <span className="agency-contact__title-line agency-contact__title-line--third">
                            Let's make it
                        </span>

                        <span className="agency-contact__title-line agency-contact__title-line--last">
                            move.
                        </span>
                    </h2>


                    {/*
                     * This is a real anchor rather than a decorative div or
                     * button because its purpose is communication.
                     *
                     * mailto: provides a functional destination even in this
                     * fictional portfolio template.
                     */}
                    <div className="agency-contact__cta-area">
                        <a
                            className="agency-contact__cta"
                            href="mailto:hello@luxure.studio"
                            ref={ctaRef}
                        >
                            <span
                                className="agency-contact__cta-label"
                                ref={ctaLabelRef}
                            >
                                <span className="agency-contact__cta-text">
                                    Start a project
                                </span>

                                <ArrowUpRight
                                    className="agency-contact__cta-icon"
                                    aria-hidden="true"
                                    strokeWidth={1.5}
                                />
                            </span>
                        </a>
                    </div>
                </div>


                <div className="agency-contact__details">
                    <div className="agency-contact__detail">
                        <p className="agency-contact__detail-label">
                            New business
                        </p>

                        <a
                            className="agency-contact__detail-link"
                            href="mailto:hello@luxure.studio"
                        >
                            hello@luxure.studio
                        </a>
                    </div>

                    <div className="agency-contact__detail">
                        <p className="agency-contact__detail-label">
                            General
                        </p>

                        <a
                            className="agency-contact__detail-link"
                            href="mailto:studio@luxure.studio"
                        >
                            studio@luxure.studio
                        </a>
                    </div>

                    <div className="agency-contact__detail agency-contact__detail--availability">
                        <p className="agency-contact__detail-label">
                            Availability
                        </p>

                        <p className="agency-contact__detail-value">
                            Select projects / 2026
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}