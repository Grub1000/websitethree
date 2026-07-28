import { apiFetch } from "./api_service";

export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

export async function getCurrentUser(): Promise<User> {

    const response = await apiFetch("/user/me/");

    if (!response.ok) {
        throw new Error("Unable to retrieve current user.");
    }

    return await response.json();
}