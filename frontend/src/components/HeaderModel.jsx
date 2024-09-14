import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/header.css/"
import { useState, useEffect, useRef } from "react";


function Header(){
    const navigate = useNavigate()
    const [menuOpen,setMenuOpen] = useState(false)
    const menuRef = useRef(null);

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
        <div className="logo " onClick={() => handleNavigation('/')}>
          TeamUp
        </div>

        
        
        <div className="plus-icon  d-flex justify-content-center align-items-center">
        <a className="circle-icon" onClick={() => handleNavigation('/apply')}>
          
        <i class=" fa-solid fa-plus fa-2x"></i>
          </a>
         
          </div>
          <div className="plus-icon-text">
          Post Your Project 
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
              <a className="mobile-nav-link" onClick={() => handleNavigation('/logout')}> Sign Out </a>
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
            <li className="profile nav-item position-relative ">
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
        
        
      
    </header>
    
    </div>
    )
}

export default Header;