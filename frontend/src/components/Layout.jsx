import React from 'react';
import Header from "./HeaderModel";
import { Outlet } from 'react-router-dom';
import "../styles/layout.css"
import Typography from "@mui/material/Typography";
import NavBar from "../ui-components/NavBar";
import PrimarySearchAppBar from '../ui-components/NavBar';
export const Layout = (props) => {


  return (
    <div className='layout-container'>
      <PrimarySearchAppBar />
      {/* <Header /> */}
      <main>
        {props.children}
      </main>
    
    </div>
  );
}
