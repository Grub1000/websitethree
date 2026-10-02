/*
 * ==========================================================================
 * RELAY ARCHITECTURE
 * ==========================================================================
 *
 * Simplified visual explanation of Relay's real-time system.
 *
 * This is NOT intended to represent every backend dependency.
 *
 * Its purpose is to communicate the primary architectural relationship:
 *
 * CLIENT
 *   ↓
 * WEBSOCKET
 *   ↓
 * DJANGO CHANNELS
 *   ↓
 * REDIS CHANNEL LAYER
 *
 * with persistent application state represented by MySQL.
 *
 *
 * CURRENT VERSION
 * --------------------------------------------------------------------------
 *
 * This first version is intentionally static.
 *
 * Once the responsive geometry is approved, GSAP can animate a cyan message
 * signal through the architecture.
 *
 *
 * LIBRARY RESPONSIBILITIES
 * --------------------------------------------------------------------------
 *
 * React:
 * - Renders the architecture structure.
 *
 * Lucide:
 * - Supplies SVG icons.
 *
 * CSS:
 * - Draws connections.
 * - Positions nodes.
 * - Controls responsive layout.
 *
 * GSAP:
 * - NOT USED YET.
 */

import {
    Database,
    MessageSquare,
    RadioTower,
    Server,
    Users,
} from "lucide-react";


function RelayArchitecture() {
    return (
        <div
            className="relay-architecture"
            aria-label="Simplified Relay real-time messaging architecture"
        >

            {/* --------------------------------------------------------------
                DIAGRAM HEADER
            -------------------------------------------------------------- */}
            <div className="relay-architecture__header text-mono">

                <span className="relay-architecture__header-index">
                    SYS / 01
                </span>

                <span className="relay-architecture__header-title">
                    MESSAGE FLOW
                </span>

            </div>


            {/* --------------------------------------------------------------
                ARCHITECTURE CANVAS

                The architecture uses a CSS Grid rather than manually placing
                every node with absolute coordinates.

                That gives us a stable responsive structure first.

                Individual connection lines are then drawn inside the grid
                using native CSS.
            -------------------------------------------------------------- */}
            <div className="relay-architecture__canvas">

                {/* CLIENT ------------------------------------------------ */}
                <div className="relay-architecture__node relay-architecture__node--client">

                    <div className="relay-architecture__node-icon">
                        <Users
                            size={18}
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                    </div>

                    <div className="relay-architecture__node-copy">
                        <span className="relay-architecture__node-index text-mono">
                            01
                        </span>

                        <span className="relay-architecture__node-title">
                            Client
                        </span>

                        <span className="relay-architecture__node-meta text-mono">
                            React / TypeScript
                        </span>
                    </div>

                </div>


                {/* CONNECTION 01 ----------------------------------------- */}
                <div
                    className="
                        relay-architecture__connection
                        relay-architecture__connection--client-socket
                    "
                    aria-hidden="true"
                >
                    <span className="relay-architecture__connection-line" />

                    <span className="relay-architecture__connection-label text-mono">
                        MESSAGE
                    </span>
                </div>


                {/* WEBSOCKET --------------------------------------------- */}
                <div className="relay-architecture__node relay-architecture__node--socket">

                    <div className="relay-architecture__node-icon">
                        <RadioTower
                            size={18}
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                    </div>

                    <div className="relay-architecture__node-copy">
                        <span className="relay-architecture__node-index text-mono">
                            02
                        </span>

                        <span className="relay-architecture__node-title">
                            WebSocket
                        </span>

                        <span className="relay-architecture__node-meta text-mono">
                            Authenticated / Persistent
                        </span>
                    </div>

                </div>


                {/* CONNECTION 02 ----------------------------------------- */}
                <div
                    className="
                        relay-architecture__connection
                        relay-architecture__connection--socket-channels
                    "
                    aria-hidden="true"
                >
                    <span className="relay-architecture__connection-line" />

                    <span className="relay-architecture__connection-label text-mono">
                        EVENT
                    </span>
                </div>


                {/* DJANGO CHANNELS --------------------------------------- */}
                <div className="relay-architecture__node relay-architecture__node--channels">

                    <div className="relay-architecture__node-icon">
                        <Server
                            size={18}
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                    </div>

                    <div className="relay-architecture__node-copy">
                        <span className="relay-architecture__node-index text-mono">
                            03
                        </span>

                        <span className="relay-architecture__node-title">
                            Django Channels
                        </span>

                        <span className="relay-architecture__node-meta text-mono">
                            ASGI / Daphne
                        </span>
                    </div>

                </div>


                {/* CONNECTION 03 ----------------------------------------- */}
                <div
                    className="
                        relay-architecture__connection
                        relay-architecture__connection--channels-redis
                    "
                    aria-hidden="true"
                >
                    <span className="relay-architecture__connection-line" />

                    <span className="relay-architecture__connection-label text-mono">
                        CHANNEL EVENT
                    </span>
                </div>


                {/* REDIS ------------------------------------------------- */}
                <div className="relay-architecture__node relay-architecture__node--redis">

                    <div className="relay-architecture__node-icon">
                        <MessageSquare
                            size={18}
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                    </div>

                    <div className="relay-architecture__node-copy">
                        <span className="relay-architecture__node-index text-mono">
                            04
                        </span>

                        <span className="relay-architecture__node-title">
                            Redis
                        </span>

                        <span className="relay-architecture__node-meta text-mono">
                            Channel Layer
                        </span>
                    </div>

                </div>


                {/* PERSISTENCE BRANCH ------------------------------------ */}
                <div
                    className="
                        relay-architecture__connection
                        relay-architecture__connection--channels-database
                    "
                    aria-hidden="true"
                >
                    <span className="relay-architecture__connection-line" />

                    <span className="relay-architecture__connection-label text-mono">
                        PERSIST
                    </span>
                </div>


                {/* MYSQL ------------------------------------------------- */}
                <div className="relay-architecture__node relay-architecture__node--database">

                    <div className="relay-architecture__node-icon">
                        <Database
                            size={18}
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                    </div>

                    <div className="relay-architecture__node-copy">
                        <span className="relay-architecture__node-index text-mono">
                            DB
                        </span>

                        <span className="relay-architecture__node-title">
                            MySQL
                        </span>

                        <span className="relay-architecture__node-meta text-mono">
                            Persistent State
                        </span>
                    </div>

                </div>

            </div>

        </div>
    );
}


export default RelayArchitecture;