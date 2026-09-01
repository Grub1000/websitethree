const API_URL =
    import.meta.env.VITE_AUTH_API_URL;


export async function refreshAccessToken() {
    const refreshToken =
        localStorage.getItem("refresh");

    if (!refreshToken) {
        throw new Error(
            "No refresh token found",
        );
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
        },
    );


    if (!response.ok) {
        throw new Error(
            "Unable to refresh token",
        );
    }


    const data =
        await response.json();


    localStorage.setItem(
        "access",
        data.access,
    );


    if (data.refresh) {
        localStorage.setItem(
            "refresh",
            data.refresh,
        );
    }


    return data.access;
}


export async function loginUser(
    email: string,
    password: string,
) {
    const response = await fetch(
        `${API_URL}/auth/login/`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",
            },

            body: JSON.stringify({
                email,
                password,
            }),
        },
    );


    if (!response.ok) {
        throw new Error(
            "Login failed",
        );
    }


    return await response.json();
}


export async function googleLogin(
    credential: string,
) {
    const response = await fetch(
        `${API_URL}/auth/google/`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",
            },

            body: JSON.stringify({
                credential,
            }),
        },
    );


    if (!response.ok) {
        throw new Error(
            "Google login failed",
        );
    }


    const data =
        await response.json();


    localStorage.setItem(
        "access",
        data.access,
    );

    localStorage.setItem(
        "refresh",
        data.refresh,
    );


    return data;
}


export type RegisterData = {
    email: string;
    password: string;
};


export async function registerUser({
    email,
    password,
}: RegisterData) {
    const response = await fetch(
        `${API_URL}/auth/register/`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",
            },

            body: JSON.stringify({
                email,
                password,
            }),
        },
    );


    const data =
        await response.json();


    if (!response.ok) {
        const emailError =
            Array.isArray(data.email)
                ? data.email[0]
                : data.email;

        const passwordError =
            Array.isArray(data.password)
                ? data.password[0]
                : data.password;

        const generalError =
            Array.isArray(
                data.non_field_errors,
            )
                ? data.non_field_errors[0]
                : data.non_field_errors;


        throw new Error(
            emailError ||
                passwordError ||
                generalError ||
                data.detail ||
                "Registration failed.",
        );
    }


    return data;
}