import {
    useEffect,
} from "react";

import type { Space } from "../../types/space";

import "./DeleteSpaceModal.css";


interface DeleteSpaceModalProps {
    open: boolean;
    loading: boolean;
    space: Space | null;

    onClose: () => void;

    onDelete: (
        spaceId: number,
    ) => Promise<void>;
}


function DeleteSpaceModal({
    open,
    loading,
    space,
    onClose,
    onDelete,
}: DeleteSpaceModalProps) {

    useEffect(() => {
        if (!open) {
            return;
        }

        function handleKeyDown(
            event: KeyboardEvent,
        ) {
            if (
                event.key === "Escape" &&
                !loading
            ) {
                onClose();
            }
        }

        window.addEventListener(
            "keydown",
            handleKeyDown,
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown,
            );
        };
    }, [
        open,
        loading,
        onClose,
    ]);


    if (!open || !space) {
        return null;
    }


    async function handleDelete() {
        if (!space) {
            return;
        }

        await onDelete(
            space.id,
        );

        onClose();
    }


    return (
        <div
            className="space-modal-backdrop"
            onMouseDown={(event) => {
                if (
                    event.target ===
                        event.currentTarget &&
                    !loading
                ) {
                    onClose();
                }
            }}
        >
            <div
                className="space-modal delete-space-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-space-title"
            >
                <div className="space-modal-header">
                    <div>
                        <h2 id="delete-space-title">
                            Delete Space
                        </h2>

                        <p>
                            This action cannot be undone.
                        </p>
                    </div>


                    <button
                        type="button"
                        className="space-modal-close"
                        onClick={onClose}
                        disabled={loading}
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>


                <div className="delete-space-message">
                    <p>
                        Are you sure you want to delete
                        {" "}
                        <strong>
                            "{space.name}"
                        </strong>
                        ?
                    </p>

                    <p>
                        This will permanently delete
                        the Space and its associated
                        documents and conversations.
                    </p>
                </div>


                <div className="space-modal-actions">
                    <button
                        type="button"
                        className="space-modal-cancel"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="delete-space-button"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading
                            ? "Deleting..."
                            : "Delete Space"}
                    </button>
                </div>
            </div>
        </div>
    );
}


export default DeleteSpaceModal;