import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import { useAuth } from "../context/AuthContext";


interface ProtectedRouteProps {
    children: ReactNode;
}


function ProtectedRoute({
    children,
}: ProtectedRouteProps) {
    const {
        isAuthenticated,
        loading,
    } = useAuth();


    if (loading) {
        return <p>Loading...</p>;
    }


    if (!isAuthenticated) {
        return (
            <Navigate
                to="/ragspace/login"
                replace
            />
        );
    }


    return children;
}


export default ProtectedRoute;