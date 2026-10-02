/*
 * ==========================================================================
 * BUILD LOG
 * ==========================================================================
 *
 * Section 03 of the homepage.
 *
 * PURPOSE
 * --------------------------------------------------------------------------
 *
 * Selected Systems shows WHAT was built.
 *
 * Build Log shows HOW engineering decisions were made.
 *
 * Each entry focuses on one concrete architectural or implementation
 * decision from a production project rather than repeating the project's
 * marketing description.
 *
 * React:
 * - Provides semantic section structure.
 * - Maps structured engineering-log data into reusable BuildLogEntry
 *   components.
 *
 * CSS:
 * - Controls the editorial timeline, responsive layout, and technical
 *   diagrams.
 *
 * GSAP:
 * - Not used yet.
 * - Motion will be added only after the static composition is validated.
 */

import BuildLogEntry from "./BuildLogEntry";

import "./BuildLog.css";


/*
 * ==========================================================================
 * BUILD LOG DATA
 * ==========================================================================
 *
 * Keeping the entries outside the component separates content from rendering.
 *
 * This also makes future entries easy to add without duplicating JSX.
 */

const buildLogEntries = [
    {
        id: "relay-realtime",
        index: "01",
        date: "SEP / 2026",
        project: "RELAY",
        category: "REAL-TIME ARCHITECTURE",
        title: "SEPARATING GLOBAL AND ACTIVE CONVERSATION STATE.",
        description:
            "Designed separate authenticated WebSocket connections for Relay-wide state and the currently active conversation, keeping global conversation updates independent from message-level events.",
        technologies: [
            "DJANGO CHANNELS",
            "WEBSOCKETS",
            "REDIS",
            "ASGI",
        ],
        diagram: "relay",
    },
    {
        id: "ragspace-retrieval",
        index: "02",
        date: "AUG / 2026",
        project: "RAGSPACE",
        category: "RETRIEVAL ARCHITECTURE",
        title: "TURNING PRIVATE DOCUMENTS INTO RETRIEVABLE CONTEXT.",
        description:
            "Built a document pipeline around object storage, chunking, embeddings, vector retrieval, reranking, and page-level source information so private documents could become grounded conversational context.",
        technologies: [
            "S3",
            "EMBEDDINGS",
            "QDRANT",
            "RERANKING",
        ],
        diagram: "ragspace",
    },
    {
        id: "resuscan-product",
        index: "03",
        date: "JUL / 2026",
        project: "RESUSCAN",
        category: "PRODUCT ARCHITECTURE",
        title: "CONNECTING ANALYSIS TO A PERSISTENT APPLICATION WORKFLOW.",
        description:
            "Designed resume analysis and job tracking as one authenticated application, allowing analysis results and job-application state to live inside the same persistent full-stack workflow.",
        technologies: [
            "REACT",
            "DRF",
            "MYSQL",
            "JWT",
        ],
        diagram: "resuscan",
    },
];


function BuildLog() {
    return (
        <section
            className="build-log"
            id="build-log"
            aria-labelledby="build-log-title"
        >
            <div className="build-log__container container">

                {/* ----------------------------------------------------------
                    SECTION INDEX
                ---------------------------------------------------------- */}
                <div className="build-log__meta text-mono">

                    <span className="build-log__index">
                        03 /
                    </span>

                    <span className="build-log__label">
                        BUILD LOG
                    </span>

                </div>


                {/* ----------------------------------------------------------
                    SECTION INTRODUCTION
                ---------------------------------------------------------- */}
                <header className="build-log__header">

                    <h2
                        className="build-log__title"
                        id="build-log-title"
                    >
                        <span className="build-log__title-line">
                            ENGINEERING
                        </span>

                        <span className="build-log__title-line">
                            NOTES
                            <span className="build-log__title-mark">
                                .
                            </span>
                        </span>
                    </h2>


                    <div className="build-log__introduction">

                        <span className="build-log__introduction-label text-mono">
                            DECISIONS / SYSTEMS / IMPLEMENTATION
                        </span>

                        <p className="build-log__introduction-copy">
                            A record of architecture decisions, implementation
                            problems, and the systems built to solve them.
                        </p>

                    </div>

                </header>


                {/* ----------------------------------------------------------
                    ENGINEERING LOG
                ---------------------------------------------------------- */}
                <div className="build-log__entries">

                    {buildLogEntries.map((entry) => (
                        <BuildLogEntry
                            key={entry.id}
                            entry={entry}
                        />
                    ))}

                </div>

            </div>
        </section>
    );
}


export default BuildLog;