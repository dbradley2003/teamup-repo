import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { MsalProvider } from "@azure/msal-react";

// MSAL imports
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authconfig";
import { EventType } from "@azure/msal-browser";


export const msalInstance = new PublicClientApplication(msalConfig);




ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
    <App />
    </MsalProvider>
  </React.StrictMode>,
)

