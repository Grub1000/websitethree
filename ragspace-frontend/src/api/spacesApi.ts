import { apiFetch } from "./apiClient";

import type { Space } from "../types/space";


export async function getSpaces(): Promise<Space[]> {
    const response = await apiFetch("/spaces/");

    if (!response.ok) {
        throw new Error(
            "Unable to load Spaces.",
        );
    }

    return await response.json();
}


export async function createSpace(
    name: string,
): Promise<Space> {
    const response = await apiFetch(
        "/spaces/",
        {
            method: "POST",

            body: JSON.stringify({
                name,
            }),
        },
    );

    if (!response.ok) {
        throw new Error(
            "Unable to create Space.",
        );
    }

    return await response.json();
}


export async function deleteSpace(
    spaceId: number,
) {
    const response = await apiFetch(
        `/spaces/${spaceId}/`,
        {
            method: "DELETE",
        },
    );

    if (!response.ok) {
        throw new Error(
            "Unable to delete Space.",
        );
    }
}


export async function updateSpace(
    spaceId: number,
    name: string,
): Promise<Space> {
    const response = await apiFetch(
        `/spaces/${spaceId}/`,
        {
            method: "PATCH",
            body: JSON.stringify({
                name,
            }),
        },
    );

    if (!response.ok) {
        throw new Error(
            "Unable to update Space.",
        );
    }

    return await response.json();
}


export async function getSpace(
    spaceId: number,
): Promise<Space> {
    const response = await apiFetch(
        `/spaces/${spaceId}/`
    );

    if (!response.ok) {
        throw new Error(
            "Unable to load Space."
        );
    }

    return response.json();
}