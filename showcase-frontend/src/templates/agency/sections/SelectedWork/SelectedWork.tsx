import {
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Project from "./Project.tsx";
import "./SelectedWork.css";

import AfterDarkPNG from "../../assets/after-dark.png"
import AtelierPNG from "../../assets/atelier-n.png"
import AureliaPNG from "../../assets/aurelia.png"
import Form24PNG from "../../assets/form-24.png"
import MonoHousePNG from "../../assets/mono-house.png"


gsap.registerPlugin(ScrollTrigger);


export type AgencyProject = {
    id: string;
    number: string;
    title: string;
    year: string;
    disciplines: string[];
    image: string;
    imageAlt: string;
    variant: "portrait" | "landscape" | "offset" | "wide" | "final";
    titleTheme: "dark" | "light";
};


const projects: AgencyProject[] = [
    {
        id: "aurelia",
        number: "01",
        title: "Aurelia",
        year: "2026",
        disciplines: [
            "Brand Direction",
            "Digital Experience",
            "Creative Development",
        ],
        image: AureliaPNG,
        imageAlt: "Editorial artwork for the fictional Aurelia project",
        variant: "portrait",
        titleTheme: "dark",
    },
    {
        id: "mono-house",
        number: "02",
        title: "Mono House",
        year: "2026",
        disciplines: [
            "Interactive Design",
            "Creative Development",
        ],
        image: MonoHousePNG,
        imageAlt: "Editorial artwork for the fictional Mono House project",
        variant: "landscape",
        titleTheme: "light",
    },
    {
        id: "form-24",
        number: "03",
        title: "Form / 24",
        year: "2025",
        disciplines: [
            "Art Direction",
            "Motion",
        ],
        image: Form24PNG,
        imageAlt: "Editorial artwork for the fictional Form 24 project",
        variant: "offset",
        titleTheme: "dark",
    },
    {
        id: "atelier-n",
        number: "04",
        title: "Atelier N",
        year: "2025",
        disciplines: [
            "Brand Systems",
            "Digital Experience",
        ],
        image: AtelierPNG,
        imageAlt: "Editorial artwork for the fictional Atelier N project",
        variant: "wide",
        titleTheme: "light",
    },
    {
        id: "after-dark",
        number: "05",
        title: "After Dark",
        year: "2024",
        disciplines: [
            "Environment",
            "Experience",
            "Visual Direction",
        ],
        image: AfterDarkPNG,
        imageAlt: "Editorial artwork for the fictional After Dark project",
        variant: "final",
        titleTheme: "light",
    },
];


export default function SelectedWork() {
    /*
     * REACT — these refs give GSAP access to the real DOM elements after
     * React has rendered the component.
     *
     * sectionRef:
     *     The complete Selected Work section and ScrollTrigger pin target.
     *
     * viewportRef:
     *     The visible horizontal window at 64REM+.
     *
     * projectsRef:
     *     The actual project track that GSAP moves horizontally.
     */
    const sectionRef = useRef<HTMLElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);

    /*
     * REACT STATE — stores which project is currently represented by the
     * horizontal scroll position.
     *
     * We store human-readable project numbers from 1 → 5 rather than
     * zero-based array indexes because that is exactly what the UI displays.
     */
    const [activeProject, setActiveProject] = useState(1);


    useLayoutEffect(() => {
        /*
         * NATIVE BROWSER API — matchMedia() reads the user's operating-system
         * motion preference.
         *
         * Our CSS represents the complete visible state, so skipping GSAP
         * leaves the section completely usable.
         */
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reducedMotion) {
            return;
        }


        /*
         * GSAP CORE — context() scopes selector text to this section and
         * records the animations created inside it.
         *
         * context.revert() later gives React one clean teardown operation.
         */
        const context = gsap.context(() => {
            /*
             * GSAP CORE — matchMedia() allows the animation architecture to
             * follow the same 64REM breakpoint as the CSS.
             *
             * This is better than checking window.innerWidth once because
             * GSAP can react when the browser crosses the breakpoint.
             */
            const mediaQueries = gsap.matchMedia();


            /*
             * ------------------------------------------------
             * BELOW 64REM — VERTICAL PROJECT REVEALS
             * ------------------------------------------------
             *
             * The project feed follows normal document flow below 64REM.
             * Each project therefore receives its own entrance reveal.
             */
            mediaQueries.add("(max-width: 63.999rem)", () => {
                /*
                 * GSAP CORE — toArray() converts the matching DOM elements
                 * into an array that can be iterated normally.
                 */
                const projectElements = gsap.utils.toArray<HTMLElement>(
                    ".agency-project"
                );


                projectElements.forEach((projectElement) => {
                    /*
                     * NATIVE BROWSER API — querySelector() searches only
                     * inside this particular project.
                     */
                    const media = projectElement.querySelector<HTMLElement>(
                        ".agency-project__media"
                    );

                    const image = projectElement.querySelector<HTMLImageElement>(
                        ".agency-project__image"
                    );


                    if (!media || !image) {
                        return;
                    }


                    /*
                     * GSAP CORE — timeline.from() defines where an animation
                     * STARTS.
                     *
                     * The existing CSS is therefore the destination.
                     *
                     * This gives us progressive enhancement:
                     *
                     * CSS = complete visible page.
                     * GSAP = temporary animated starting state.
                     */
                    const timeline = gsap.timeline({
                        /*
                         * GSAP SCROLLTRIGGER PLUGIN.
                         *
                         * This is an entrance animation rather than a
                         * scroll-controlled experience, so there is no scrub.
                         *
                         * once: true means the reveal does not reverse when
                         * the user scrolls upward again.
                         */
                        scrollTrigger: {
                            trigger: projectElement,
                            start: "top 72%",
                            once: true,
                        },
                    });


                    timeline.from(media, {
                        /*
                         * NATIVE CSS PROPERTY animated by GSAP.
                         *
                         * inset() follows:
                         *
                         * top right bottom left
                         *
                         * Clipping 100% from the bottom initially hides the
                         * media. Because this is .from(), GSAP then returns
                         * clip-path to the element's normal visible CSS state.
                         */
                        clipPath: "inset(0% 0% 100% 0%)",
                        duration: 1,
                        ease: "power3.inOut",
                    });


                    timeline.from(
                        image,
                        {
                            /*
                             * GSAP CORE CONVENIENCE — scale is managed through
                             * GSAP's transform system.
                             *
                             * The image begins at 108% and settles back to its
                             * normal rendered scale.
                             */
                            scale: 1.08,
                            duration: 1.2,
                            ease: "power3.out",
                        },

                        /*
                         * GSAP TIMELINE POSITION SYNTAX.
                         *
                         * "<" starts this tween at the same time as the
                         * previous media reveal.
                         */
                        "<"
                    );
                });
            });


            /*
             * ------------------------------------------------
             * 64REM AND LARGER — PINNED HORIZONTAL EXPERIENCE
             * ------------------------------------------------
             *
             * Vertical browser scrolling now controls horizontal movement.
             */
            mediaQueries.add("(min-width: 64rem)", () => {
                const section = sectionRef.current;
                const viewport = viewportRef.current;
                const track = projectsRef.current;


                if (!section || !viewport || !track) {
                    return;
                }


                /*
                 * NATIVE BROWSER LAYOUT PROPERTIES.
                 *
                 * scrollWidth:
                 *     Complete width of the project track, including content
                 *     extending beyond its visible viewport.
                 *
                 * clientWidth:
                 *     Inner width of the visible project viewport.
                 *
                 * Subtracting them gives us exactly how far the project track
                 * must travel horizontally.
                 */
                const getScrollDistance = () => {
                    return Math.max(
                        0,
                        track.scrollWidth - viewport.clientWidth
                    );
                };


                /*
                 * GSAP CORE — .to() animates from the current CSS state toward
                 * the supplied destination.
                 *
                 * `x` is a GSAP convenience property. GSAP implements the
                 * movement through CSS transforms for us.
                 *
                 * A negative x value moves the track left, exposing projects
                 * positioned farther to the right.
                 */
                const horizontalScroll = gsap.to(track, {
                    x: () => -getScrollDistance(),
                    ease: "none",

                    /*
                     * GSAP SCROLLTRIGGER PLUGIN.
                     *
                     * scrub:
                     *     Animation progress follows scroll progress.
                     *
                     * pin:
                     *     Keeps Selected Work stationary while the horizontal
                     *     track travels through the viewport.
                     *
                     * invalidateOnRefresh:
                     *     Recalculates our function-based measurements when
                     *     ScrollTrigger refreshes.
                     *
                     * anticipatePin:
                     *     Gives ScrollTrigger advance notice of the pin and
                     *     helps reduce a visible jump when pinning begins.
                     */
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: () => `+=${getScrollDistance()}`,
                        scrub: true,
                        pin: true,
                        invalidateOnRefresh: true,
                        anticipatePin: 1,

                        /*
                         * GSAP SCROLLTRIGGER PLUGIN — onUpdate() runs whenever
                         * this ScrollTrigger's progress changes.
                         *
                         * self.progress is normalized:
                         *
                         * 0   = beginning
                         * 0.5 = halfway
                         * 1   = end
                         *
                         * We reuse the ScrollTrigger that already controls the
                         * horizontal experience instead of creating five more
                         * triggers solely for the project counter.
                         */
                        onUpdate: (self) => {
                            /*
                             * NATIVE JAVASCRIPT.
                             *
                             * Convert continuous progress from 0 → 1 into one
                             * of our five discrete project numbers.
                             *
                             * With five projects:
                             *
                             * 0.00 → 01
                             * 0.20 → 02
                             * 0.40 → 03
                             * 0.60 → 04
                             * 0.80 → 05
                             *
                             * At progress === 1, the normal formula would
                             * produce 6. Math.min() clamps that result to the
                             * actual number of projects.
                             */
                            const projectNumber = Math.min(
                                projects.length,
                                Math.floor(
                                    self.progress * projects.length
                                ) + 1
                            );


                            /*
                             * REACT owns the displayed state.
                             * GSAP owns the movement.
                             *
                             * Keeping those responsibilities separate avoids
                             * making React control animation transforms.
                             */
                            setActiveProject(projectNumber);
                        },
                    },
                });


                /*
                 * Breakpoint-specific cleanup.
                 *
                 * If the viewport moves below 64REM, reset the supplementary
                 * counter and remove the horizontal tween.
                 */
                return () => {
                    setActiveProject(1);
                    horizontalScroll.kill();
                };
            });


            /*
             * Clean up GSAP's responsive animation registrations when the
             * surrounding context is destroyed.
             */
            return () => {
                mediaQueries.revert();
            };
        }, sectionRef);


        /*
         * REACT EFFECT CLEANUP + GSAP CORE.
         *
         * This is important during normal component navigation and React
         * Strict Mode development behavior.
         */
        return () => {
            context.revert();
        };
    }, []);


    return (
        <section
            className="agency-work"
            id="work"
            aria-labelledby="agency-work-title"
            ref={sectionRef}
        >
            <div className="agency-work__container">
                <header className="agency-work__header">
                    <p className="agency-work__index">
                        03 — Selected Work
                    </p>

                    <h2
                        className="agency-work__heading"
                        id="agency-work-title"
                    >
                        Selected Work
                    </h2>

                    <p className="agency-work__range">
                        2024—2026
                    </p>
                </header>


                {/*
                 * The viewport and moving track deliberately have separate
                 * responsibilities.
                 *
                 * BASE / MOBILE + 48REM:
                 *     Projects remain a normal vertical feed.
                 *
                 * 64REM+:
                 *     viewport clips horizontal overflow.
                 *     projects becomes the moving GSAP track.
                 */}
                <div
                    className="agency-work__viewport"
                    ref={viewportRef}
                >
                    <div
                        className="agency-work__projects"
                        ref={projectsRef}
                    >
                        {projects.map((project) => (
                            <Project
                                key={project.id}
                                project={project}
                            />
                        ))}
                    </div>
                </div>


                {/*
                 * HORIZONTAL PROJECT PROGRESS.
                 *
                 * This is supplementary visual feedback rather than primary
                 * navigation or project content.
                 *
                 * CSS hides it below 64REM because project order is already
                 * obvious in the normal vertical document flow.
                 *
                 * aria-hidden prevents screen readers from repeatedly
                 * announcing changing decorative progress numbers.
                 */}
                <div
                    className="agency-work__progress"
                    aria-hidden="true"
                >
                    <span className="agency-work__progress-current">
                        {String(activeProject).padStart(2, "0")}
                    </span>

                    <span className="agency-work__progress-divider">
                        /
                    </span>

                    <span className="agency-work__progress-total">
                        {String(projects.length).padStart(2, "0")}
                    </span>
                </div>
            </div>
        </section>
    );
}