import { Routes, Route } from "react-router-dom";

import HomePage from "../page_components/HomePage.tsx";
import LoginPage from "../page_components/LoginPage.tsx";
import RegisterPage from "../page_components/RegisterPage.tsx";
import NotFoundPage from "../page_components/NotFoundPage.tsx";
import Profile from "../page_components/Profile.tsx";

import ProtectedRoute from "../routes/ProtectedRoute";

function AppRouter() {

    return (
        <Routes>

            <Route 
                path="/" 
                element={<HomePage />}
            />

            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/register"
                element={<RegisterPage />}
            />

            {/* Protected Routes */}

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            {/* 404 */}

            <Route
                path="*"
                element={<NotFoundPage />}
            />

        </Routes>
    );
}


export default AppRouter;