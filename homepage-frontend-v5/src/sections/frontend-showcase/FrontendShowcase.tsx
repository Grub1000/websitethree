/*
 * ==========================================================================
 * FRONTEND SHOWCASE
 * ==========================================================================
 *
 * SECTION 07 — DESIGNED / TO MOVE.
 *
 * PURPOSE
 * --------------------------------------------------------------------------
 * This section presents five polished frontend templates as large visual
 * experiences rather than traditional project cards.
 *
 * REACT:
 * - renders showcase data
 * - provides DOM refs and lifecycle
 *
 * NATIVE BROWSER:
 * - IntersectionObserver determines when each showcase enters the viewport
 * - matchMedia checks reduced-motion preference
 *
 * GSAP:
 * - clip-path image reveals
 * - typography entrances
 * - metadata stagger
 * - frame-line construction
 * - image entrance scale
 *
 * CSS:
 * - hover interactions
 * - image movement
 * - button fill
 * - frame response
 *
 * No ScrollTrigger.
 * No scrub.
 * No continuous animation.
 */


import {
    useLayoutEffect,
    useRef,
} from "react";


import gsap from "gsap";


import {
    ArrowUpRight,
} from "lucide-react";


import {
    SiCss,
    SiGsap,
    SiReact,
    SiTypescript,
} from "react-icons/si";


import type {
    IconType,
} from "react-icons";


import "./FrontendShowcase.css";


/*
 * ==========================================================================
 * SCREENSHOTS
 * ==========================================================================
 *
 * Replace these paths with your actual five screenshots.
 *
 * The layout expects approximately 16:8 / 2:1 landscape screenshots.
 */

import saasScreenshot from "../../assets/images/frontend-showcase/saas.png";
import agencyScreenshot from "../../assets/images/frontend-showcase/agency.png";
// import templateThreeScreenshot from "../../assets/images/frontend-showcase/agency.png";
// import templateFourScreenshot from "../../assets/images/frontend-showcase/agency.png";
// import templateFiveScreenshot from "../../assets/images/frontend-showcase/agency.png";


/*
 * ==========================================================================
 * TYPES
 * ==========================================================================
 */

type ShowcaseVariant =
    | "visual-right"
    | "visual-left"
    | "visual-wide"
    | "visual-offset"
    | "visual-finale";


interface ShowcaseTechnology {
    name: string;
    icon: IconType;
    color: string;
}


interface ShowcaseProject {
    index: string;
    eyebrow: string;
    title: string;
    description: string;
    year: string;
    image: string;
    imageAlt: string;
    variant: ShowcaseVariant;
    technologies: ShowcaseTechnology[];
    highlights: string[];
    url: string;
}


/*
 * ==========================================================================
 * TECHNOLOGIES
 * ==========================================================================
 */

const reactTechnology: ShowcaseTechnology = {
    name: "React",
    icon: SiReact,
    color: "#61DAFB",
};


const typescriptTechnology: ShowcaseTechnology = {
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
};


const cssTechnology: ShowcaseTechnology = {
    name: "CSS",
    icon: SiCss,
    color: "#663399",
};


const gsapTechnology: ShowcaseTechnology = {
    name: "GSAP",
    icon: SiGsap,
    color: "#88CE02",
};


/*
 * ==========================================================================
 * SHOWCASE DATA
 * ==========================================================================
 *
 * I've populated the first two around SaaS + Agency and intentionally kept
 * the remaining three generic enough for you to replace once those templates
 * are finalized.
 */

