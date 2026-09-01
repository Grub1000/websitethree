import { refreshAccessToken } from "./authApi";


const API_URL =
    import.meta.env.VITE_AUTH_API_URL;


export async function getCurrentUser() {
    let accessToken =
        localStorage.getItem("access");


    if (!accessToken) {
        throw new Error(
            "No access token found",
        );
    }


    let response = await fetch(
        `${API_URL}/user/me/`,
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


        response = await fetch(
            `${API_URL}/user/me/`,
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
            "Unable to retrieve current user",
        );
    }


    return await response.json();
}