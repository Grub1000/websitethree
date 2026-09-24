import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./PencilJourney.css";

gsap.registerPlugin(ScrollTrigger);

const stores = [
  { x: 120, y: 155 },
  { x: 170, y: 115 },
  { x: 220, y: 205 },
  { x: 310, y: 165 },
  { x: 390, y: 215 },
  { x: 470, y: 145 },
  { x: 550, y: 190 },
  { x: 620, y: 130 },
  { x: 660, y: 170 },
  { x: 600, y: 235 },
];

export default function PencilJourney() {
  const section = useRef<HTMLDivElement>(null);
  const pencil = useRef<SVGGElement>(null);
  const map = useRef<SVGGElement>(null);
  const revenue = useRef<HTMLDivElement>(null);
  const revenueValue = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const markers = gsap.utils.toArray<SVGCircleElement>(".store-marker");

      gsap.set(map.current, {
        opacity: 0,
        scale: 0.7,
        transformOrigin: "center",
      });

      gsap.set(markers, {
        opacity: 0,
        scale: 0,
        transformOrigin: "center",
      });

      gsap.set(revenue.current, {
        opacity: 0,
        y: 40,
      });

      const revenueCounter = { value: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "+=4000",
          scrub: 1,
          pin: true,
          markers: true,
        },
      });

      // 1. Pencil comes alive
      tl.fromTo(
        ".pencil-body",
        {
          fill: "transparent",
        },
        {
          fill: "#f4c430",
          duration: 1,
        }
      )
        .fromTo(
          ".eraser",
          { fill: "transparent" },
          { fill: "#e9899d", duration: 0.5 },
          "<"
        )
        .fromTo(
          ".metal",
          { fill: "transparent" },
          { fill: "#bfc5cc", duration: 0.5 },
          "<"
        )

        // 2. Rotate / flip pencil
        .to(pencil.current, {
          rotation: 180,
          scale: 1.25,
          transformOrigin: "center",
          duration: 1,
          ease: "power2.inOut",
        })

        // 3. Pencil disappears
        .to(pencil.current, {
          scale: 0.15,
          opacity: 0,
          rotation: 360,
          duration: 1,
          ease: "power3.in",
        })

        // 4. US map emerges
        .to(
          map.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.4"
        )

        // 5. Store locations appear
        .to(markers, {
          opacity: 1,
          scale: 1,
          duration: 0.15,
          stagger: 0.12,
          ease: "back.out(2)",
        })

        // 6. Revenue card
        .to(revenue.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
        })

        // 7. Revenue counts upward
        .to(revenueCounter, {
          value: 450380,
          duration: 1.5,
          ease: "power2.out",

          onUpdate: () => {
            if (revenueValue.current) {
              revenueValue.current.textContent =
                "$" +
                Math.round(revenueCounter.value).toLocaleString();
            }
          },
        });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="journey">
      <div className="journey-copy">
        <span>PRODUCT JOURNEY</span>
        <h1>
          From a simple idea
          <br />
          to <strong>national impact.</strong>
        </h1>

        <p>Scroll to follow the journey.</p>
      </div>

      <div className="visual">
        <svg
          viewBox="0 0 800 400"
          className="scene"
          aria-label="Pencil sales journey"
        >
          {/* Pencil */}
          <g ref={pencil}>
            {/* Main yellow body */}
            <rect
              className="pencil-body"
              x="260"
              y="175"
              width="280"
              height="50"
              rx="5"
              stroke="white"
              strokeWidth="2"
            />

            {/* Metal */}
            <rect
              className="metal"
              x="220"
              y="175"
              width="40"
              height="50"
              stroke="white"
              strokeWidth="2"
            />

            {/* Eraser */}
            <path
              className="eraser"
              d="M220 175
                 H195
                 Q180 175 180 190
                 V210
                 Q180 225 195 225
                 H220 Z"
              stroke="white"
              strokeWidth="2"
            />

            {/* Wooden tip */}
            <polygon
              points="540,175 610,200 540,225"
              fill="#d9ad7c"
              stroke="white"
              strokeWidth="2"
            />

            {/* Graphite */}
            <polygon
              points="590,193 610,200 590,207"
              fill="#222"
            />
          </g>

          {/* US map */}
          <g ref={map}>
            {/*
              Simplified silhouette for the prototype.
              Replace this with a proper US SVG path later.
            */}
            <path
              d="
                M90 115
                L150 100
                L210 115
                L270 105
                L330 120
                L390 115
                L450 130
                L500 120
                L550 135
                L620 120
                L690 145
                L675 190
                L640 205
                L610 240
                L550 235
                L500 255
                L440 240
                L390 260
                L330 245
                L270 260
                L220 235
                L165 220
                L120 190
                Z
              "
              fill="#121820"
              stroke="#8897a8"
              strokeWidth="3"
            />

            {stores.map((store, index) => (
              <g key={index}>
                <circle
                  className="store-marker marker-glow"
                  cx={store.x}
                  cy={store.y}
                  r="13"
                  fill="#f4c430"
                  opacity="0.15"
                />

                <circle
                  className="store-marker"
                  cx={store.x}
                  cy={store.y}
                  r="6"
                  fill="#ffd633"
                />
              </g>
            ))}
          </g>
        </svg>
      </div>

      <div ref={revenue} className="revenue-card">
        <span>TOTAL REVENUE</span>

        <strong ref={revenueValue}>
          $0
        </strong>

        <p>Across 10 store locations</p>
      </div>

      <div className="scroll-label">
        SCROLL TO EXPLORE ↓
      </div>
    </section>
  );
}