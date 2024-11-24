
import { LogLevel } from "@azure/msal-browser";
// Config object to be passed to Msal on creation
export const msalConfig = {
    auth: {
        clientId: "be91ae3a-4817-4575-84ad-87d00f92d8c3",
        authority: 'https://login.microsoftonline.com/common/',
        redirectUri:  'https://teamupnow.org/'
        //postLogoutRedirectUri: "http://localhost:5173/login"
        
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true,
    },

    system: {
        allowNativeBroker: false, // Disables WAM Broker
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

export const loginRequest = {
    scopes: ["User.Read"]
};


