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

        </div>

    );

}
