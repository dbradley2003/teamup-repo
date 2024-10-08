import { LogLevel } from "@azure/msal-browser";

// Config object to be passed to Msal on creation
export const msalConfig = {
    auth: {
        clientId: "be91ae3a-4817-4575-84ad-87d00f92d8c3",
        authority: 'https://login.microsoftonline.com/common/',
        redirectUri: "http://localhost:5173/",
        post_logout_redirect_uri: "http://localhost:5173/login",
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    },
}
//     system: {	
//         loggerOptions: {	
//             loggerCallback: (level, message, containsPii) => {	
//                 if (containsPii) {		
//                     return;		
//                 }		
//                 switch (level) {
//                     case LogLevel.Error:
//                         console.error(message);
//                         return;
//                     case LogLevel.Info:
//                         console.info(message);
//                         return;
//                     case LogLevel.Verbose:
//                         console.debug(message);
//                         return;
//                     case LogLevel.Warning:
//                         console.warn(message);
//                         return;
//                     default:
//                         return;
//                 }	
//             }	
//         }	
//     }
// };



export const loginRequest = {
    scopes: ["User.Read"]
};

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};