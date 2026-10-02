/*
 * ==========================================================================
 * RELAY BOARD REGION
 * ==========================================================================
 *
 * Relay combines three kinds of information:
 *
 * 1. PRODUCT  — what the application actually looks like.
 * 2. SYSTEM   — a simplified view of the real-time architecture.
 * 3. STACK    — the technologies used to build and deploy it.
 *
 * React:
 * - Renders the project structure.
 *
 * CSS:
 * - Controls the project layout and architecture drawing.
 *
 * GSAP:
 * - Not used yet.
 * - Later, GSAP will animate message movement through the system.
 */

import { ArrowUpRight } from "lucide-react";

import RelayPNG from "../../assets/images/projects/relay/Relay.png"

function RelayCard() {
    return (
        <article
            className="
                project-board__card
                project-board__card--relay
            "
            aria-labelledby="relay-card-title"
        >

            {/* --------------------------------------------------------------
                PROJECT HEADER
            -------------------------------------------------------------- */}
            <header className="project-board__card-header">

                <div className="project-board__card-index-group text-mono">
                    <span className="project-board__card-index">
                        01 /
                    </span>

                    <span className="project-board__card-category">
                        REAL-TIME SYSTEM
                    </span>
                </div>


                <span className="project-board__status text-mono">
                    <span
                        className="project-board__status-dot"
                        aria-hidden="true"
                    />

                    PRODUCTION
                </span>

            </header>


            {/* --------------------------------------------------------------
                PROJECT IDENTITY
            -------------------------------------------------------------- */}
            <div className="project-board__identity">

                <h3
                    className="project-board__title"
                    id="relay-card-title"
                >
                    RELAY
                    <span className="project-board__title-mark">
                        .
                    </span>
                </h3>

                <p className="project-board__description">
                    Real-time messaging with persistent conversations,
                    presence, typing, unread counts, delivery receipts,
                    and read receipts.
                </p>

            </div>


            {/* --------------------------------------------------------------
                PRODUCT + ENGINEERING VISUAL

                Desktop Relay receives enough horizontal space to show the
                actual application beside its simplified system topology.

                Mobile naturally stacks these regions.
            -------------------------------------------------------------- */}
            <div className="project-board__visual project-board__visual--relay">

                <figure className="project-board__image-frame">

                    <img
                        className="project-board__image"
                        src={RelayPNG}
                        alt="Relay real-time messaging application"
                    />

                    <figcaption className="project-board__image-caption text-mono">
                        PRODUCT / INTERFACE
                    </figcaption>

                </figure>


                <div
                    className="relay-card__system"
                    aria-label="Simplified Relay architecture"
                >

                    <div className="relay-card__system-header text-mono">
                        MESSAGE FLOW / 01
                    </div>


                    <div className="relay-card__primary-path">

                        <div className="relay-card__node">
                            <span className="relay-card__node-dot" />

                            <span className="relay-card__node-label text-mono">
                                CLIENT
                            </span>
                        </div>


                        <span
                            className="relay-card__connection"
                            aria-hidden="true"
                        />


                        <div className="relay-card__node">
                            <span className="relay-card__node-dot" />

                            <span className="relay-card__node-label text-mono">
                                WS
                            </span>
                        </div>


                        <span
                            className="relay-card__connection"
                            aria-hidden="true"
                        />


                        <div className="relay-card__node">
                            <span className="relay-card__node-dot" />

                            <span className="relay-card__node-label text-mono">
                                CHANNELS
                            </span>
                        </div>

                    </div>


                    <div className="relay-card__branch">

                        <span
                            className="relay-card__branch-stem"
                            aria-hidden="true"
                        />

                        <div className="relay-card__branch-targets">

                            <div className="relay-card__branch-node">
                                <span className="relay-card__branch-dot" />

                                <span className="relay-card__node-label text-mono">
                                    REDIS
                                </span>
                            </div>


                            <div className="relay-card__branch-node">
                                <span className="relay-card__branch-dot" />

                                <span className="relay-card__node-label text-mono">
                                    MYSQL
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* --------------------------------------------------------------
                TECHNOLOGY MATRIX
            -------------------------------------------------------------- */}
            <dl className="project-board__technologies">

                <div className="project-board__technology-row">
                    <dt className="project-board__technology-label text-mono">
                        LANGUAGES
                    </dt>

                    <dd className="project-board__technology-value text-mono">
                        TYPESCRIPT / PYTHON / SQL
                    </dd>
                </div>


                <div className="project-board__technology-row">
                    <dt className="project-board__technology-label text-mono">
                        CORE
                    </dt>

                    <dd className="project-board__technology-value text-mono">
                        REACT / DRF / DJANGO CHANNELS
                    </dd>
                </div>


                <div className="project-board__technology-row">
                    <dt className="project-board__technology-label text-mono">
                        INFRA
                    </dt>

                    <dd className="project-board__technology-value text-mono">
                        WEBSOCKETS / REDIS / MYSQL / AWS
                    </dd>
                </div>

            </dl>


            {/* --------------------------------------------------------------
                PROJECT ACTION

                This replaces the old circular arrow button.

                The entire bottom strip is now the interaction target.
            -------------------------------------------------------------- */}
            <a
                className="project-board__action"
                href="https://jorgeramirez.net/relay/"
                aria-label="Explore Relay"
            >
                <span className="project-board__action-line" />

                <span className="project-board__action-content">

                    <span className="project-board__action-label text-mono">
                        EXPLORE RELAY
                    </span>

                    <span className="project-board__action-secondary text-mono">
                        OPEN SYSTEM
                    </span>

                    <ArrowUpRight
                        className="project-board__action-icon"
                        size={18}
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />

                </span>
            </a>

        </article>
    );
}


export default RelayCard;