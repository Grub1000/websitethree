import {
    useEffect,
    useRef,
    useState,
    type FormEvent,
} from "react";

import type { Space } from "../../types/space";

import "./CreateSpaceModal.css";


interface RenameSpaceModalProps {
    open: boolean;
    loading: boolean;
    space: Space | null;

    onClose: () => void;

    onRename: (
        spaceId: number,
        name: string,
    ) => Promise<void>;
}


function RenameSpaceModal({
    open,
    loading,
    space,
    onClose,
    onRename,
}: RenameSpaceModalProps) {
    const [name, setName] =
        useState("");

    const [error, setError] =
        useState("");

    const inputRef =
        useRef<HTMLInputElement>(null);


    useEffect(() => {
        if (!open || !space) {
            return;
        }

        setName(space.name);
        setError("");

        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        }, 0);
    }, [open, space]);


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


    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        if (!space) {
            return;
        }

        const trimmedName =
            name.trim();


        if (!trimmedName) {
            setError(
                "Enter a name for your Space.",
            );

            return;
        }


        if (
            trimmedName ===
            space.name
        ) {
            onClose();

            return;
        }


        try {
            setError("");

            await onRename(
                space.id,
                trimmedName,
            );

            onClose();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to rename Space.",
            );
        }
    }


    if (!open || !space) {
        return null;
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
                className="space-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="rename-space-title"
            >
                <div className="space-modal-header">
                    <div>
                        <h2 id="rename-space-title">
                            Rename Space
                        </h2>

                        <p>
                            Update the name of this
                            knowledge workspace.
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


                <form
                    onSubmit={
                        handleSubmit
                    }
                >
                    <div className="space-modal-field">
                        <label htmlFor="rename-space-name">
                            Space name
                        </label>

                        <input
                            ref={inputRef}
                            id="rename-space-name"
                            value={name}
                            onChange={(event) =>
                                setName(
                                    event.target.value,
                                )
                            }
                            maxLength={150}
                            disabled={loading}
                        />
                    </div>


                    {error && (
                        <p className="space-modal-error">
                            {error}
                        </p>
                    )}


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
                            type="submit"
                            className="space-modal-create"
                            disabled={
                                loading ||
                                !name.trim()
                            }
                        >
                            {loading
                                ? "Saving..."
                                : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default RenameSpaceModal;