import {
    useNavigate,
} from "react-router-dom";

import {
    useAuth,
} from "../../context/AuthContext";

import "./Header.css";


interface HeaderProps {
    onMenuClick: () => void;
}

function Header({
    onMenuClick,
}: HeaderProps) {

    const navigate =
        useNavigate();

    const {
        currentUser,
        logout,
    } = useAuth();


    function handleLogout() {
        logout();

        navigate(
            "/ragspace/login",
        );
    }


    const displayName =
        currentUser?.first_name ||
        currentUser?.email ||
        "Account";


    return (
        <header className="app-header">

            <div>
                <span className="app-header-label">
                    Workspace
                </span>
            </div>


            <div className="app-header-account">

                <span className="app-header-user">
                    {displayName}
                </span>


                <button
                    className="app-header-logout"
                    onClick={handleLogout}
                >
                    Sign out
                </button>

                <button
                    className="header-mobile-menu"
                    type="button"
                    aria-label="Open navigation"
                    onClick={onMenuClick}
                >
                    ☰
                </button>

            </div>

        </header>
    );
}


export default Header;