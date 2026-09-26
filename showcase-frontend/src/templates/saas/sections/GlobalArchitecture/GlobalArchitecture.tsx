import {
    useEffect,
    useRef,
} from "react";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
    Boxes,
    Database,
    Globe2,
    Network,
    Server,
} from "lucide-react";

import "./GlobalArchitecture.css";

import globalNetworkMap from "../../assets/global-network-map.png";
/*
 * ScrollTrigger is a GSAP plugin rather than part of
 * GSAP's core animation API.
 *
 * Registering it tells GSAP that our timelines are allowed
 * to use ScrollTrigger configuration such as:
 *
 *   trigger
 *   start
 *   end
 *   scrub
 *   pin
 */
gsap.registerPlugin(ScrollTrigger);
/*
 * GlobalArchitecture
 *
 * This section will become the primary scroll-driven
 * visual experience of the SaaS template.
 *
 * IMPORTANT ARCHITECTURE DECISION:
 *
 * We are building the visual scene FIRST and adding GSAP
 * afterward.
 *
 * That keeps layout responsibilities in CSS and prevents
 * animation code from becoming responsible for positioning
 * the interface.
 *
 * Later:
 *
 * CSS  → defines where everything belongs.
 * GSAP → transforms those existing elements over time.
 */
function GlobalArchitecture() {
    /*
    * SECTION REF
    *
    * This gives GSAP access to the entire GlobalArchitecture
    * section.
    *
    * We use it for two purposes:
    *
    * 1. ScrollTrigger needs an element that determines when
    *    the scroll experience begins and ends.
    *
    * 2. gsap.context() uses the section as a scope so our
    *    selector strings only search inside this component.
    */
    const sectionRef = useRef<HTMLElement | null>(null);
    /*
    * SCENE REF
    *
    * The scene is the large bordered architecture viewport.
    *
    * ScrollTrigger will pin this element while the user
    * scrolls through the architecture sequence.
    *
    * The surrounding section continues to provide the scroll
    * distance while this scene remains visually fixed.
    */
    const sceneRef = useRef<HTMLDivElement | null>(null);



    useEffect(() => {
        /*
        * gsap.context() scopes selector-based animations to
        * sectionRef.
        *
        * Without this context:
        *
        *   ".global-architecture__node"
        *
        * means:
        *
        *   "find every matching element in the document."
        *
        * With this context it effectively means:
        *
        *   "find matching elements inside this particular
        *    GlobalArchitecture section."
        *
        * That keeps the animation isolated to this component.
        */
        const context = gsap.context(() => {
            /*
            * Respect the user's operating-system motion
            * preference.
            *
            * The static architecture already works without
            * animation, so users requesting reduced motion
            * receive that version instead of a pinned
            * scroll-driven sequence.
            */
            const reducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;
            if (reducedMotion) {
                return;
            }
            /*
            * TIMELINE
            *
            * This is the important connection to the pencil
            * prototype.
            *
            * Normally a GSAP timeline progresses according to
            * elapsed time.
            *
            * ScrollTrigger + scrub changes that relationship:
            *
            *     scroll position
            *           ↓
            *     timeline progress
            *           ↓
            *     visual state
            *
            * So these duration values primarily define the
            * RELATIVE amount of scroll space each animation
            * receives. They are not simply "seconds the user
            * must wait."
            */
            const timeline = gsap.timeline({
                scrollTrigger: {
                    /*
                    * The entire section determines when the
                    * scroll sequence begins.
                    */
                    trigger: sectionRef.current,
                    /*
                    * Start when the top of this section reaches
                    * the top of the viewport.
                    */
                    start: "22%",
                    /*
                    * Create a long scroll runway.
                    *
                    * +=4000 means the timeline progresses over
                    * approximately 4000px of additional scroll.
                    *
                    * We can tune this after experiencing the
                    * animation in the browser.
                    */
                    end: "+=8500",
                    /*
                    * Keep the architecture scene visible while
                    * the user moves through the timeline.
                    */
                    pin: sceneRef.current,
                    /*
                    * scrub links scroll position to timeline
                    * progress.
                    *
                    * A value of 1 adds a small amount of
                    * smoothing so the animation follows the
                    * scroll without feeling mechanically tied
                    * to every wheel movement.
                    */
                    scrub: 1,
                    /*
                    * Recalculate ScrollTrigger measurements
                    * when the viewport changes size.
                    *
                    * This matters because our architecture
                    * layout changes significantly at 64rem.
                    */
                    invalidateOnRefresh: true,
                },
            });
            /*
            * ------------------------------------------------
            * INITIAL STATE
            * ------------------------------------------------
            *
            * We define the starting visual state through GSAP
            * rather than permanently hiding these elements in
            * CSS.
            *
            * That is important because the page remains fully
            * usable if JavaScript or animation is unavailable.
            */
            timeline.set(
                [
                    ".global-architecture__node--application",
                    ".global-architecture__node--gateway",
                    ".global-architecture__node--database",
                    ".global-architecture__service",
                ],
                {
                    autoAlpha: 0,
                    y: 18,
                }
            );
            /*
            * ACTIVE SYSTEM INITIAL STATE
            *
            * These elements do not participate in the architecture
            * assembly.
            *
            * They remain hidden until the complete system has been
            * constructed.
            */
            timeline.set(
                [
                    ".global-architecture__health-dot",
                    ".global-architecture__health-label",
                    ".global-architecture__metric",
                ],
                {
                    autoAlpha: 0,
                }
            );
            timeline.set(
                ".global-architecture__metric",
                {
                    y: 12,
                }
            );
            timeline.set(
                ".global-architecture__traffic-pulse",
                {
                    autoAlpha: 0,
                }
            );
            timeline.set(
                ".global-architecture__connector",
                {
                    scaleX: 0,
                    scaleY: 0,
                }
            );
            timeline.set(
                ".global-architecture__regions",
                {
                    autoAlpha: 0,
                    y: 12,
                }
            );
            /*
            * GLOBAL NETWORK INITIAL STATE
            *
            * The SVG exists from the beginning, but the user should
            * not see it during the infrastructure explanation.
            *
            * GSAP owns this initial animation state so the static SVG
            * remains available if animation is disabled.
            */
            timeline.set(
                ".global-architecture__world",
                {
                    autoAlpha: 0,
                    scale: 0.88,
                }
            );
            timeline.set(
                ".global-architecture__world-region",
                {
                    autoAlpha: 0,
                    scale: 0.5,
                    transformOrigin: "center center",
                }
            );

            timeline.set(
                ".global-architecture__world-packet",
                {
                    autoAlpha: 0,
                }
            );
            /*
            * PREPARE GLOBAL ROUTES
            *
            * Each SVG path has its own physical length.
            *
            * We measure that actual SVG length and use it for both
            * the dash and its starting offset.
            *
            * The route therefore begins with its complete stroke
            * shifted outside the visible path.
            *
            * IMPORTANT:
            * \`vector-effect: non-scaling-stroke\` is intentionally NOT
            * used on these routes. It caused the dash measurements to
            * behave inconsistently as the SVG changed rendered size.
            */
            const routes =
                sectionRef.current?.querySelectorAll<SVGPathElement>(
                    ".global-architecture__route"
                );
            routes?.forEach((route) => {
                const routeLength = route.getTotalLength();
                gsap.set(route, {
                    strokeDasharray: routeLength,
                    strokeDashoffset: routeLength,
                });
            });


            /*
            * LIVE GLOBAL TRAFFIC
            *
            * This timeline is intentionally separate from the main
            * ScrollTrigger timeline.
            *
            * The main timeline explains how the infrastructure becomes a
            * global network.
            *
            * This timeline represents the network continuing to operate
            * after that transformation has completed.
            */
            const trafficTimeline = gsap.timeline({
                paused: true,
                repeat: -1,
            });

            /*
            * REGION PULSE
            *
            * This animation is separate from the scroll-driven timeline.
            * It provides subtle continuous activity once the global
            * deployment regions have appeared.
            */
            const regionPulseTimeline = gsap.timeline({
                paused: true,
                repeat: -1,
                yoyo: true,
            });

            regionPulseTimeline.to(
                ".global-architecture__world-region-ring",
                {
                    scale: 1.4,
                    opacity: 0.8,
                    duration: 1.2,
                    ease: "sine.inOut",
                    transformOrigin: "center center",
                }
            );

            /*
            * Find all of the packet circles we added to the SVG.
            */
            const packets =
                sectionRef.current?.querySelectorAll<SVGCircleElement>(
                    ".global-architecture__world-packet"
                );

            /*
            * Give each packet its own movement along its corresponding
            * SVG route.
            */
            packets?.forEach((packet, index) => {
                /*
                * Each packet's data-route attribute contains the ID of
                * the SVG path that the packet should follow.
                */
                const routeId = packet.dataset.route;

                if (!routeId) {
                    return;
                }

                const route =
                    sectionRef.current?.querySelector<SVGPathElement>(
                        `#${routeId}`
                    );

                if (!route) {
                    return;
                }

                const routeLength = route.getTotalLength();

                /*
                * GSAP animates this value from 0 to 1.
                *
                * We then convert that progress into an exact point
                * along the SVG route.
                */
                const traffic = {
                    progress: 0,
                };

                trafficTimeline.to(
                    traffic,
                    {
                        progress: 1,
                        duration: 2.8,
                        ease: "none",

                        onUpdate: () => {
                            const point = route.getPointAtLength(
                                routeLength * traffic.progress
                            );

                            packet.setAttribute("cx", String(point.x));
                            packet.setAttribute("cy", String(point.y));
                        },
                    },

                    /*
                    * Stagger the starting position of each packet so all
                    * five routes do not begin moving simultaneously.
                    */
                    index * 0.35
                );
            });


            /*
            * Starts the ambient network traffic.
            *
            * restart() is used instead of play() so every time the user
            * reaches the completed-network state, traffic begins from a
            * predictable starting point.
            */
            const startTraffic = () => {
                trafficTimeline.restart();
                regionPulseTimeline.restart();
            };

            /*
            * Stops the ambient traffic and returns every packet to the
            * beginning of its route.
            *
            * pause(0) moves the repeating timeline back to time 0 without
            * allowing it to continue playing.
            */
            const stopTraffic = () => {
                trafficTimeline.pause(0);
                regionPulseTimeline.pause(0);
            };




            /*
            * ------------------------------------------------
            * 01 — APPLICATION
            * ------------------------------------------------
            *
            * The application is the developer's starting
            * point, so it enters first.
            */
            timeline.to(
                ".global-architecture__node--application",
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power2.out",
                }
            );
            /*
            * ------------------------------------------------
            * 02 — APPLICATION → GATEWAY
            * ------------------------------------------------
            *
            * Connectors are animated independently from their
            * destination nodes so the viewer can visually
            * follow infrastructure being assembled.
            */
            timeline.to(
                ".global-architecture__connector--application",
                {
                    scaleX: 1,
                    scaleY: 1,
                    duration: 0.45,
                    ease: "power1.inOut",
                }
            );
            timeline.to(
                ".global-architecture__node--gateway",
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.65,
                    ease: "power2.out",
                }
            );
            /*
            * ------------------------------------------------
            * 03 — GATEWAY → COMPUTE
            * ------------------------------------------------
            */
            timeline.to(
                ".global-architecture__connector--gateway",
                {
                    scaleX: 1,
                    scaleY: 1,
                    duration: 0.45,
                    ease: "power1.inOut",
                }
            );
            /*
            * \`stagger\` means GSAP does not start every service
            * animation simultaneously.
            *
            * Instead:
            *
            *   api-01
            *      ↓
            *   api-02
            *      ↓
            *   worker-01
            *
            * This makes the compute layer feel like instances
            * are actually being provisioned.
            */
            timeline.to(
                ".global-architecture__service",
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.55,
                    stagger: 0.18,
                    ease: "power2.out",
                }
            );
            /*
            * ------------------------------------------------
            * 04 — COMPUTE → DATABASE
            * ------------------------------------------------
            */
            timeline.to(
                ".global-architecture__connector--database",
                {
                    scaleX: 1,
                    scaleY: 1,
                    duration: 0.45,
                    ease: "power1.inOut",
                }
            );
            timeline.to(
                ".global-architecture__node--database",
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.65,
                    ease: "power2.out",
                }
            );
            /*
            * ------------------------------------------------
            * 05 — DEPLOYMENT NETWORK
            * ------------------------------------------------
            *
            * The final Phase 2 beat introduces the idea that
            * this local architecture belongs to a larger
            * deployment network.
            *
            * In the next phase this region layer becomes the
            * bridge into the global transformation.
            */
            timeline.to(
                ".global-architecture__regions",
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                }
            );
            /*
            * ------------------------------------------------
            * 06 — SYSTEM BECOMES OPERATIONAL
            * ------------------------------------------------
            *
            * The architecture is now fully assembled.
            *
            * We change the visual language from:
            *
            *   infrastructure diagram
            *
            * to:
            *
            *   running production system
            */
            timeline.to(
                [
                    ".global-architecture__health-dot",
                    ".global-architecture__health-label",
                ],
                {
                    autoAlpha: 1,
                    duration: 0.45,
                    ease: "power2.out",
                }
            );
            /*
            * ------------------------------------------------
            * 07 — LIVE METRICS
            * ------------------------------------------------
            *
            * Metrics enter with a small stagger so the viewer can
            * read the operational state from left to right.
            */
            timeline.to(
                ".global-architecture__metric",
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.12,
                    ease: "power2.out",
                }
            );
            /*
            * ------------------------------------------------
            * 08 — TRAFFIC ACTIVATES
            * ------------------------------------------------
            *
            * First reveal the traffic indicators.
            *
            * Their movement is added separately because the movement
            * direction depends on the responsive architecture.
            */
            timeline.to(
                ".global-architecture__traffic-pulse",
                {
                    autoAlpha: 1,
                    duration: 0.35,
                }
            );
            /*
            * ------------------------------------------------
            * 09 — TRAFFIC MOVEMENT
            * ------------------------------------------------
            *
            * Our responsive CSS changes the architecture direction
            * at 64rem.
            *
            * Rather than hardcoding pixel distances, GSAP moves each
            * pulse by 100% of its connector's usable dimension.
            *
            * On narrow layouts:
            *   traffic moves top → bottom
            *
            * On 64rem+ layouts:
            *   traffic moves left → right
            */
            const largeLayout = window.matchMedia(
                "(min-width: 64rem)"
            ).matches;
            if (largeLayout) {
                timeline.to(
                    ".global-architecture__traffic-pulse",
                    {
                        left: "100%",
                        duration: 1,
                        ease: "none",
                    }
                );
            } else {
                timeline.to(
                    ".global-architecture__traffic-pulse",
                    {
                        top: "100%",
                        duration: 1,
                        ease: "none",
                    }
                );
            }
            /*
            * ------------------------------------------------
            * 10 — HOLD THE ACTIVE SYSTEM
            * ------------------------------------------------
            *
            * This intentionally changes nothing visually.
            *
            * An empty timeline position gives the completed system
            * some scroll space before we begin dismantling the UI.
            *
            * Without this pause, the viewer would see the traffic
            * complete and immediately watch the architecture break
            * apart.
            */
            timeline.to(
                {},
                {
                    duration: 0.6,
                }
            );
            /*
            * ------------------------------------------------
            * 11 — REMOVE OPERATIONAL UI
            * ------------------------------------------------
            *
            * Metrics and global-region metadata belong to the
            * infrastructure-dashboard representation.
            *
            * They are not part of the underlying architecture that
            * we want to carry into the global transformation.
            */
            timeline.to(
                [
                    ".global-architecture__metrics",
                    ".global-architecture__regions",
                ],
                {
                    autoAlpha: 0,
                    y: 12,
                    duration: 0.7,
                    ease: "power2.inOut",
                }
            );
            /*
            * ------------------------------------------------
            * 12 — REMOVE WORKSPACE METADATA
            * ------------------------------------------------
            *
            * The top Architecture / System Healthy / region bar now
            * disappears.
            *
            * At this point we are intentionally moving away from the
            * visual language of a software dashboard.
            */
            timeline.to(
                ".global-architecture__scene-label",
                {
                    autoAlpha: 0,
                    y: -10,
                    duration: 0.55,
                    ease: "power2.inOut",
                },
                "<0.15"
            );
            /*
            * ------------------------------------------------
            * 13 — FADE CONNECTIONS
            * ------------------------------------------------
            *
            * The rigid architecture relationships disappear before
            * the nodes move.
            *
            * This is important visually:
            *
            * if the nodes moved while the original connectors
            * remained visible, the diagram would look broken rather
            * than intentionally transforming.
            */
            timeline.to(
                ".global-architecture__connector",
                {
                    autoAlpha: 0,
                    duration: 0.5,
                    ease: "power1.inOut",
                }
            );
            /*
            * ------------------------------------------------
            * 14 — SIMPLIFY THE SURVIVING NODES
            * ------------------------------------------------
            *
            * We reduce the visual weight of the infrastructure cards
            * before moving them.
            *
            * The elements still contain their original information,
            * but borders and backgrounds become much quieter.
            *
            * This is the first visual step from:
            *
            *   product interface
            *
            * toward:
            *
            *   abstract infrastructure visualization
            */
            timeline.to(
                ".global-architecture__transform-node",
                {
                    borderColor: "rgba(148, 163, 184, 0)",
                    backgroundColor: "rgba(12, 18, 28, 0)",
                    duration: 0.7,
                    ease: "power2.inOut",
                }
            );
            /*
            * ------------------------------------------------
            * 15 — REDUCE NODES TO THEIR VISUAL CORE
            * ------------------------------------------------
            *
            * Labels are useful while explaining the architecture.
            *
            * They become visual noise once the same objects begin
            * transforming into global deployment nodes.
            *
            * We therefore keep the icons but remove most textual
            * metadata.
            */
            timeline.to(
                [
                    ".global-architecture__node-content",
                    ".global-architecture__service-content",
                ],
                {
                    autoAlpha: 0,
                    duration: 0.55,
                    ease: "power2.inOut",
                }
            );
            /*
            * The first compute service becomes the single visual
            * representative of the compute layer.
            *
            * We remove the card styling and padding from that SAME
            * element before it moves. Because the parent service card
            * is now the GSAP transformation target, the Server icon and
            * its transparent wrapper travel together instead of leaving
            * an empty gray rectangle behind.
            */
            timeline.to(
                ".global-architecture__compute-transform-node",
                {
                    padding: 0,
                    borderColor: "rgba(148, 163, 184, 0)",
                    backgroundColor: "rgba(16, 24, 36, 0)",
                    duration: 0.55,
                    ease: "power2.inOut",
                },
                "<"
            );
            /*
            * ------------------------------------------------
            * 16 — COLLAPSE COMPUTE INSTANCES
            * ------------------------------------------------
            *
            * Three compute instances represented a running service
            * during the infrastructure explanation.
            *
            * For the global transformation they become one logical
            * compute location.
            *
            * The first service remains the primary visual anchor.
            * The other two move toward it and fade away.
            */
            timeline.to(
                [
                    ".global-architecture__service:nth-child(2)",
                    ".global-architecture__service:nth-child(3)",
                ],
                {
                    autoAlpha: 0,
                    scale: 0.7,
                    duration: 0.55,
                    ease: "power2.in",
                }
            );
            /*
            * ------------------------------------------------
            * 17 — ARCHITECTURE SEPARATION
            * ------------------------------------------------
            *
            * The rigid left-to-right infrastructure sequence now
            * breaks apart.
            *
            * These positions are intentionally asymmetric.
            *
            * Symmetrical movement would still feel like a diagram.
            * Different X/Y offsets make the objects begin reading as
            * independent locations in a larger spatial system.
            *
            * We use percentage-based viewport-relative movement so
            * the separation scales better than fixed pixel values.
            */
            if (largeLayout) {
                timeline.to(
                    ".global-architecture__node--application",
                    {
                        x: "-8vw",
                        y: "-5rem",
                        scale: 0.85,
                        duration: 1.2,
                        ease: "power2.inOut",
                    }
                );
                timeline.to(
                    ".global-architecture__node--gateway",
                    {
                        x: "-3vw",
                        y: "7rem",
                        scale: 0.8,
                        duration: 1.2,
                        ease: "power2.inOut",
                    },
                    "<"
                );
                timeline.to(
                    ".global-architecture__compute-transform-node",
                    {
                        x: "5vw",
                        y: "-7rem",
                        scale: 0.8,
                        duration: 1.2,
                        ease: "power2.inOut",
                    },
                    "<"
                );
                timeline.to(
                    ".global-architecture__node--database",
                    {
                        x: "9vw",
                        y: "6rem",
                        scale: 0.85,
                        duration: 1.2,
                        ease: "power2.inOut",
                    },
                    "<"
                );
            } else {
                /*
                * Narrow layouts receive a smaller transformation.
                *
                * The purpose is still to break the rigid vertical
                * architecture apart, but we avoid pushing elements
                * toward the viewport edges where space is limited.
                */
                timeline.to(
                    ".global-architecture__node--application",
                    {
                        x: "-8%",
                        y: "-1rem",
                        scale: 0.9,
                        duration: 1.2,
                        ease: "power2.inOut",
                    }
                );
                timeline.to(
                    ".global-architecture__node--gateway",
                    {
                        x: "8%",
                        y: "1rem",
                        scale: 0.9,
                        duration: 1.2,
                        ease: "power2.inOut",
                    },
                    "<"
                );
                timeline.to(
                    ".global-architecture__compute-transform-node",
                    {
                        x: "-6vw",
                        y: "-2rem",
                        scale: 1.25,
                        duration: 1.2,
                        ease: "power2.inOut",
                    },
                    "<"
                );
                timeline.to(
                    ".global-architecture__node--database",
                    {
                        x: "6%",
                        y: "1rem",
                        scale: 0.9,
                        duration: 1.2,
                        ease: "power2.inOut",
                    },
                    "<"
                );
            }
            /*
            * ------------------------------------------------
            * 18 — GLOBAL CONTEXT EMERGES
            * ------------------------------------------------
            *
            * The separated infrastructure nodes now exist in open
            * space.
            *
            * Instead of replacing them with a completely unrelated
            * visual, the geographic layer emerges underneath them.
            *
            * This creates the impression that we are pulling away
            * from one infrastructure deployment and discovering the
            * larger global system around it.
            */
            timeline.to(
                ".global-architecture__world",
                {
                    autoAlpha: 1,
                    scale: 1,
                    duration: 1.3,
                    ease: "power2.inOut",
                }
            );
            /*
            * ------------------------------------------------
            * 19 — DEPLOYMENT REGIONS APPEAR
            * ------------------------------------------------
            *
            * Regions appear sequentially instead of simultaneously.
            *
            * The stagger gives the impression that the deployment
            * network is expanding outward across locations.
            */
            timeline.to(
                ".global-architecture__world-region",
                {
                    autoAlpha: 1,
                    scale: 1,
                    duration: 0.65,
                    stagger: 0.15,
                    ease: "back.out(1.7)",
                }
            );
            /*
            * ------------------------------------------------
            * 20 — GLOBAL ROUTES DRAW
            * ------------------------------------------------
            *
            * Each route's dash offset starts at its complete physical
            * length and moves toward zero.
            *
            * Because ScrollTrigger scrubs this timeline, the routes
            * physically draw as the user scrolls and retract when the
            * user scrolls backward.
            */
            if (routes) {
                timeline.to(
                    routes,
                    {
                        strokeDashoffset: 0,
                        duration: 2,
                        stagger: 0.25,
                        ease: "none",
                    }
                );
            }

            /*
            * ------------------------------------------------
            * GLOBAL NETWORK BECOMES LIVE
            * ------------------------------------------------
            *
            * The scroll-driven route construction is now complete.
            *
            * When scrolling forward into this phase, the packets become
            * visible and the independent traffic loop starts from the
            * beginning.
            *
            * When scrolling backward out of this phase, the traffic loop
            * stops and resets. The main timeline then handles fading the
            * packets back out as it reverses.
            */
            timeline.to(
                ".global-architecture__world-packet",
                {
                    autoAlpha: 1,
                    duration: 0.3,

                    onStart: () => {
                        startTraffic();
                    },

                    onReverseComplete: () => {
                        stopTraffic();
                    },
                }
            );

            /*
            * ------------------------------------------------
            * 21 — LOCAL ARCHITECTURE RETIRES
            * ------------------------------------------------
            *
            * The global visualization is now capable of carrying the
            * story on its own.
            *
            * The original architecture nodes therefore fade away.
            *
            * Notice that they are removed AFTER the global network
            * exists. This overlap is what makes the transition feel
            * like one visualization transforming into another rather
            * than two unrelated scenes cross-fading.
            */
            timeline.to(
                [
                    ".global-architecture__transform-node",
                    ".global-architecture__compute-transform-node",
                ],
                {
                    autoAlpha: 0,
                    scale: 0.65,
                    duration: 0.8,
                    ease: "power2.in",
                }
            );
        }, sectionRef);
        /*
        * COMPONENT CLEANUP
        *
        * React calls this when GlobalArchitecture unmounts.
        *
        * context.revert() removes the animations created
        * inside this GSAP context and restores the affected
        * elements.
        *
        * This is particularly important for ScrollTrigger
        * because it creates scroll listeners, pinning
        * behavior, and calculated layout measurements.
        */
        return () => {
            context.revert();
        };
    }, []);




    return (
        <section
            ref={sectionRef}
            className="global-architecture"
            aria-labelledby="global-architecture-title"
        >
            <div className="global-architecture__container saas-container saas-container--wide">
                <header className="global-architecture__header">
                    <span className="global-architecture__eyebrow">
                        Global infrastructure
                    </span>
                    <h2
                        className="global-architecture__title"
                        id="global-architecture-title"
                    >
                        One architecture.
                        <br />
                        Every region.
                    </h2>
                    <p className="global-architecture__description">
                        Deploy the same application architecture across
                        regions without rebuilding the infrastructure
                        underneath it.
                    </p>
                </header>
                {/*
                 * SCENE
                 *
                 * This wrapper will eventually become the pinned
                 * ScrollTrigger viewport.
                 *
                 * For now it behaves like a normal static section.
                 *
                 * The individual nodes receive descriptive classes
                 * because GSAP will later need reliable references to
                 * specific parts of the architecture.
                 */}
                <div
                    ref={sceneRef}
                    className="global-architecture__scene"
                >
                    <div className="global-architecture__scene-label">
                        <div className="global-architecture__scene-status">
                            <span className="global-architecture__health-dot" />
                            <span className="global-architecture__health-label">
                                System healthy
                            </span>
                        </div>
                        <span className="global-architecture__scene-region">
                            us-west-2
                        </span>
                    </div>
                    <div className="global-architecture__diagram">
                        {/* Application entry point */}
                        <div className="global-architecture__node global-architecture__node--application global-architecture__transform-node">
                            <div className="global-architecture__node-icon">
                                <Boxes
                                    size={18}
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="global-architecture__node-content">
                                <span className="global-architecture__node-type">
                                    Application
                                </span>
                                <strong className="global-architecture__node-name">
                                    production-api
                                </strong>
                            </div>
                        </div>
                        <span
                            className="global-architecture__connector global-architecture__connector--application"
                            aria-hidden="true"
                        >
                            <span className="global-architecture__traffic-pulse" />
                        </span>
                        {/* Public networking layer */}
                        <div className="global-architecture__node global-architecture__node--gateway global-architecture__transform-node">
                            <div className="global-architecture__node-icon">
                                <Network
                                    size={18}
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="global-architecture__node-content">
                                <span className="global-architecture__node-type">
                                    Gateway
                                </span>
                                <strong className="global-architecture__node-name">
                                    edge-router
                                </strong>
                            </div>
                        </div>
                        <span
                            className="global-architecture__connector global-architecture__connector--gateway"
                            aria-hidden="true"
                        >
                            <span className="global-architecture__traffic-pulse" />
                        </span>
                        {/* Compute layer */}
                        <div className="global-architecture__services">
                            <div className="global-architecture__service global-architecture__compute-transform-node">
                                <Server
                                    className="global-architecture__service-icon"
                                    size={16}
                                />
                                <div className="global-architecture__service-content">
                                    <strong className="global-architecture__service-name">
                                        api-01
                                    </strong>
                                    <span className="global-architecture__service-status">
                                        Healthy
                                    </span>
                                </div>
                            </div>
                            <div className="global-architecture__service">
                                <Server
                                    className="global-architecture__service-icon"
                                    size={16}
                                    aria-hidden="true"
                                />
                                <div className="global-architecture__service-content">
                                    <strong className="global-architecture__service-name">
                                        api-02
                                    </strong>
                                    <span className="global-architecture__service-status">
                                        Healthy
                                    </span>
                                </div>
                            </div>
                            <div className="global-architecture__service">
                                <Server
                                    className="global-architecture__service-icon"
                                    size={16}
                                    aria-hidden="true"
                                />
                                <div className="global-architecture__service-content">
                                    <strong className="global-architecture__service-name">
                                        worker-01
                                    </strong>
                                    <span className="global-architecture__service-status">
                                        Healthy
                                    </span>
                                </div>
                            </div>
                        </div>
                        <span
                            className="global-architecture__connector global-architecture__connector--database"
                            aria-hidden="true"
                        >
                            <span className="global-architecture__traffic-pulse" />
                        </span>
                        {/* Persistence layer */}
                        <div className="global-architecture__node global-architecture__node--database global-architecture__transform-node">
                            <div className="global-architecture__node-icon">
                                <Database
                                    size={18}
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="global-architecture__node-content">
                                <span className="global-architecture__node-type">
                                    Database
                                </span>
                                <strong className="global-architecture__node-name">
                                    postgres-primary
                                </strong>
                            </div>
                        </div>
                    </div>
                    {/*
                    * GLOBAL NETWORK LAYER
                    *
                    * This SVG is present in the scene from the beginning but
                    * GSAP keeps it invisible until the local architecture has
                    * separated.
                    *
                    * Why SVG?
                    *
                    * 1. The world outline can scale with the scene.
                    * 2. Routes are real SVG paths that GSAP can animate.
                    * 3. Region positions use the SVG coordinate system rather
                    *    than hardcoded browser pixel positions.
                    * 4. The entire visualization remains understandable DOM
                    *    rather than immediately introducing a 3D renderer.
                    *
                    * The viewBox creates an internal coordinate system:
                    *
                    *      0,0 ------------------------ 1000,0
                    *       |                              |
                    *       |                              |
                    *       |                              |
                    *      0,500 --------------------- 1000,500
                    *
                    * Those coordinates scale automatically with the SVG.
                    */}
                    <div
                        className="global-architecture__world"
                        aria-hidden="true"
                    >
                        <svg
                            className="global-architecture__world-svg"
                            viewBox="0 0 1000 500"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            
                            {/*
                            * WORLD MAP BACKGROUND
                            *
                            * Geography is now supplied by a detailed raster image instead
                            * of manually maintained SVG landmass paths.
                            *
                            * IMPORTANT:
                            * The image lives INSIDE the existing 1000 × 500 SVG coordinate
                            * system. That means our deployment regions and animated SVG
                            * routes can continue using their existing coordinates.
                            *
                            * We are only changing how the geography is rendered.
                            * GSAP still controls the surrounding `.global-architecture__world`
                            * layer exactly as before.
                            */}
                            <image
                                className="global-architecture__world-map-image"
                                href={globalNetworkMap}
                                x="0"
                                y="0"
                                width="1000"
                                height="500"
                                preserveAspectRatio="xMidYMid slice"
                            />

                            {/*
                            * GLOBAL ROUTES
                            *
                            * Each route connects two deployment regions.
                            *
                            * The paths are curved rather than straight so
                            * they read as network routes spanning a globe.
                            *
                            * GSAP will animate their strokeDashoffset to make
                            * the routes appear to draw themselves.
                            */}
                            {/* Oregon → Virginia */}
                            <path
                                id="global-route-oregon-virginia"
                                className="global-architecture__route"
                                d="M 125 185 Q 235 140 250 195"
                            />
                            {/* Virginia → Frankfurt */}
                            <path
                                id="global-route-virginia-frankfurt"
                                className="global-architecture__route"
                                d="M 250 195 Q 430 105 500 165"
                            />
                            {/* Frankfurt → Singapore */}
                            <path
                                id="global-route-frankfurt-singapore"
                                className="global-architecture__route"
                                d="M 500 165 Q 675 170 755 310"
                            />
                            {/* Singapore → Tokyo */}
                            <path
                                id="global-route-singapore-tokyo"
                                className="global-architecture__route"
                                d="M 755 310 Q 800 210 860 210"
                            />
                            {/* Oregon → Tokyo */}
                            <path
                                id="global-route-oregon-tokyo"
                                className="global-architecture__route"
                                d="M 125 185 Q 495 35 860 210"
                            />

                            

                            {/*
                            * LIVE NETWORK TRAFFIC
                            *
                            * Each circle represents a small packet moving through the
                            * completed global network.
                            *
                            * GSAP does not calculate a separate curve for these packets.
                            * Instead, JavaScript reads the corresponding SVG route with
                            * getPointAtLength() and places the packet directly on that path.
                            *
                            * Because of that, changing a route's `d` value later will also
                            * automatically change the path followed by its packet.
                            */}
                            <g className="global-architecture__traffic-packets">
                                <circle
                                    className="global-architecture__world-packet"
                                    data-route="global-route-oregon-virginia"
                                    r="3"
                                />

                                <circle
                                    className="global-architecture__world-packet"
                                    data-route="global-route-virginia-frankfurt"
                                    r="3"
                                />

                                <circle
                                    className="global-architecture__world-packet"
                                    data-route="global-route-frankfurt-singapore"
                                    r="3"
                                />

                                <circle
                                    className="global-architecture__world-packet"
                                    data-route="global-route-singapore-tokyo"
                                    r="3"
                                />

                                <circle
                                    className="global-architecture__world-packet"
                                    data-route="global-route-oregon-tokyo"
                                    r="3"
                                />
                            </g>



                            {/* ========================================
                                Deployment Regions
                                ======================================== */}
                            <g className="global-architecture__world-region global-architecture__world-region--oregon">
                                <circle
                                    className="global-architecture__world-region-ring"
                                    cx="125"
                                    cy="185"
                                    r="11"
                                />
                                <circle
                                    className="global-architecture__world-region-dot"
                                    cx="125"
                                    cy="185"
                                    r="4"
                                />
                                <text
                                    className="global-architecture__world-region-name"
                                    x="125"
                                    y="163"
                                    textAnchor="middle"
                                >
                                    Oregon
                                </text>
                            </g>
                            <g className="global-architecture__world-region global-architecture__world-region--virginia">
                                <circle
                                    className="global-architecture__world-region-ring"
                                    cx="250"
                                    cy="195"
                                    r="11"
                                />
                                <circle
                                    className="global-architecture__world-region-dot"
                                    cx="250"
                                    cy="195"
                                    r="4"
                                />
                                <text
                                    className="global-architecture__world-region-name"
                                    x="250"
                                    y="173"
                                    textAnchor="middle"
                                >
                                    Virginia
                                </text>
                            </g>
                            <g className="global-architecture__world-region global-architecture__world-region--frankfurt">
                                <circle
                                    className="global-architecture__world-region-ring"
                                    cx="500"
                                    cy="165"
                                    r="11"
                                />
                                <circle
                                    className="global-architecture__world-region-dot"
                                    cx="500"
                                    cy="165"
                                    r="4"
                                />
                                <text
                                    className="global-architecture__world-region-name"
                                    x="500"
                                    y="138"
                                    textAnchor="middle"
                                >
                                    Frankfurt
                                </text>
                            </g>
                            <g className="global-architecture__world-region global-architecture__world-region--singapore">
                                <circle
                                    className="global-architecture__world-region-ring"
                                    cx="755"
                                    cy="310"
                                    r="11"
                                />
                                <circle
                                    className="global-architecture__world-region-dot"
                                    cx="755"
                                    cy="310"
                                    r="4"
                                />
                                <text
                                    className="global-architecture__world-region-name"
                                    x="755"
                                    y="342"
                                    textAnchor="middle"
                                >
                                    Singapore
                                </text>
                            </g>
                            <g className="global-architecture__world-region global-architecture__world-region--tokyo">
                                <circle
                                    className="global-architecture__world-region-ring"
                                    cx="860"
                                    cy="210"
                                    r="11"
                                />
                                <circle
                                    className="global-architecture__world-region-dot"
                                    cx="860"
                                    cy="210"
                                    r="4"
                                />
                                <text
                                    className="global-architecture__world-region-name"
                                    x="860"
                                    y="188"
                                    textAnchor="middle"
                                >
                                    Tokyo
                                </text>
                            </g>
                        </svg>
                    </div>
                    {/*
                    * ACTIVE SYSTEM METRICS
                    *
                    * These metrics remain hidden during the initial
                    * architecture assembly.
                    *
                    * Once the complete architecture exists, GSAP reveals
                    * them to communicate that the diagram represents a
                    * running production system rather than a static
                    * infrastructure drawing.
                    *
                    * These values are fictional product-demo data.
                    */}
                    <div className="global-architecture__metrics">
                        <div className="global-architecture__metric">
                            <span className="global-architecture__metric-label">
                                Requests
                            </span>
                            <strong className="global-architecture__metric-value">
                                28.4k
                            </strong>
                            <span className="global-architecture__metric-unit">
                                / min
                            </span>
                        </div>
                        <div className="global-architecture__metric">
                            <span className="global-architecture__metric-label">
                                CPU
                            </span>
                            <strong className="global-architecture__metric-value">
                                42%
                            </strong>
                            <span className="global-architecture__metric-unit">
                                avg
                            </span>
                        </div>
                        <div className="global-architecture__metric">
                            <span className="global-architecture__metric-label">
                                Latency
                            </span>
                            <strong className="global-architecture__metric-value">
                                118ms
                            </strong>
                            <span className="global-architecture__metric-unit">
                                p95
                            </span>
                        </div>
                        <div className="global-architecture__metric">
                            <span className="global-architecture__metric-label">
                                Availability
                            </span>
                            <strong className="global-architecture__metric-value">
                                99.99%
                            </strong>
                            <span className="global-architecture__metric-unit">
                                healthy
                            </span>
                        </div>
                    </div>
                    {/*
                     * This region layer is deliberately present in the
                     * DOM from the beginning even though it is visually
                     * secondary right now.
                     *
                     * Later GSAP phases will transition emphasis away
                     * from the local architecture and toward these
                     * global deployment regions.
                     *
                     * Keeping the elements in the DOM from the start
                     * means GSAP can animate existing elements rather
                     * than React repeatedly mounting/unmounting them
                     * during scroll.
                     */}
                    <div className="global-architecture__regions">
                        <Globe2
                            className="global-architecture__regions-icon"
                            size={16}
                            aria-hidden="true"
                        />
                        <span className="global-architecture__regions-label">
                            Deployment network
                        </span>
                        <div className="global-architecture__region-list">
                            <span className="global-architecture__region">
                                Oregon
                            </span>
                            <span className="global-architecture__region">
                                Frankfurt
                            </span>
                            <span className="global-architecture__region">
                                Singapore
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default GlobalArchitecture;
