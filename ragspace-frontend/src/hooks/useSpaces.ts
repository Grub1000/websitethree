import {
    useEffect,
    useState,
} from "react";

import {
    createSpace as createSpaceRequest,
    deleteSpace as deleteSpaceRequest,
    getSpaces,
    updateSpace as updateSpaceRequest,
} from "../api/spacesApi";

import type { Space } from "../types/space";


export function useSpaces() {
    const [spaces, setSpaces] =
        useState<Space[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    async function loadSpaces() {
        setLoading(true);
        setError("");

        try {
            const data =
                await getSpaces();

            setSpaces(data);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to load Spaces.",
            );
        } finally {
            setLoading(false);
        }
    }


    async function createSpace(
        name: string,
    ) {
        const newSpace =
            await createSpaceRequest(name);

        setSpaces((currentSpaces) => [
            newSpace,
            ...currentSpaces,
        ]);

        return newSpace;
    }


    async function deleteSpace(
        spaceId: number,
    ) {
        await deleteSpaceRequest(spaceId);

        setSpaces((currentSpaces) =>
            currentSpaces.filter(
                (space) =>
                    space.id !== spaceId,
            ),
        );
    }


    async function updateSpace(
        spaceId: number,
        name: string,
    ) {
        const updatedSpace =
            await updateSpaceRequest(
                spaceId,
                name,
            );

        setSpaces((currentSpaces) =>
            currentSpaces.map((space) =>
                space.id === spaceId
                    ? updatedSpace
                    : space,
            ),
        );

        return updatedSpace;
    }


    useEffect(() => {
        loadSpaces();
    }, []);


    return {
        spaces,
        loading,
        error,
        loadSpaces,
        createSpace,
        updateSpace,
        deleteSpace,
    };
}