import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { useEffect } from "react";

export function exampleComponent() {
    const isAuthenticated = useIsAuthenticated();
    const {instance, inProgress} = useMsal()
  
    useEffect( async () => {
    if (!isAuthenticated && inProgress === InteractionStatus.None) {
       await instance.loginPopup();
    }
    }, [isAuthenticated, inProgress,instance]);
  }