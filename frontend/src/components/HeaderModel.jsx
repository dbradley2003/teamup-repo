import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/header.css/"
import { useState, useEffect, useRef } from "react";
import {useMsal} from "@azure/msal-react"
import logo from "../assets/images/Teamuplogo.png"


function Header(){
    const navigate = useNavigate()
    const [menuOpen,setMenuOpen] = useState(false)
    const menuRef = useRef(null);
    const {instance} = useMsal();

    const handleLogout = async () => {
      const activeAccount = instance.getActiveAccount();
      if (!activeAccount) {
          console.error("No active account to log out");
          return;
      }

      await instance.logoutPopup({
          account: activeAccount,
          postLogoutRedirectUri: "http://localhost:5173/login",  // Use correct redirect URI
      });

      // Clear localStorage and sessionStorage
      localStorage.clear();
      sessionStorage.clear();

      navigate('/login')

      // Optionally clear cookies
  
  };
    

    const handleNavigation = (path) => {
        navigate(path);
      };

  
      const toggleMenu = () =>{
        setMenuOpen(!menuOpen)
        console.log('open')
      }

      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          console.log('menu open')
          setMenuOpen(false);
        }
      };

      useEffect(() => {
       
        if (menuOpen) {
          document.addEventListener('click', handleClickOutside);
        } else {
          document.removeEventListener('click', handleClickOutside);
        }
        return () => {
          document.removeEventListener('click', handleClickOutside); // Cleanup event listener
        };
      }, [menuOpen]);

      

    return (
      <div className="header-container">
        <header className="site-header py-3">
       <div className="d-flex align-items-center justify-content-center">

        <div className="logo-container">
       <img src={logo}  className="logo" onClick={() => handleNavigation('/')}/>
       <h1  className="logo-title">TeamUp</h1>
       </div>
      
         </div>
        <div className="hamburger-icon-container">
         <div className="hamburger-icon d-block d-lg-none" onClick={toggleMenu} ref={menuRef}>
        <i className="fa fa-bars fa-2x"></i>
        </div>

        <nav className={`mobile-nav ${menuOpen ? 'open' :'d-none'}`} >
          <ul>
            <li>
              <a className="mobile-nav-link" onClick={() => handleNavigation('/apply')}> Create Post </a>
            </li>
            <li>
              <a className="mobile-nav-link"  onClick={() => handleNavigation('/profile')}>Profile </a>
            </li>
            <li>
              <a className="mobile-nav-link" onClick={() => handleNavigation('/chats')}> Messages </a>
            </li>
            <li>
              <a className="mobile-nav-link" onClick={() => handleLogout()}> Sign Out </a>
            </li>
          </ul>
        </nav>
        </div>
             
              
      
        
        <nav>   
          <ul className="nav">
          
            <li className="nav-item ">
              <a className="nav-link ">
              <i className="fa-solid fa-bell"></i>
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link " onClick={() => handleNavigation('/chats')}>
                <i className="fa-solid fa-message"></i>
              </a>
              </li>
            <div className="profile nav-item position-relative ">
              <a className="nav-link " onClick={() => handleNavigation('/profile')}>
                <i className="fa-solid fa-user"></i>
              </a>
              <span className="tooltip-text">
              <li className="nav-item ">
              <a className="nav-link "onClick={() => handleLogout()}>
                Sign Out
              </a>
            </li>
            </span>
              </div>

            
              
          </ul>
          
        </nav>
        
      
    </header>
    
    </div>
    )
}

export default Header;