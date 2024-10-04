import React from 'react';
import Header from "./HeaderModel";
import { Outlet } from 'react-router-dom';
import { useIsAuthenticated } from "@azure/msal-react";

function Layout(props) {
  const isAuthenticated = useIsAuthenticated();
  return (
    <div>
      <Header />
      <main>
        <Outlet/>
      </main>
      {props.children}
    </div>
  );
}

export default Layout;