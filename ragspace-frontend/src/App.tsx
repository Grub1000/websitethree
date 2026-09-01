import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import SpacePage from "./pages/SpacePage";

import AppLayout from "./components/layout/AppLayout.tsx"


function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>

                    {/* Public Routes */}

                    <Route
                        path="/ragspace/login"
                        element={<LoginPage />}
                    />

                    <Route
                        path="/ragspace/register"
                        element={<RegisterPage />}
                    />


                    {/* Protected Routes */}

                    <Route
                        path="/ragspace"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <DashboardPage />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/ragspace/spaces/:spaceId"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <SpacePage />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />


                    {/* Unknown Routes */}

                    <Route
                        path="*"
                        element={
                            <Navigate
                                to="/ragspace"
                                replace
                            />
                        }
                    />

                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}


export default App;