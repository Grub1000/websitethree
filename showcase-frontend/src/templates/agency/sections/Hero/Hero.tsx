import {
    ArrowDown,
} from "lucide-react";




import {
    useEffect,
    useRef,
} from "react";





import gsap from "gsap";




// Style Sheet Import
import "./Hero.css";




// Asset Imports
import HeroPNG from "../../assets/Hero.png"




export default function Hero() {
    const heroRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const hero = heroRef.current;

        if (!hero) {
            return;
        }

        /*
         * The hero remains fully readable without animation.
         *
         * When reduced motion is requested, GSAP does not modify the
         * initial state at all. This avoids hiding content and then
         * requiring an animation to make that content accessible.
         */
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        if (prefersReducedMotion) {
            return;
        }

        /*
         * gsap.context scopes selectors and generated animation state
         * to this Hero instance.
         *
         * context.revert() during cleanup removes GSAP's inline styles,
         * which is especially important during React development where
         * effects may mount and unmount repeatedly.
         */
        const context = gsap.context(() => {
            const timeline = gsap.timeline({
                defaults: {
                    ease: "power3.out",
                },
            });


            /*
             * The element's normal CSS represents its final/destination state.
             * GSAP temporarily applies the values below using (.from), then animates FROM
             * those values back TO the state already defined by our CSS.
             *
             * Example:
             * CSS says the element is at y: 0 and opacity: 1.
             * We tell GSAP to start at y: 24 and opacity: 0.
             *
             * Animation:
             * y: 24       → y: 0
             * opacity: 0  → opacity: 1
             *
             * This is useful for entrance animations because CSS continues to
             * describe how the finished page should actually look.
             *      
             * Text begins below its clipping wrapper. The wrappers hide
             * that translated content, producing a typography reveal
             * rather than a generic opacity fade.
             */
            timeline.from(
                ".agency-hero__reveal-content",
                {
                    yPercent: 110,  // yPercent Only Moves Text. Its a GSAP native feature.
                    duration: 0.85,
                    stagger: 0.08,
                },
            );

            /*
             * The image is revealed independently from the typography.
             * clip-path creates the impression that the photography is
             * being uncovered by the surrounding editorial composition.
             */
            timeline.from(
                ".agency-hero__image",
                {
                    clipPath: "inset(100% 0% 0% 0%)",
                    scale: 1.08,
                    duration: 1.05,
                },
                "-=0.55",
            );

            /*
             * Supporting information arrives last and quietly.
             * Its lower visual priority is reinforced by the smaller
             * movement and shorter duration.
             */
            timeline.from(
                ".agency-hero__support",
                {
                    y: 16,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.06,
                },
                "-=0.45",
            );
        }, hero);

        return () => {
            context.revert();
        };
    }, []);

    return (
        <section
            className="agency-hero"
            id="top"
            ref={heroRef}
            aria-labelledby="agency-hero-title"
        >
            <div className="agency-hero__container">
                <div className="agency-hero__composition">
                    <h1
                        className="agency-hero__title"
                        id="agency-hero-title"
                    >
                        <span className="agency-hero__title-line agency-hero__title-line--one">
                            <span className="agency-hero__reveal">
                                <span className="agency-hero__reveal-content">
                                    We create
                                </span>
                            </span>
                        </span>

                        <span className="agency-hero__title-line agency-hero__title-line--two">
                            <span className="agency-hero__reveal">
                                <span className="agency-hero__reveal-content">
                                    digital
                                </span>
                            </span>
                        </span>

                        <span className="agency-hero__title-line agency-hero__title-line--serif">
                            <span className="agency-hero__reveal">
                                <span className="agency-hero__reveal-content">
                                    experiences
                                </span>
                            </span>
                        </span>

                        <span className="agency-hero__title-line agency-hero__title-line--three">
                            <span className="agency-hero__reveal">
                                <span className="agency-hero__reveal-content">
                                    that move.
                                </span>
                            </span>
                        </span>
                    </h1>

                    <figure className="agency-hero__media">
                        <img
                            className="agency-hero__image"
                            src={HeroPNG}
                            alt="Creative studio project artwork"
                        />
                    </figure>

                    <div className="agency-hero__studio agency-hero__support">
                        <p className="agency-hero__studio-label">
                            Independent creative
                            <br />
                            development studio
                        </p>

                        <p className="agency-hero__studio-location">
                            Los Angeles — CA
                        </p>
                    </div>

                    <div className="agency-hero__work agency-hero__support">
                        <span className="agency-hero__work-index">
                            (01—05)
                        </span>

                        <span className="agency-hero__work-label">
                            Selected work
                        </span>
                    </div>

                    <div className="agency-hero__scroll agency-hero__support">
                        <span className="agency-hero__scroll-label">
                            Scroll
                        </span>

                        <ArrowDown
                            className="agency-hero__scroll-icon"
                            size={14}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}