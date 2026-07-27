import { Routes, Route } from "react-router-dom";

import HomePage from "../page_components/HomePage";
import LoginPage from "../page_components/LoginPage";
import RegisterPage from "../page_components/RegisterPage";
import NotFoundPage from "../page_components/NotFoundPage";


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
                path="*"
                element={<NotFoundPage />}
            />

        </Routes>
    );
}


export default AppRouter;