/*
 * ==========================================================================
 * RELAY PROJECT
 * ==========================================================================
 *
 * First featured engineering system.
 *
 * Relay is presented as a technical case study rather than a conventional
 * portfolio card.
 *
 * The architecture visualization is separated into RelayArchitecture so the
 * technical diagram can later own its GSAP lifecycle independently from the
 * surrounding project content.
 *
 * React responsibility:
 * - Semantic project structure.
 * - Content composition.
 *
 * CSS responsibility:
 * - Editorial layout.
 * - Responsive behavior.
 *
 * GSAP responsibility later:
 * - Message/data movement through the architecture.
 */

import {
    ArrowUpRight,
} from "lucide-react";

import RelayArchitecture from "./RelayArchitecture";


function RelayProject() {
    return (
        <article
            className="featured-project featured-project--relay"
            aria-labelledby="relay-project-title"
        >

            {/* --------------------------------------------------------------
                PROJECT METADATA
            -------------------------------------------------------------- */}
            <header className="featured-project__header">

                <div className="featured-project__number text-mono">
                    01
                </div>


                <div className="featured-project__category text-mono">
                    REAL-TIME SYSTEM
                </div>

            </header>


            {/* --------------------------------------------------------------
                PROJECT IDENTITY

                The project name intentionally receives substantial visual
                weight before the visitor reaches the architecture.
            -------------------------------------------------------------- */}
            <div className="featured-project__identity">

                <h3
                    className="featured-project__title"
                    id="relay-project-title"
                >
                    RELAY
                    <span className="featured-project__title-mark">
                        .
                    </span>
                </h3>


                <p className="featured-project__summary">
                    A full-stack real-time messaging platform built around
                    persistent conversations, live messaging, typing indicators,
                    presence, unread counts, delivery receipts, and read
                    receipts.
                </p>

            </div>


            {/* --------------------------------------------------------------
                TECHNICAL STORY

                Desktop:
                Architecture occupies the larger left region while technical
                context occupies the right.

                Mobile:
                These naturally become a vertical sequence.
            -------------------------------------------------------------- */}
            <div className="featured-project__system">

                <div className="featured-project__visual">
                    <RelayArchitecture />
                </div>


                <aside
                    className="featured-project__details"
                    aria-label="Relay technical details"
                >

                    <div className="featured-project__detail">

                        <span className="featured-project__detail-label text-mono">
                            SYSTEM
                        </span>

                        <p className="featured-project__detail-value">
                            Real-time messaging architecture with authenticated
                            user-level and conversation-level WebSocket
                            connections.
                        </p>

                    </div>


                    <div className="featured-project__detail">

                        <span className="featured-project__detail-label text-mono">
                            REAL-TIME
                        </span>

                        <p className="featured-project__detail-value">
                            Messages, presence, typing state, unread updates,
                            delivery acknowledgements, and read state move
                            through dedicated real-time channels.
                        </p>

                    </div>


                    <div className="featured-project__detail">

                        <span className="featured-project__detail-label text-mono">
                            DEPLOYMENT
                        </span>

                        <p className="featured-project__detail-value">
                            Django Channels runs through ASGI with Daphne,
                            Redis provides the channel layer, and Apache proxies
                            secure WebSocket traffic in production.
                        </p>

                    </div>

                </aside>

            </div>


            {/* --------------------------------------------------------------
                STACK

                Technologies remain textual rather than becoming decorative
                logo badges. This keeps the section architectural/editorial.
            -------------------------------------------------------------- */}
            <div className="featured-project__stack">

                <span className="featured-project__stack-label text-mono">
                    STACK /
                </span>


                <ul
                    className="featured-project__technologies text-mono"
                    aria-label="Relay technology stack"
                >
                    <li className="featured-project__technology">
                        React
                    </li>

                    <li className="featured-project__technology">
                        TypeScript
                    </li>

                    <li className="featured-project__technology">
                        Django
                    </li>

                    <li className="featured-project__technology">
                        Channels
                    </li>

                    <li className="featured-project__technology">
                        WebSockets
                    </li>

                    <li className="featured-project__technology">
                        Redis
                    </li>

                    <li className="featured-project__technology">
                        MySQL
                    </li>

                    <li className="featured-project__technology">
                        AWS
                    </li>
                </ul>

            </div>


            {/* --------------------------------------------------------------
                PROJECT LINKS

                Replace these URLs with the final Relay deployment/repository
                URLs when wiring the section into production.
            -------------------------------------------------------------- */}
            <footer className="featured-project__footer">

                <a
                    className="featured-project__link text-mono"
                    href="/relay"
                >
                    <span className="featured-project__link-text">
                        VIEW SYSTEM
                    </span>

                    <ArrowUpRight
                        className="featured-project__link-icon"
                        size={16}
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                </a>


                <a
                    className="featured-project__link text-mono"
                    href="https://github.com/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <span className="featured-project__link-text">
                        VIEW SOURCE
                    </span>

                    <ArrowUpRight
                        className="featured-project__link-icon"
                        size={16}
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                </a>

            </footer>

        </article>
    );
}


export default RelayProject;