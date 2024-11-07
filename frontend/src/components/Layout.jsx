import React from 'react';
import Header from "./HeaderModel";
import { Outlet } from 'react-router-dom';
import { useIsAuthenticated } from "@azure/msal-react";
import "../styles/layout.css"

function Layout({props}) {
  const isAuthenticated = useIsAuthenticated();
  return (
    <div className='layout-container'>
      <Header />
      <main>
        <Outlet/>
      </main>
      {props}
    </div>
  );
}

export default Layout;