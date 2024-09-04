import React from "react";
import "../styles/Post.css"
import {useState,useEffect} from "react"

import { useNavigate} from 'react-router-dom';



const Post =({post,onAction,contentThreshold = 300} ) => {
    
    // const contentThreshold = 300;
    const shouldFade = post.desc.length > contentThreshold;
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const isTitleTooLong = post.title.length > 30;
    const truncatedTitle = isTitleTooLong ? post.title.substring(0,27) + "..." : post.title;

    const toggleDropdown = (e) => {
        e.stopPropagation();
        console.log('toggle')
        
        setIsDropdownOpen(prevState => !prevState);
        console.log('Dropdown state:', isDropdownOpen);
      };

    let applyButton = 'Collab'

    if (post.has_applied) {
        applyButton = 'Notified'
    }
    
    const categoryLabels = {
        tech: 'Technology',
        film: 'Film & Media'
    };

    const handleUsernameClick = (e) => {
        e.stopPropagation();
        navigate(`/profile/${post.owner}`);
      };

    const handleViewPost = () => {
        navigate(`/post/${post.id}`)
    }

    const handleEdit = (e) =>{
        e.stopPropagation();
        onAction(post,'edit')
    }

    const handleDelete = (e) => {
        e.stopPropagation();
        onAction(post,'delete')
    }

    const handleClickOutside = (e) => {
        if (isDropdownOpen && !e.target.closest('.options-container')) {
            closeDropdown();
        }
    };
    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isDropdownOpen]);
  

 
    return (
        
        <div className="post-box clickable-post"
        onClick={handleViewPost}
        >
            
            
            <div className="post-header">
            <div className="header-items">
            <span className="post-title">
                {truncatedTitle}
            </span>
            <p className="post-category">{categoryLabels[post.category]}</p>  
           
            
            </div> 
            
            </div>
           
         
            

            
               <div className={`post-content ${shouldFade ? 'fade-text' : ''}`} >
                    
                <p className="truncated-text">{post.desc.length > contentThreshold ? post.desc.substring(0, contentThreshold) + '...' : post.desc}

                </p>
                </div>
                
   
            
            
            
            
            <div className="post-footer">
            <div className="footer-items">
            <p 
            className="post-username"
            onClick = {handleUsernameClick}
            > 
            {post.owner_username} 
            </p>

            <p className="post-date">{post.formatted_date}</p>
            </div>
            <div className="options-container">
            <div className="options-icon" onClick= {toggleDropdown}>
                <i className="fa-solid fa-ellipsis"></i>
                </div>
                {isDropdownOpen && post.is_owner && (
                <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={handleEdit}>Edit</button>
                    <button className="dropdown-item" onClick={handleDelete}>Delete</button>
                </div>
                )}
                </div>

            {/* {post.is_owner && (
                <>
                <div className="icon-container">
                <a className="icon" onClick={() => onAction(post, 'delete')}>
                <i className="fa-solid fa-trash"></i>
                </a>
                <a className="icon" onClick={() => onAction(post, 'edit')}>
                <i className="fa-solid fa-pen"></i>
                </a>
                </div>
                </>
                
            )} */}
            
            </div>

                       {/* <button 
            className="view-post-button" 
            onClick={handleViewPost}> 
            View Full Post 
            </button> */}


            
        </div>
        
    );
}

export default Post