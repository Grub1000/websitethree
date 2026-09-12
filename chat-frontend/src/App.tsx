import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";

// Component / Layout Imports
import RelayLayout from "./components/layout/RelayLayout";

// Page Component Imports
// import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";


function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/relay/login"
                    element={
                        <LoginPage />
                    }
                />
                <Route
                    path="/relay/register"
                    element={
                        <RegisterPage />
                    }
                />

                <Route
                    path="/relay"
                    element={
                        <ProtectedRoute>
                            <RelayLayout/>
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}


export default App;
