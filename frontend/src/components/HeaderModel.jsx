import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/header.css/"


function Header(){
    const navigate = useNavigate()

    const handleNavigation = (path) => {
        navigate(path);
      };

      

    return (
      <div className="header-container">
        <header className="site-header py-3">
      <div className="container-fluid d-flex align-items-center">
        <div className="d-flex align-items-center">
        <div className="logo " onClick={() => handleNavigation('/')}>
          TeamUp
        </div>
        <div className="create-post-icon nav-item">
        <a className="create-icon nav-link" onClick={() => handleNavigation('/apply')}>
        <i class=" fa-regular fa-square-plus"></i>
          </a>
          </div>
        </div>
        
        <nav>   
          <ul className="nav">
          
            <li className="nav-item ">
              <a className="nav-link " onClick={() => handleNavigation('/')}>
              <i className="fa-solid fa-bell"></i>
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link " onClick={() => handleNavigation('/chats')}>
                <i className="fa-solid fa-message"></i>
              </a>
              </li>
            <li className="nav-item position-relative ">
              <a className="nav-link " onClick={() => handleNavigation('/profile')}>
                <i className="fa-solid fa-user"></i>
              </a>
              <span className="tooltip-text">
              <li className="nav-item ">
              <a className="nav-link " onClick={() => handleNavigation('/logout')}>
                Sign Out
              </a>
            </li>
            </span>
              </li>
            
              
          </ul>
        </nav>
        
      </div>
    </header>
    <div className="subheader-container">
     <h2 className="subheader-title">Connect with fellow students to collaborate on projects!</h2>
     <p className="subheader-title-caption"> Build your resume, and gain hands-on experience. Post your ideas, find teammates, and create something amazing together.</p>
    </div>
    </div>
    )
}

export default Header;