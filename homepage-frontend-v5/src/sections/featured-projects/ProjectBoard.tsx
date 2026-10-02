/*
 * ==========================================================================
 * PROJECT BOARD
 * ==========================================================================
 *
 * The ProjectBoard is the primary visual system for Selected Work.
 *
 * IMPORTANT:
 * --------------------------------------------------------------------------
 *
 * This is not a traditional card grid.
 *
 * The board itself is one continuous technical surface. Internal grid regions
 * divide that surface into project-specific engineering artifacts.
 *
 * Desktop:
 *
 * ┌──────────────────────────────┬────────────────────┐
 * │            RELAY             │      RAGSPACE      │
 * ├──────────────────────┬───────┴────────────────────┤
 * │       RESUSCAN       │        BOARD LEGEND        │
 * └──────────────────────┴────────────────────────────┘
 *
 * Mobile:
 *
 * RELAY
 * RAGSPACE
 * RESUSCAN
 * LEGEND
 *
 * React:
 * - Composes the four board regions.
 *
 * CSS Grid:
 * - Controls the board geometry.
 */

import BoardLegend from "./BoardLegend.tsx";
import RAGspaceCard from "./RAGspaceCard.tsx";
import RelayCard from "./RelayCard.tsx";
import ResuScanCard from "./ResuScanCard.tsx";


function ProjectBoard() {
    return (
        <div className="project-board">

            <RelayCard />

            <RAGspaceCard />

            <ResuScanCard />

            <BoardLegend />

        </div>
    );
}


export default ProjectBoard;