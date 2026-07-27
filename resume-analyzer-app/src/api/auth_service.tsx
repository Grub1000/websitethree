const API_URL =
    "https://jorgeramirez.net/resume-analyzer-app-api";


export async function refreshAccessToken() {

    const refreshToken =
        localStorage.getItem("refresh");

    if (!refreshToken) {
        throw new Error("No refresh token found");
    }

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

export async function loginUser(
    username: string,
    password: string
){

    const response = await fetch(
        `${API_URL}/auth/login/`,
        {
            method: "POST",

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify({
                username,
                password
            })
        }
    );


    if(!response.ok){

        throw new Error(
            "Login failed"
        );

    }


    return await response.json();
    
}