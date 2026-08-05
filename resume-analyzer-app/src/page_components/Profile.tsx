// import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {

    // const navigate = useNavigate();

    const { logout } = useAuth();

    function handleLogout() {
        // navigate("/");
        logout();

        // navigate("resuscan/");
        window.location.href = "/resuscan/";
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

import { getCurrentUser } from "../api/user_service"

async function testCurrentUser() {

    try {

        const user = await getCurrentUser();

        console.log("Current User:", user);

    } catch (error) {

        console.error(error);

    }

}
