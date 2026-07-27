import { Navigate } from "react-router-dom";


interface ProtectedRouteProps {
    children: React.ReactNode;
}


export default function ProtectedRoute({ children }: ProtectedRouteProps) {

    const accessToken = localStorage.getItem("access");


    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }


    return children;
}
