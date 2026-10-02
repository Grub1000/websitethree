import {
    Cloud,
    Database,
    RadioTower,
    Server,
} from "lucide-react";

/*
 * ==========================================================================
 * HERO SKYLINE
 * ==========================================================================
 *
 * PURPOSE
 * --------------------------------------------------------------------------
 * The Hero skyline is an abstract representation of software architecture.
 *
 * It intentionally sits between two visual ideas:
 *
 * 1. A city skyline carried forward from the visual identity of the previous
 *    portfolio.
 *
 * 2. A simplified software-system topology representing the path from a
 *    client through application infrastructure, data, and cloud deployment.
 *
 * This is NOT intended to document one specific project's architecture.
 * Project-specific diagrams belong inside their respective case studies.
 *
 *
 * TECHNOLOGY RESPONSIBILITIES
 * --------------------------------------------------------------------------
 * React:
 * - Renders the semantic component structure.
 * - Provides predictable DOM elements for the Hero's GSAP timeline.
 *
 * Lucide React:
 * - Provides the four lightweight SVG icons.
 *
 * Native CSS:
 * - Controls the actual skyline geometry.
 * - Positions buildings, nodes, labels, and connections.
 * - Provides the static fallback when JavaScript animation is unavailable.
 *
 * GSAP:
 * - Does NOT live inside this component.
 * - Hero.tsx owns the animation timeline because the skyline participates in
 *   the Hero's larger entrance sequence.
 *
 * This separation keeps HeroSkyline concerned with structure rather than
 * animation lifecycle management.
 * ==========================================================================
 */
import "./Hero.css"

function HeroSkyline() {
    return (
        <div
            className="hero-skyline"
            aria-hidden="true"
        >
            {/*
             * Small technical caption.
             *
             * The orange index visually connects the architecture layer to the
             * orange punctuation used in the main Hero title.
             */}
            <div className="hero-skyline__label text-mono">
                <span className="hero-skyline__label-index">
                    SYS / 01
                </span>

                <span className="hero-skyline__label-text">
                    System Architecture
                </span>
            </div>

            {/*
             * The scene contains the actual skyline geometry.
             *
             * Every major structure receives a descriptive class so its
             * position can be controlled independently without relying on
             * positional selectors such as :nth-child().
             */}
            <div className="hero-skyline__scene">
                {/*
                 * ----------------------------------------------------------
                 * CLIENT
                 * ----------------------------------------------------------
                 */}
                <div className="hero-skyline__building hero-skyline__building--client">
                    <span className="hero-skyline__node">
                        <RadioTower
                            className="hero-skyline__node-icon"
                            size={15}
                            strokeWidth={1.5}
                        />
                    </span>

                    <span className="hero-skyline__node-label text-mono">
                        Client
                    </span>
                </div>

                {/*
                 * ----------------------------------------------------------
                 * CLIENT → APPLICATION
                 * ----------------------------------------------------------
                 */}
                <div className="hero-skyline__connection hero-skyline__connection--client-application">
                    <span className="hero-skyline__connection-line" />

                    {/*
                     * The signal dot is initially positioned by native CSS.
                     *
                     * GSAP later animates its xPercent value from the beginning
                     * to the end of this connection.
                     *
                     * IMPORTANT:
                     * xPercent is a GSAP convenience property. It is NOT a
                     * native CSS property.
                     */}
                    <span className="hero-skyline__signal" />
                </div>

                {/*
                 * ----------------------------------------------------------
                 * APPLICATION
                 * ----------------------------------------------------------
                 */}
                <div className="hero-skyline__building hero-skyline__building--application">
                    <span className="hero-skyline__node">
                        <Server
                            className="hero-skyline__node-icon"
                            size={15}
                            strokeWidth={1.5}
                        />
                    </span>

                    <span className="hero-skyline__node-label text-mono">
                        Application
                    </span>
                </div>

                {/*
                 * ----------------------------------------------------------
                 * APPLICATION → DATA
                 * ----------------------------------------------------------
                 */}
                <div className="hero-skyline__connection hero-skyline__connection--application-data">
                    <span className="hero-skyline__connection-line" />

                    <span className="hero-skyline__signal" />
                </div>

                {/*
                 * ----------------------------------------------------------
                 * DATA
                 * ----------------------------------------------------------
                 */}
                <div className="hero-skyline__building hero-skyline__building--data">
                    <span className="hero-skyline__node">
                        <Database
                            className="hero-skyline__node-icon"
                            size={15}
                            strokeWidth={1.5}
                        />
                    </span>

                    <span className="hero-skyline__node-label text-mono">
                        Data
                    </span>
                </div>

                {/*
                 * ----------------------------------------------------------
                 * DATA → CLOUD
                 * ----------------------------------------------------------
                 */}
                <div className="hero-skyline__connection hero-skyline__connection--data-cloud">
                    <span className="hero-skyline__connection-line" />

                    <span className="hero-skyline__signal" />
                </div>

                {/*
                 * ----------------------------------------------------------
                 * CLOUD
                 * ----------------------------------------------------------
                 */}
                <div className="hero-skyline__building hero-skyline__building--cloud">
                    <span className="hero-skyline__node">
                        <Cloud
                            className="hero-skyline__node-icon"
                            size={15}
                            strokeWidth={1.5}
                        />
                    </span>

                    <span className="hero-skyline__node-label text-mono">
                        Cloud
                    </span>
                </div>

                {/*
                 * The shared baseline visually turns the independent vertical
                 * structures into one continuous architectural environment.
                 */}
                <span className="hero-skyline__baseline" />
            </div>
        </div>
    );
}

export default HeroSkyline;