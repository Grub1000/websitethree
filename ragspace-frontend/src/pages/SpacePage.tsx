import {
    useEffect,
    useState,
} from "react";

import {
    useParams,
} from "react-router-dom";

import SpaceHeader
    from "../components/spaces/SpaceHeader";

import ChatView
    from "../components/chat/ChatView";

import DocumentsView
    from "../components/documents/DocumentsView";

import {
    getSpace,
} from "../api/spacesApi";

import type {
    Space,
} from "../types/space";

import "./SpacePage.css";


type SpaceTab =
    | "chat"
    | "documents";


function SpacePage() {
    const {
        spaceId,
    } = useParams();

    const [
        activeTab,
        setActiveTab,
    ] = useState<SpaceTab>(
        "chat",
    );

    const [
        space,
        setSpace,
    ] = useState<Space | null>(
        null,
    );

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState<string | null>(
        null,
    );


    useEffect(() => {
        async function loadSpace() {
            if (!spaceId) {
                setError(
                    "Space ID is missing."
                );

                setLoading(false);

                return;
            }

            try {
                setLoading(true);
                setError(null);

                const loadedSpace =
                    await getSpace(
                        Number(spaceId),
                    );

                setSpace(
                    loadedSpace
                );

            } catch (error) {
                console.error(
                    error
                );

                setError(
                    "Unable to load this Space."
                );

            } finally {
                setLoading(false);
            }
        }

        loadSpace();

    }, [spaceId]);


    if (loading) {
        return (
            <div className="space-page">
                <p>
                    Loading Space...
                </p>
            </div>
        );
    }


    if (
        error ||
        !space
    ) {
        return (
            <div className="space-page">
                <p>
                    {error ??
                        "Space not found."}
                </p>
            </div>
        );
    }


    return (
        <div className="space-page">

            <SpaceHeader
                name={space.name}
                activeTab={
                    activeTab
                }
                onTabChange={
                    setActiveTab
                }
            />


            <section className="space-view">

                {activeTab ===
                    "chat" && (
                    <ChatView
                        spaceId={space.id}
                    />
                )}


                {activeTab ===
                    "documents" && (
                    <DocumentsView
                        spaceId={space.id}
                    />
                )}

            </section>

        </div>
    );
}


export default SpacePage;