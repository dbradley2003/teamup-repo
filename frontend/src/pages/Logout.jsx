import React, { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { BrowserUtils } from "@azure/msal-browser";
import CircularProgress from "@mui/material/CircularProgress";
import {useNavigate} from 'react-router-dom'
export function Logout() {
    const { instance } = useMsal();
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                // Initiate logout redirect
                await instance.logoutPopup({
                    account: instance.getActiveAccount(),
                    onRedirectNavigate: () => !BrowserUtils.isInIframe(), // Prevent navigation in iframe
                });
            } catch (error) {
                console.error("Logout failed:", error);
                // Fallback to manual navigation if logout fails
                navigate("/login", { replace: true });
            }
        };

        performLogout();
    }, [instance, navigate]);

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
        <p>Logging out...</p>
    </div>
    )
}