const showcaseProjects: ShowcaseProject[] = [
    {
        index: "01",
        eyebrow: "SAAS EXPERIENCE",
        title: "NEXORA",
        description:
            "A responsive SaaS landing experience built around infrastructure visualization, interactive product storytelling, and deliberate motion.",
        year: "2026",
        image: saasScreenshot,
        imageAlt: "Nexora SaaS frontend template",
        variant: "visual-right",

        technologies: [
            reactTechnology,
            typescriptTechnology,
            cssTechnology,
            gsapTechnology,
        ],

        highlights: [
            "RESPONSIVE SYSTEM",
            "MOTION DESIGN",
            "INTERACTIVE UI",
        ],

        url: "https://jorgeramirez.net/showcase/saas/",
    },

    {
        index: "02",
        eyebrow: "AGENCY EXPERIENCE",
        title: "Luxure",
        description:
            "A visually driven agency experience exploring strong typography, editorial composition, responsive layout, and interaction.",
        year: "2026",
        image: agencyScreenshot,
        imageAlt: "Agency frontend template",
        variant: "visual-left",

        technologies: [
            reactTechnology,
            typescriptTechnology,
            cssTechnology,
            gsapTechnology,
        ],

        highlights: [
            "EDITORIAL LAYOUT",
            "RESPONSIVE DESIGN",
            "INTERACTION",
        ],

        url: "https://jorgeramirez.net/showcase/agency/",
    },

    // {
    //     index: "03",
    //     eyebrow: "FRONTEND EXPERIENCE",
    //     title: "TEMPLATE 03",
    //     description:
    //         "A polished frontend exploration focused on composition, responsive behavior, and expressive interaction.",
    //     year: "2026",
    //     image: templateThreeScreenshot,
    //     imageAlt: "Frontend template three",
    //     variant: "visual-wide",

    //     technologies: [
    //         reactTechnology,
    //         typescriptTechnology,
    //         cssTechnology,
    //         gsapTechnology,
    //     ],

    //     highlights: [
    //         "LAYOUT SYSTEM",
    //         "RESPONSIVE UI",
    //         "MOTION",
    //     ],

    //     url: "#",
    // },

    // {
    //     index: "04",
    //     eyebrow: "FRONTEND EXPERIENCE",
    //     title: "TEMPLATE 04",
    //     description:
    //         "An interface study combining strong visual hierarchy with responsive implementation and purposeful motion.",
    //     year: "2026",
    //     image: templateFourScreenshot,
    //     imageAlt: "Frontend template four",
    //     variant: "visual-offset",

    //     technologies: [
    //         reactTechnology,
    //         typescriptTechnology,
    //         cssTechnology,
    //         gsapTechnology,
    //     ],

    //     highlights: [
    //         "VISUAL SYSTEM",
    //         "RESPONSIVE DESIGN",
    //         "INTERACTION",
    //     ],

    //     url: "#",
    // },

    // {
    //     index: "05",
    //     eyebrow: "FRONTEND EXPERIENCE",
    //     title: "TEMPLATE 05",
    //     description:
    //         "A final frontend showcase piece demonstrating layout, interaction, responsive behavior, and implementation detail.",
    //     year: "2026",
    //     image: templateFiveScreenshot,
    //     imageAlt: "Frontend template five",
    //     variant: "visual-finale",

    //     technologies: [
    //         reactTechnology,
    //         typescriptTechnology,
    //         cssTechnology,
    //         gsapTechnology,
    //     ],

    //     highlights: [
    //         "UI ENGINEERING",
    //         "MOTION DESIGN",
    //         "RESPONSIVE SYSTEM",
    //     ],

    //     url: "#",
    // },
];


/*
 * ==========================================================================
 * TECHNOLOGY MARK
 * ==========================================================================
 */

function TechnologyMark({
    technology,
}: {
    technology: ShowcaseTechnology;
}) {

    const Icon = technology.icon;


    return (
        <li className="frontend-showcase__technology">

            <Icon
                className="frontend-showcase__technology-icon"
                style={{
                    color: technology.color,
                }}
                aria-hidden="true"
            />


            <span className="frontend-showcase__technology-name text-mono">
                {technology.name}
            </span>

        </li>
    );
}


/*
 * ==========================================================================
 * SHOWCASE ITEM
 * ==========================================================================
 */

