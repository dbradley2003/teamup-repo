import { Navigate } from "react-router-dom";
import  {jwtDecode}  from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useIsAuthenticated } from "@azure/msal-react";





import { useIsAuthenticated } from '@azure/msal-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();

  // Redirect to homepage if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;



//     const [isAuthorized, setIsAuthorized] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         auth().catch(() => setIsAuthorized(false))
//     }, [])

//     const refreshToken = async () => {
//         const refreshToken = localStorage.getItem(REFRESH_TOKEN);

//         if (!refreshToken){
//             setIsAuthorized(false)
//             return false;
//         }
//         try {
//             const res = await api.post("/api/token/refresh/", {
//                 refresh: refreshToken,
//             });
//             if (res.status === 200) {
//                 console.log('successfully refreshed', res.data.access)
//                 localStorage.setItem(ACCESS_TOKEN, res.data.access)
//                 setIsAuthorized(true)
//             } else {
//                 setIsAuthorized(false)
//             }
//         } catch (error) {
//             console.log(error);
//             setIsAuthorized(false);
//         }
//     };

//     const auth = async () => {
//         const token = localStorage.getItem(ACCESS_TOKEN);
//         if (!token) {
//             localStorage.removeItem(ACCESS_TOKEN);
//             localStorage.removeItem(REFRESH_TOKEN);
//             setIsAuthorized(false);
//             return;
//         }
//         const decoded = jwtDecode(token);
//         const tokenExpiration = decoded.exp;
//         const now = Date.now() / 1000;

//         if (tokenExpiration < now) {
//             console.log('Calling token refresh')
//             await refreshToken();
//         } else {
//             setIsAuthorized(true);
            
//         }
//     };

//     if (isAuthorized === null) {
//         return <p>Loading.. </p>; // Loading state while authorization is being checked
//       }

//     return isAuthorized ? children : <Navigate to="/login" />;
// }