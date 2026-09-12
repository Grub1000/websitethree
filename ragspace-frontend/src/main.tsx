import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./styles/variables.css";
import "./styles/globals.css";

import App from "./App";

const GOOGLE_CLIENT_ID =
    import.meta.env.VITE_GOOGLE_CLIENT_ID;

import { AuthProvider } from "./context/AuthContext";

createRoot(
    document.getElementById("root")!,
).render(
    <StrictMode>
        <GoogleOAuthProvider
            clientId={GOOGLE_CLIENT_ID}
        >
            <AuthProvider>
                <App />
            </AuthProvider>
        </GoogleOAuthProvider>
    </StrictMode>,
);
