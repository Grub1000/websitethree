import { Routes, Route } from "react-router-dom";

import HomePage from "../page_components/HomePage.tsx";
import LoginPage from "../page_components/LoginPage.tsx";
import RegisterPage from "../page_components/RegisterPage.tsx";
import NotFoundPage from "../page_components/NotFoundPage.tsx";
import Profile from "../page_components/Profile.tsx";
import ForgotPasswordPage from "../page_components/ForgotPasswordPage.tsx";
import ResetPasswordPage from "../page_components/ResetPasswordPage.tsx"
import ResumeAnalyzerToolPage from "../page_components/ResumeAnalyzerToolPage.tsx"

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

            <Route 
                path="/forgot-password" 
                element={ <ForgotPasswordPage /> } 
            />
            <Route path="/reset-password" element={ <ResetPasswordPage /> } />

            {/* Protected Routes */}

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/resume-analyzer"
                element={
                    <ProtectedRoute>
                        <ResumeAnalyzerToolPage />
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