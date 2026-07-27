import { refreshAccessToken } from "./auth_service";

const API_URL =
    "http://jorgeramirez.net/resume-analyzer-app-api";


export async function apiFetch(
    endpoint: string,
    options: RequestInit = {}
) {

    let accessToken =
        localStorage.getItem("access");


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


        accessToken =
            await refreshAccessToken();


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