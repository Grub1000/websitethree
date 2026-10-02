/*
 * ==========================================================================
 * BOARD LEGEND
 * ==========================================================================
 *
 * The fourth region prevents the project layout from becoming a predictable
 * three-card Bento grid.
 *
 * It behaves more like the title block / legend found on an engineering
 * drawing.
 *
 * This region intentionally contains no project CTA.
 */

function BoardLegend() {
    return (
        <aside
            className="project-board__legend"
            aria-label="Selected systems overview"
        >

            <div className="project-board__legend-header text-mono">

                <span className="project-board__legend-index">
                    SYSTEMS /
                </span>

                <span className="project-board__legend-year">
                    2026
                </span>

            </div>


            <div className="project-board__legend-content">

                <span className="project-board__legend-kicker text-mono">
                    BUILT ACROSS
                </span>

                <p className="project-board__legend-disciplines">
                    REAL-TIME
                    <br />
                    AI / RETRIEVAL
                    <br />
                    FULL-STACK
                    <br />
                    CLOUD
                </p>

            </div>


            <div className="project-board__legend-footer text-mono">
                <span className="project-board__legend-name">
                    JORGE RAMIREZ
                </span>

                <span className="project-board__legend-count">
                    03 SYSTEMS
                </span>
            </div>

        </aside>
    );
}


export default BoardLegend;