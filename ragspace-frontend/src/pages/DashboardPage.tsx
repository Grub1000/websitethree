import {
    useState,
} from "react";

import { useAuth } from "../context/AuthContext";
import { useSpaces } from "../hooks/useSpaces";

import SpaceCard from "../components/spaces/SpaceCard";
import CreateSpaceModal from "../components/spaces/CreateSpaceModal";
import RenameSpaceModal from "../components/spaces/RenameSpaceModal";
import DeleteSpaceModal from "../components/spaces/DeleteSpaceModal";



import "./DashboardPage.css";

import type { Space } from "../types/space";


function DashboardPage() {
    const {
        currentUser,
    } = useAuth();

    const {
        spaces,
        loading,
        error,
        createSpace,
        updateSpace,
        deleteSpace
    } = useSpaces();


    const [
        createModalOpen,
        setCreateModalOpen,
    ] = useState(false);

    const [
        creating,
        setCreating,
    ] = useState(false);

    const [
        renameSpace,
        setRenameSpace,
    ] = useState<Space | null>(null);

    const [
        deleteTarget,
        setDeleteTarget,
    ] = useState<Space | null>(null);

    const [
        renaming,
        setRenaming,
    ] = useState(false);

    const [
        deleting,
        setDeleting,
    ] = useState(false);


    async function handleCreateSpace(
        name: string,
    ) {
        try {
            setCreating(true);

            await createSpace(name);
        } finally {
            setCreating(false);
        }
    }

    const greetingName =
        currentUser?.first_name ||
        currentUser?.email;

    



    async function handleRenameSpace(
        spaceId: number,
        name: string,
    ) {
        try {
            setRenaming(true);

            await updateSpace(
                spaceId,
                name,
            );
        } finally {
            setRenaming(false);
        }
    }


    async function handleDeleteSpace(
        spaceId: number,
    ) {
        try {
            setDeleting(true);

            await deleteSpace(
                spaceId,
            );
        } finally {
            setDeleting(false);
        }
    }


    return (
        <div className="dashboard-page">

            <section className="dashboard-header">

                <div>
                    <p className="dashboard-eyebrow">
                        Workspace
                    </p>

                    <h1>
                        Welcome back
                        {greetingName
                            ? `, ${greetingName}`
                            : ""}
                    </h1>

                    <p className="dashboard-description">
                        Your knowledge.
                        One intelligent space.
                    </p>
                </div>


                <button
                    className="dashboard-create-button"
                    onClick={() =>
                        setCreateModalOpen(true)
                    }
                >
                    + New Space
                </button>

            </section>


            <section className="dashboard-spaces">

                <div className="dashboard-section-header">
                    <div>
                        <h2>
                            Your Spaces
                        </h2>

                        <p>
                            Organize documents and
                            conversations around
                            specific knowledge.
                        </p>
                    </div>

                    {!loading && (
                        <span>
                            {spaces.length}
                            {" "}
                            {spaces.length === 1
                                ? "Space"
                                : "Spaces"}
                        </span>
                    )}
                </div>


                {loading && (
                    <p className="dashboard-status">
                        Loading Spaces...
                    </p>
                )}


                {error && (
                    <p className="dashboard-error">
                        {error}
                    </p>
                )}


                {!loading &&
                    !error &&
                    spaces.length === 0 && (
                        <div className="dashboard-empty">
                            <div className="dashboard-empty-icon">
                                ◈
                            </div>

                            <h3>
                                Create your first Space
                            </h3>

                            <p>
                                Add documents and
                                start building a
                                searchable knowledge
                                workspace.
                            </p>

                            <button
                                onClick={() =>
                                    setCreateModalOpen(true)
                                }
                            >
                                Create Space
                            </button>
                        </div>
                    )}


                {!loading &&
                    spaces.length > 0 && (
                        <div className="spaces-grid">
                            {spaces.map(
                                (space) => (
                                    <SpaceCard
                                        key={space.id}
                                        space={space}

                                        onRename={(space) =>
                                            setRenameSpace(space)
                                        }

                                        onDelete={(space) =>
                                            setDeleteTarget(space)
                                        }
                                    />
                                ),
                            )}
                        </div>
                    )}

            </section>

            <CreateSpaceModal
                open={createModalOpen}
                loading={creating}
                onClose={() =>
                    setCreateModalOpen(false)
                }
                onCreate={
                    handleCreateSpace
                }
            />


            <RenameSpaceModal
                open={
                    renameSpace !== null
                }
                loading={renaming}
                space={renameSpace}
                onClose={() =>
                    setRenameSpace(null)
                }
                onRename={
                    handleRenameSpace
                }
            />


            <DeleteSpaceModal
                open={
                    deleteTarget !== null
                }
                loading={deleting}
                space={deleteTarget}
                onClose={() =>
                    setDeleteTarget(null)
                }
                onDelete={
                    handleDeleteSpace
                }
            />

        </div>
    );
}


export default DashboardPage;