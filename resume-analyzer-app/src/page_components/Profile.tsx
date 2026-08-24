// import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// CSS Styling Import
import "../css/authentication_pages_css/Profile.css"

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
        <section className="ProfilePageWrapper">
            <h1 className="ProfilePageHeaderText">Profile</h1>
            <button className="ProfilePageLogoutButton" onClick={handleLogout}>
                Logout
            </button>
            <button className="ProfilePageTestUserButton" onClick={testCurrentUser}>
                Test User
            </button>
        </section>
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
