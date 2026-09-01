const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL;
const RAGSPACE_API_URL = import.meta.env.VITE_RAGSPACE_API_URL;

export async function refreshAccessToken() {
    const refreshToken = localStorage.getItem("refresh");

    if (!refreshToken) {
        return null;
    }

    const response = await fetch(
        `${AUTH_API_URL}/auth/refresh/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refresh: refreshToken,
            }),
        },
    );

    if (!response.ok) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        return null;
    }

    const data = await response.json();

    localStorage.setItem("access", data.access);

    if (data.refresh) {
        localStorage.setItem("refresh", data.refresh);
    }

    return data.access;
}

export async function apiFetch(
    endpoint: string,
    options: RequestInit = {},
) {
    const accessToken = localStorage.getItem("access");

    const headers = new Headers(options.headers);

    if (!headers.has("Content-Type") && options.body) {
        headers.set("Content-Type", "application/json");
    }

    if (accessToken) {
        headers.set(
            "Authorization",
            `Bearer ${accessToken}`,
        );
    }

    let response = await fetch(
        `${RAGSPACE_API_URL}${endpoint}`,
        {
            ...options,
            headers,
        },
    );

    if (response.status === 401) {
        const newAccessToken =
            await refreshAccessToken();

        if (!newAccessToken) {
            return response;
        }

        headers.set(
            "Authorization",
            `Bearer ${newAccessToken}`,
        );

        response = await fetch(
            `${RAGSPACE_API_URL}${endpoint}`,
            {
                ...options,
                headers,
            },
        );
    }

    return response;
}

export { AUTH_API_URL, RAGSPACE_API_URL };