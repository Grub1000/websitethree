import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { BrowserRouter } from 'react-router-dom'

import "./styles/reset.css"

import "@fontsource-variable/space-grotesk";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";

import "./styles/reset.css";
import "./styles/tokens.css";
import "./styles/typography.css";
import "./styles/utilities.css";
import "./styles/global.css";


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
  ,
)
