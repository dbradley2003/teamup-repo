import React from 'react';
import Header from "./HeaderModel";
import { Outlet } from 'react-router-dom';
import "../styles/layout.css"
import Typography from "@mui/material/Typography";
import NavBar from "../ui-components/NavBar";
import PrimarySearchAppBar from '../ui-components/NavBar';
import { useLocation } from 'react-router-dom';
export const Layout = (props) => {
  const location = useLocation();
  const hideHeaderRoutes = ['/login'];

  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
   
    <>
     {/* {!shouldHideHeader && ( */}
      <PrimarySearchAppBar />
     {/* )} */}
      <main>
        
        {props.children}
      </main>
    
    {/* </div> */}
    </>
  );
}
