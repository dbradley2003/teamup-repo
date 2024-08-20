import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/header.css/"


function Header(){
    const navigate = useNavigate()

    const handleNavigation = (path) => {
        navigate(path);
      };

    return (
        <header className="site-header">
      <div className="container">
        <div className="logo" onClick={() => handleNavigation('/')}>
          TeamUp
        </div>
        <nav>
          <ul>
            <li onClick={() => handleNavigation('/')}>Home</li>
            <li onClick={() => handleNavigation('/profile')}>Profile</li>
            <li onClick={() => handleNavigation('/login')}>Login</li>
          </ul>
        </nav>
      </div>
    </header>
    )
}

export default Header;