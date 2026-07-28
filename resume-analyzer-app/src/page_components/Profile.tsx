import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {

    const navigate = useNavigate();

    const { logout } = useAuth();

    function handleLogout() {

        logout();

        navigate("/login");

    }
    
    return (

        <div>

            <h1>Profile</h1>

            <button onClick={handleLogout}>
                Logout
            </button>
            <button onClick={testCurrentUser}>
                Test User
            </button>
        </div>

    );

}

import { apiFetch } from "../api/api_service";

async function testCurrentUser() {

    try {

        const response = await apiFetch(
            "/user/me/"
        );

        if (!response.ok) {
            throw new Error(
                "Unable to retrieve current user."
            );
        }

        const user = await response.json();

        console.log("Current User:", user);

    } catch (error) {

        console.error(error);

    }

}
