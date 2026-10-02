/*
 * ==========================================================================
 * BUILD LOG ENTRY
 * ==========================================================================
 *
 * Reusable engineering-log entry.
 *
 * Each entry contains:
 *
 * 1. Date and project metadata.
 * 2. Engineering decision / problem.
 * 3. Compact technical visualization.
 * 4. Supporting explanation.
 * 5. Relevant technologies.
 *
 * The diagrams are intentionally simplified technical summaries rather than
 * exhaustive architecture documentation.
 */

interface BuildLogEntryData {
    id: string;
    index: string;
    date: string;
    project: string;
    category: string;
    title: string;
    description: string;
    technologies: string[];
    diagram: string;
}


interface BuildLogEntryProps {
    entry: BuildLogEntryData;
}


function BuildLogEntry({ entry }: BuildLogEntryProps) {

    /*
     * ======================================================================
     * DIAGRAM RENDERING
     * ======================================================================
     *
     * React:
     * - Chooses the correct static diagram from the entry data.
     *
     * CSS:
     * - Draws all nodes, lines, labels, and layout.
     *
     * These diagrams are NOT animated because directional movement could
     * imply system behavior beyond what this compact representation intends
     * to communicate.
     */

    const renderDiagram = () => {
        switch (entry.diagram) {

            /*
             * ----------------------------------------------------------------
             * RELAY
             * ----------------------------------------------------------------
             *
             * Communicates the architectural separation between Relay-wide
             * state and active-conversation state.
             */
            case "relay":
                return (
                    <div
                        className="
                            build-log__diagram
                            build-log__diagram--relay
                        "
                        aria-label="Relay dual WebSocket architecture"
                    >
                        <div className="build-log__socket">

                            <span className="build-log__diagram-index text-mono">
                                WS / 01
                            </span>

                            <span className="build-log__diagram-node text-mono">
                                USER SOCKET
                            </span>

                            <span className="build-log__diagram-detail text-mono">
                                GLOBAL STATE
                            </span>

                        </div>


                        <span
                            className="build-log__diagram-connector"
                            aria-hidden="true"
                        />


                        <div className="build-log__hub">

                            <span
                                className="build-log__hub-dot"
                                aria-hidden="true"
                            />

                            <span className="build-log__diagram-node text-mono">
                                REDIS
                            </span>

                        </div>


                        <span
                            className="build-log__diagram-connector"
                            aria-hidden="true"
                        />


                        <div className="build-log__socket">

                            <span className="build-log__diagram-index text-mono">
                                WS / 02
                            </span>

                            <span className="build-log__diagram-node text-mono">
                                CONVERSATION
                            </span>

                            <span className="build-log__diagram-detail text-mono">
                                ACTIVE STATE
                            </span>

                        </div>

                    </div>
                );


            /*
             * ----------------------------------------------------------------
             * RAGSPACE
             * ----------------------------------------------------------------
             *
             * Communicates the document-to-retrieval transformation.
             */
            case "ragspace":
                return (
                    <div
                        className="
                            build-log__diagram
                            build-log__diagram--pipeline
                        "
                        aria-label="RAGspace retrieval pipeline"
                    >

                        {[
                            "DOCUMENT",
                            "CHUNK",
                            "EMBED",
                            "QDRANT",
                            "RERANK",
                            "CONTEXT",
                        ].map((stage, index, stages) => (
                            <div
                                className="build-log__pipeline-group"
                                key={stage}
                            >
                                <div className="build-log__pipeline-stage">

                                    <span className="build-log__diagram-index text-mono">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <span className="build-log__diagram-node text-mono">
                                        {stage}
                                    </span>

                                </div>


                                {index < stages.length - 1 && (
                                    <span
                                        className="build-log__pipeline-arrow text-mono"
                                        aria-hidden="true"
                                    >
                                        →
                                    </span>
                                )}

                            </div>
                        ))}

                    </div>
                );


            /*
             * ----------------------------------------------------------------
             * RESUSCAN
             * ----------------------------------------------------------------
             *
             * Communicates the relationship between analysis and the
             * persistent application workflow.
             */
            case "resuscan":
                return (
                    <div
                        className="
                            build-log__diagram
                            build-log__diagram--workflow
                        "
                        aria-label="ResuScan application workflow"
                    >

                        <div className="build-log__workflow-node">

                            <span className="build-log__diagram-index text-mono">
                                01
                            </span>

                            <span className="build-log__diagram-node text-mono">
                                AUTH
                            </span>

                        </div>


                        <span className="build-log__workflow-arrow text-mono">
                            →
                        </span>


                        <div className="build-log__workflow-node">

                            <span className="build-log__diagram-index text-mono">
                                02
                            </span>

                            <span className="build-log__diagram-node text-mono">
                                ANALYSIS
                            </span>

                        </div>


                        <span className="build-log__workflow-arrow text-mono">
                            →
                        </span>


                        <div className="build-log__workflow-node">

                            <span className="build-log__diagram-index text-mono">
                                03
                            </span>

                            <span className="build-log__diagram-node text-mono">
                                TRACKER
                            </span>

                        </div>

                    </div>
                );


            default:
                return null;
        }
    };


    return (
        <article className="build-log__entry">

            {/* --------------------------------------------------------------
                ENTRY METADATA
            -------------------------------------------------------------- */}
            <div className="build-log__entry-meta text-mono">

                <span className="build-log__entry-index">
                    {entry.index}
                </span>

                <span className="build-log__entry-date">
                    {entry.date}
                </span>

            </div>


            {/* --------------------------------------------------------------
                ENTRY CONTENT
            -------------------------------------------------------------- */}
            <div className="build-log__entry-content">

                <div className="build-log__entry-heading">

                    <div className="build-log__entry-classification text-mono">

                        <span className="build-log__entry-project">
                            {entry.project}
                        </span>

                        <span
                            className="build-log__entry-separator"
                            aria-hidden="true"
                        >
                            /
                        </span>

                        <span className="build-log__entry-category">
                            {entry.category}
                        </span>

                    </div>


                    <h3 className="build-log__entry-title">
                        {entry.title}
                    </h3>

                </div>


                {/* ----------------------------------------------------------
                    TECHNICAL VISUAL
                ---------------------------------------------------------- */}
                <div className="build-log__entry-visual">
                    {renderDiagram()}
                </div>


                {/* ----------------------------------------------------------
                    EXPLANATION
                ---------------------------------------------------------- */}
                <p className="build-log__entry-description">
                    {entry.description}
                </p>


                {/* ----------------------------------------------------------
                    TECHNOLOGIES
                ---------------------------------------------------------- */}
                <ul
                    className="build-log__technologies"
                    aria-label={`${entry.project} technologies`}
                >

                    {entry.technologies.map((technology) => (
                        <li
                            className="build-log__technology text-mono"
                            key={technology}
                        >
                            {technology}
                        </li>
                    ))}

                </ul>

            </div>

        </article>
    );
}


export default BuildLogEntry;