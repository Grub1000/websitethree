import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.tsx'

import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/resuscan">
      <GoogleOAuthProvider clientId="160501148606-hfpsuvn2198rb5ad25teg5luqt8jkq5r.apps.googleusercontent.com">
        <AuthProvider>
          <App />
      </AuthProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