function ShowcaseItem({
    project,
}: {
    project: ShowcaseProject;
}) {

    return (
        <article
            className={
                `frontend-showcase__project ` +
                `frontend-showcase__project--${project.variant}`
            }
            data-showcase-project
        >

            {/*
             * ----------------------------------------------------------------
             * TOP METADATA
             * ----------------------------------------------------------------
             */}

            <div className="frontend-showcase__project-meta">

                <div className="frontend-showcase__project-index-group">

                    <span className="frontend-showcase__project-index text-mono">
                        {project.index}
                    </span>


                    <span className="frontend-showcase__project-index-divider text-mono">
                        /
                    </span>


                    <span className="frontend-showcase__project-eyebrow text-mono">
                        {project.eyebrow}
                    </span>

                </div>


                <span className="frontend-showcase__project-year text-mono">
                    {project.year}
                </span>

            </div>


            {/*
             * Decorative construction line.
             *
             * GSAP scales this from left to right when the project enters.
             */}

            <span
                className="frontend-showcase__project-line"
                aria-hidden="true"
            />


            {/*
             * ----------------------------------------------------------------
             * MAIN COMPOSITION
             * ----------------------------------------------------------------
             */}

            <div className="frontend-showcase__composition">

                {/*
                 * ------------------------------------------------------------
                 * CONTENT
                 * ------------------------------------------------------------
                 */}

                <div className="frontend-showcase__content">

                    <div className="frontend-showcase__title-mask">

                        <h3 className="frontend-showcase__project-title">
                            {project.title}
                            <span className="frontend-showcase__project-title-mark">
                                .
                            </span>
                        </h3>

                    </div>


                    <p className="frontend-showcase__description">
                        {project.description}
                    </p>


                    <ul
                        className="frontend-showcase__highlights"
                        aria-label={`${project.title} interface highlights`}
                    >

                        {project.highlights.map((highlight) => (
                            <li
                                className="frontend-showcase__highlight text-mono"
                                key={highlight}
                            >

                                <span
                                    className="frontend-showcase__highlight-marker"
                                    aria-hidden="true"
                                />

                                {highlight}

                            </li>
                        ))}

                    </ul>


                    <ul
                        className="frontend-showcase__technologies"
                        aria-label={`${project.title} technologies`}
                    >

                        {project.technologies.map((technology) => (
                            <TechnologyMark
                                technology={technology}
                                key={technology.name}
                            />
                        ))}

                    </ul>


                    <a
                        className="frontend-showcase__action"
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                    >

                        <span
                            className="frontend-showcase__action-background"
                            aria-hidden="true"
                        />


                        <span className="frontend-showcase__action-label text-mono">
                            VIEW EXPERIENCE
                        </span>


                        <span className="frontend-showcase__action-icon-frame">

                            <ArrowUpRight
                                className="frontend-showcase__action-icon"
                                aria-hidden="true"
                                strokeWidth={1.5}
                            />

                        </span>

                    </a>

                </div>


                {/*
                 * ------------------------------------------------------------
                 * VISUAL
                 * ------------------------------------------------------------
                 *
                 * The screenshot is deliberately NOT placed inside a fake
                 * MacBook/iPhone mockup.
                 *
                 * The surrounding frame belongs to this portfolio's visual
                 * system instead.
                 */}

                <a
                    className="frontend-showcase__visual"
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${project.title} frontend experience`}
                >

                    <div className="frontend-showcase__visual-frame">

                        {/*
                         * Frame header resembles an interface viewport without
                         * pretending to be a particular operating system.
                         */}

                        <div className="frontend-showcase__visual-toolbar">

                            <div className="frontend-showcase__visual-toolbar-left">

                                <span
                                    className="frontend-showcase__visual-status-dot"
                                    aria-hidden="true"
                                />


                                <span className="frontend-showcase__visual-status text-mono">
                                    LIVE / INTERFACE
                                </span>

                            </div>


                            <span className="frontend-showcase__visual-count text-mono">
                                {project.index} / 05
                            </span>

                        </div>


                        <div className="frontend-showcase__image-mask">

                            <img
                                className="frontend-showcase__image"
                                src={project.image}
                                alt={project.imageAlt}
                                loading="lazy"
                            />


                            {/*
                             * Subtle hover overlay.
                             */}

                            <span
                                className="frontend-showcase__image-overlay"
                                aria-hidden="true"
                            />


                            {/*
                             * Corner registration marks reinforce the technical
                             * visual language used elsewhere in the portfolio.
                             */}

                            <span
                                className="frontend-showcase__corner frontend-showcase__corner--top-left"
                                aria-hidden="true"
                            />


                            <span
                                className="frontend-showcase__corner frontend-showcase__corner--bottom-right"
                                aria-hidden="true"
                            />

                        </div>


                        <div className="frontend-showcase__visual-footer">

                            <span className="frontend-showcase__visual-footer-label text-mono">
                                RESPONSIVE / FRONTEND
                            </span>


                            <span className="frontend-showcase__visual-footer-action text-mono">
                                OPEN ↗
                            </span>

                        </div>

                    </div>

                </a>

            </div>

        </article>
    );
}


/*
 * ==========================================================================
 * FRONTEND SHOWCASE
 * ==========================================================================
 */

function FrontendShowcase() {

    const sectionRef =
        useRef<HTMLElement>(null);


    /*
     * ======================================================================
     * GSAP ENTRANCE SYSTEM
     * ======================================================================
     *
     * We use ONE native IntersectionObserver for the section and another set
     * of observations for the individual showcase projects.
     *
     * This allows each large showcase piece to animate when it becomes
     * relevant instead of animating all five immediately.
     */

    useLayoutEffect(() => {

        const section = sectionRef.current;


        if (!section) {
            return;
        }


        const prefersReducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        /*
         * Reduced motion:
         *
         * Everything is rendered in its final state by default, so simply
         * skipping GSAP leaves the entire section visible.
         */

        if (prefersReducedMotion) {
            return;
        }


        let headerObserver: IntersectionObserver | null = null;

        const projectObservers: IntersectionObserver[] = [];


        const context = gsap.context(() => {

            /*
             * ==================================================================
             * SECTION HEADER INITIAL STATE
             * ==================================================================
             */

            gsap.set(
                ".frontend-showcase__section-meta",
                {
                    autoAlpha: 0,
                    y: 12,
                }
            );


            /*
             * `yPercent` is GSAP syntax, not native CSS.
             *
             * The parent title line has overflow hidden, producing the mask.
             */

            gsap.set(
                ".frontend-showcase__title-line-inner",
                {
                    yPercent: 110,
                }
            );


            gsap.set(
                ".frontend-showcase__introduction",
                {
                    autoAlpha: 0,
                    y: 18,
                }
            );


            gsap.set(
                ".frontend-showcase__section-line",
                {
                    scaleX: 0,
                    transformOrigin: "left center",
                }
            );


            /*
             * ==================================================================
             * SECTION HEADER OBSERVER
             * ==================================================================
             */

            headerObserver =
                new IntersectionObserver(
                    ([entry]) => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        const timeline =
                            gsap.timeline({
                                defaults: {
                                    ease: "power3.out",
                                },
                            });


                        timeline
                            .to(
                                ".frontend-showcase__section-meta",
                                {
                                    autoAlpha: 1,
                                    y: 0,

                                    duration: 0.4,
                                }
                            )

                            .to(
                                ".frontend-showcase__section-line",
                                {
                                    scaleX: 1,

                                    duration: 0.7,

                                    ease: "power4.inOut",
                                },
                                "-=0.2"
                            )

                            .to(
                                ".frontend-showcase__title-line-inner",
                                {
                                    yPercent: 0,

                                    duration: 0.75,
                                    stagger: 0.09,

                                    ease: "power4.out",
                                },
                                "-=0.45"
                            )

                            .to(
                                ".frontend-showcase__introduction",
                                {
                                    autoAlpha: 1,
                                    y: 0,

                                    duration: 0.5,
                                },
                                "-=0.4"
                            );


                        headerObserver?.disconnect();
                    },
                    {
                        threshold: 0.2,
                    }
                );


            headerObserver.observe(section);


            /*
             * ==================================================================
             * INDIVIDUAL SHOWCASE PROJECTS
             * ==================================================================
             */

            const projects =
                gsap.utils.toArray<HTMLElement>(
                    "[data-showcase-project]"
                );


            projects.forEach((project) => {

                const meta =
                    project.querySelector(
                        ".frontend-showcase__project-meta"
                    );


                const line =
                    project.querySelector(
                        ".frontend-showcase__project-line"
                    );


                const title =
                    project.querySelector(
                        ".frontend-showcase__project-title"
                    );


                const description =
                    project.querySelector(
                        ".frontend-showcase__description"
                    );


                const highlights =
                    project.querySelectorAll(
                        ".frontend-showcase__highlight"
                    );


                const technologies =
                    project.querySelectorAll(
                        ".frontend-showcase__technology"
                    );


                const action =
                    project.querySelector(
                        ".frontend-showcase__action"
                    );


                const visual =
                    project.querySelector(
                        ".frontend-showcase__visual"
                    );


                const frame =
                    project.querySelector(
                        ".frontend-showcase__visual-frame"
                    );


                const image =
                    project.querySelector(
                        ".frontend-showcase__image"
                    );


                /*
                 * --------------------------------------------------------------
                 * INITIAL PROJECT STATES
                 * --------------------------------------------------------------
                 */

                gsap.set(meta, {
                    autoAlpha: 0,
                    y: 10,
                });


                gsap.set(line, {
                    scaleX: 0,
                    transformOrigin: "left center",
                });


                gsap.set(title, {
                    clipPath: "inset(0 100% 0 0)",
                });


                gsap.set(description, {
                    autoAlpha: 0,
                    y: 16,
                });


                gsap.set(highlights, {
                    autoAlpha: 0,
                    x: -8,
                });


                gsap.set(technologies, {
                    autoAlpha: 0,
                    y: 7,
                });


                gsap.set(action, {
                    autoAlpha: 0,
                    y: 10,
                });


                /*
                 * clipPath itself is native CSS.
                 *
                 * GSAP is interpolating between the CSS values.
                 */

                gsap.set(visual, {
                    clipPath: "inset(0 0 100% 0)",
                });


                gsap.set(frame, {
                    y: 24,
                });


                gsap.set(image, {
                    scale: 1.045,
                });


                /*
                 * --------------------------------------------------------------
                 * PROJECT OBSERVER
                 * --------------------------------------------------------------
                 */

                const observer =
                    new IntersectionObserver(
                        ([entry]) => {

                            if (!entry.isIntersecting) {
                                return;
                            }


                            const timeline =
                                gsap.timeline({
                                    defaults: {
                                        ease: "power3.out",
                                    },
                                });


                            timeline
                                .to(
                                    meta,
                                    {
                                        autoAlpha: 1,
                                        y: 0,

                                        duration: 0.4,
                                    }
                                )

                                .to(
                                    line,
                                    {
                                        scaleX: 1,

                                        duration: 0.65,

                                        ease: "power4.inOut",
                                    },
                                    "-=0.2"
                                )

                                .to(
                                    visual,
                                    {
                                        clipPath: "inset(0 0 0% 0)",

                                        duration: 0.8,

                                        ease: "power4.inOut",

                                        clearProps: "clipPath",
                                    },
                                    "-=0.3"
                                )

                                .to(
                                    frame,
                                    {
                                        y: 0,

                                        duration: 0.7,

                                        ease: "power4.out",

                                        clearProps: "transform",
                                    },
                                    "<0.08"
                                )

                                .to(
                                    image,
                                    {
                                        scale: 1,

                                        duration: 1,

                                        ease: "power3.out",

                                        clearProps: "transform",
                                    },
                                    "<"
                                )

                                .to(
                                    title,
                                    {
                                        clipPath: "inset(0 0% 0 0)",

                                        duration: 0.65,

                                        ease: "power4.out",

                                        clearProps: "clipPath",
                                    },
                                    "-=0.55"
                                )

                                .to(
                                    description,
                                    {
                                        autoAlpha: 1,
                                        y: 0,

                                        duration: 0.45,
                                    },
                                    "-=0.35"
                                )

                                .to(
                                    highlights,
                                    {
                                        autoAlpha: 1,
                                        x: 0,

                                        duration: 0.35,
                                        stagger: 0.06,
                                    },
                                    "-=0.25"
                                )

                                .to(
                                    technologies,
                                    {
                                        autoAlpha: 1,
                                        y: 0,

                                        duration: 0.3,
                                        stagger: 0.04,

                                        clearProps:
                                            "transform,opacity,visibility",
                                    },
                                    "-=0.18"
                                )

                                .to(
                                    action,
                                    {
                                        autoAlpha: 1,
                                        y: 0,

                                        duration: 0.35,

                                        clearProps:
                                            "transform,opacity,visibility",
                                    },
                                    "-=0.15"
                                );


                            observer.disconnect();
                        },
                        {
                            threshold: 0.16,
                        }
                    );


                observer.observe(project);

                projectObservers.push(observer);

            });

        }, section);


        /*
         * ==================================================================
         * CLEANUP
         * ==================================================================
         *
         * React effect cleanup:
         * - disconnect native observers
         * - revert all GSAP animations created inside this context
         */

        return () => {

            headerObserver?.disconnect();


            projectObservers.forEach(
                (observer) => {
                    observer.disconnect();
                }
            );


            context.revert();
        };

    }, []);


    return (
        <section
            className="frontend-showcase"
            id="frontend-showcase"
            ref={sectionRef}
            aria-labelledby="frontend-showcase-title"
        >

            <div className="frontend-showcase__container container">

                {/*
                 * ==========================================================
                 * SECTION META
                 * ==========================================================
                 */}

                <div className="frontend-showcase__section-meta">

                    <div className="frontend-showcase__section-meta-copy">

                        <span className="frontend-showcase__section-index text-mono">
                            07 /
                        </span>


                        <span className="frontend-showcase__section-label text-mono">
                            FRONTEND SHOWCASE
                        </span>

                    </div>


                    <span
                        className="frontend-showcase__section-line"
                        aria-hidden="true"
                    />

                </div>


                {/*
                 * ==========================================================
                 * HEADER
                 * ==========================================================
                 */}

                <header className="frontend-showcase__header">

                    <h2
                        className="frontend-showcase__title"
                        id="frontend-showcase-title"
                    >

                        <span className="frontend-showcase__title-line">

                            <span className="frontend-showcase__title-line-inner">
                                DESIGNED
                            </span>

                        </span>


                        <span className="frontend-showcase__title-line">

                            <span className="frontend-showcase__title-line-inner">

                                TO MOVE

                                <span className="frontend-showcase__title-mark">
                                    .
                                </span>

                            </span>

                        </span>

                    </h2>


                    <div className="frontend-showcase__introduction">

                        <span className="frontend-showcase__introduction-label text-mono">
                            05 FRONTEND EXPERIENCES
                        </span>


                        <p className="frontend-showcase__introduction-copy">
                            A collection of polished interfaces built to explore
                            responsive design, interaction, motion, and visual
                            systems beyond application functionality.
                        </p>

                    </div>

                </header>


                {/*
                 * ==========================================================
                 * SHOWCASE PROJECTS
                 * ==========================================================
                 */}

                <div className="frontend-showcase__projects">

                    {showcaseProjects.map((project) => (
                        <ShowcaseItem
                            project={project}
                            key={project.index}
                        />
                    ))}

                </div>

            </div>

        </section>
    );
}


export default FrontendShowcase;