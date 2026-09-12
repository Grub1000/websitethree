import {
    AUTH_API_URL,
} from "./api_client.ts";


type LoginResponse = {
    access: string;
    refresh: string;
};


export async function loginUser(
    email: string,
    password: string,
): Promise<LoginResponse> {
    const response = await fetch(
        `${AUTH_API_URL}/auth/login/`,
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
            "Invalid email or password.",
        );
    }

    return response.json();
}


export async function googleLogin(
    credential: string,
) {
    const response = await fetch(
        `${AUTH_API_URL}/auth/google/`,
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
            "Google authentication failed.",
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




// type RegisterResponse = {
//     id?: number;
//     username?: string;
//     email?: string;
// };


export async function registerUser(
    email: string,
    password: string,
) {
    const response = await fetch(
        `${AUTH_API_URL}/auth/register/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        },
    );

    const data = await response.json();

    if (!response.ok) {
        const error = new Error(
            "Unable to create account.",
        );

        Object.assign(error, {
            data,
        });

        throw error;
    }

    return data;
}