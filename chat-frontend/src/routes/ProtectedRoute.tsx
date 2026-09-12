import {
    Navigate,
} from "react-router-dom";

import type {
    ReactNode,
} from "react";

import {
    useAuth,
} from "../context/AuthContext";


type ProtectedRouteProps = {
    children: ReactNode;
};


function ProtectedRoute({
    children,
}: ProtectedRouteProps) {
    const {
        isAuthenticated,
        loading,
    } = useAuth();


    if (loading) {
        return (
            <div>
                Loading...
            </div>
        );
    }


    if (!isAuthenticated) {
        return (
            <Navigate
                to="/relay/login"
                replace
            />
        );
    }


    return children;
}


export default ProtectedRoute;