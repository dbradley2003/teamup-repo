import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/header.css/"


function Header(){
    const navigate = useNavigate()

    const handleNavigation = (path) => {
        navigate(path);
      };

    return (
        <header className="site-header py-3">
      <div className="container-fluid d-flex align-items-center">
        <div className="logo text-white" onClick={() => handleNavigation('/')}>
          TeamUp
        </div>
        <nav>   
          <ul className="nav">
          
            <li className="nav-item ">
              <a className="nav-link text-white" onClick={() => handleNavigation('/login')}>
              <i className="fa-solid fa-bell"></i>
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link text-white" onClick={() => handleNavigation('/chats')}>
                <i className="fa-solid fa-message"></i>
              </a>
              </li>
            <li className="nav-item position-relative ">
              <a className="nav-link text-white" onClick={() => handleNavigation('/profile')}>
                <i className="fa-solid fa-user"></i>
              </a>
              <span className="tooltip-text">
              <li className="nav-item ">
              <a className="nav-link text-white" onClick={() => handleNavigation('/logout')}>
                Sign Out
              </a>
            </li>
            </span>
              </li>
              
          </ul>
        </nav>
        
      </div>
    </header>
    )
}

export default Header;