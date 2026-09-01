import {
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import type { Space } from "../../types/space";

import "./SpaceCard.css";


interface SpaceCardProps {
    space: Space;

    onRename: (
        space: Space,
    ) => void;

    onDelete: (
        space: Space,
    ) => void;
}


function SpaceCard({
    space,
    onRename,
    onDelete,
}: SpaceCardProps) {
    const navigate =
        useNavigate();

    const [
        menuOpen,
        setMenuOpen,
    ] = useState(false);


    function openSpace() {
        navigate(
            `/ragspace/spaces/${space.id}`,
        );
    }


    return (
        <div className="space-card-wrapper">

            <button
                className="space-card"
                onClick={openSpace}
            >
                <div className="space-card-icon">
                    ◈
                </div>

                <div className="space-card-content">
                    <h3>
                        {space.name}
                    </h3>

                    <p>
                        Open Space
                    </p>
                </div>

                {/* <span className="space-card-arrow">
                    →
                </span> */}
            </button>


            <button
                className="space-card-menu-button"
                onClick={(event) => {
                    event.stopPropagation();

                    setMenuOpen(
                        (current) =>
                            !current,
                    );
                }}
                aria-label="Space options"
            >
                ⋯
            </button>


            {menuOpen && (
                <div className="space-card-menu">

                    <button
                        onClick={() => {
                            setMenuOpen(false);

                            onRename(
                                space,
                            );
                        }}
                    >
                        Rename
                    </button>


                    <button
                        className="space-card-menu-danger"
                        onClick={() => {
                            setMenuOpen(false);

                            onDelete(
                                space,
                            );
                        }}
                    >
                        Delete
                    </button>

                </div>
            )}

        </div>
    );
}


export default SpaceCard;