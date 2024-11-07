import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// MSAL imports
import { EventType, PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authconfig.js";
import { BrowserRouter } from 'react-router-dom';



export const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback((event) => {
  if (event && event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const account = event.payload.account;
    msalInstance.setActiveAccount(account);
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <BrowserRouter>
    <App instance={msalInstance}  /> 
    </BrowserRouter>
  </React.StrictMode>,
)

