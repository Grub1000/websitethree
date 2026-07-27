const API_URL =
    "http://127.0.0.1:8000/resume-analyzer-app-api";


export async function refreshAccessToken() {

    const refreshToken =
        localStorage.getItem("refresh");


    const response = await fetch(
        `${API_URL}/auth/refresh/`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",
            },

            body: JSON.stringify({
                refresh: refreshToken,
            }),
        }
    );


    if (!response.ok) {

        throw new Error(
            "Unable to refresh token"
        );

    }


    const data =
        await response.json();

    // Save the new access token
    localStorage.setItem(
        "access",
        data.access
    );

    // Save the new refresh token if rotation is enabled
    if (data.refresh) {
        localStorage.setItem("refresh", data.refresh);
    }

    return data.access;
}