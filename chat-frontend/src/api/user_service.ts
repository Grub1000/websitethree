import type { User } from "../types/auth";

import {
    AUTH_API_URL,
    refreshAccessToken,
} from "./api_client.ts";


export async function getCurrentUser(): Promise<User> {
    let accessToken =
        localStorage.getItem("access");

    let response = await fetch(
        `${AUTH_API_URL}/user/me/`,
        {
            headers: {
                Authorization:
                    `Bearer ${accessToken}`,
            },
        },
    );

    if (response.status === 401) {
        accessToken =
            await refreshAccessToken();

        if (!accessToken) {
            throw new Error(
                "Authentication failed.",
            );
        }

        response = await fetch(
            `${AUTH_API_URL}/user/me/`,
            {
                headers: {
                    Authorization:
                        `Bearer ${accessToken}`,
                },
            },
        );
    }

    if (!response.ok) {
        throw new Error(
            "Unable to load current user.",
        );
    }

    return response.json();
}