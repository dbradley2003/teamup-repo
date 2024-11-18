import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import MenuItem from '@mui/material/MenuItem';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import {useNavigate} from 'react-router-dom'



export const SignOutButton = () => {
    const { instance } = useMsal();
    const [accountSelectorOpen, setOpen] = useState(false);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleLogout = async (logoutType) => {
        setAnchorEl(null);
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);

        if (logoutType === "popup") {
            await instance.logoutPopup({
            postLogoutRedirectUri: '/logout'
            })
        } else if (logoutType === "redirect") {
            instance.logoutRedirect();
        }
       
        navigate("/logout", { replace: true });
        
        
   
    }


    return (
        <div>
           
            
           
            
            
                
                <MenuItem onClick={() => handleLogout("popup")} key="logoutPopup">Logout</MenuItem>
                {/* <MenuItem onClick={() => handleLogout("redirect")} key="logoutRedirect">Logout using Redirect</MenuItem> */}
            {/* </Menu> */}
            
        </div>
    )
};