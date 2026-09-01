import {
    useEffect,
    useRef,
    useState,
    type FormEvent,
} from "react";

import "./CreateSpaceModal.css";


interface CreateSpaceModalProps {
    open: boolean;
    loading: boolean;

    onClose: () => void;

    onCreate: (
        name: string,
    ) => Promise<void>;
}


function CreateSpaceModal({
    open,
    loading,
    onClose,
    onCreate,
}: CreateSpaceModalProps) {
    const [name, setName] =
        useState("");

    const [error, setError] =
        useState("");

    const inputRef =
        useRef<HTMLInputElement>(null);


    useEffect(() => {
        if (!open) {
            return;
        }

        setName("");
        setError("");

        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    }, [open]);


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

        const trimmedName =
            name.trim();


        if (!trimmedName) {
            setError(
                "Enter a name for your Space.",
            );

            return;
        }


        try {
            setError("");

            await onCreate(
                trimmedName,
            );

            onClose();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to create Space.",
            );
        }
    }


    if (!open) {
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
                aria-labelledby="create-space-title"
            >
                <div className="space-modal-header">
                    <div>
                        <h2 id="create-space-title">
                            Create a Space
                        </h2>

                        <p>
                            Give this knowledge
                            workspace a name.
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
                        <label htmlFor="space-name">
                            Space name
                        </label>

                        <input
                            ref={inputRef}
                            id="space-name"
                            value={name}
                            onChange={(event) =>
                                setName(
                                    event.target.value,
                                )
                            }
                            placeholder="Machine Learning"
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
                                ? "Creating..."
                                : "Create Space"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default CreateSpaceModal;