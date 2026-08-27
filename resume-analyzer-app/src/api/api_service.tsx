import { refreshAccessToken } from "./auth_service";

const API_URL = import.meta.env.VITE_API_URL;


export async function apiFetch(
    endpoint: string,
    options: RequestInit = {}
) {

    let accessToken =
        localStorage.getItem("access");

    // console.log("Access Token:", accessToken);
    let response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,

            headers: {
                ...options.headers,

                "Authorization":
                    `Bearer ${accessToken}`,

                "Content-Type":
                    "application/json",
            },
        }
    );

    // Access token expired
    if (response.status === 401) {


        try {

            accessToken =
                await refreshAccessToken();

        } catch {

            localStorage.removeItem("access");
            localStorage.removeItem("refresh");

            window.location.href = "/resuscan/login";

            throw new Error("Session expired");

        }
        response = await fetch(
            `${API_URL}${endpoint}`,
            {
                ...options,

                headers: {
                    ...options.headers,

                    "Authorization":
                        `Bearer ${accessToken}`,

                    "Content-Type":
                        "application/json",
                },
            }
        );
    }

    return response;
}