import React from "react";
import "../styles/Post.css"

import { useNavigate } from 'react-router-dom';



const Post =({post,contentThreshold = 300, onAction}) => {
    
    // const contentThreshold = 300;
    const shouldFade = post.desc.length > contentThreshold;
    const navigate = useNavigate();

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

 
    return (
        
        <div className="post-box clickable-post"
        onClick={handleViewPost}
        >
            
            
            <div className="post-header">
            <p className="post-title">{post.title}</p>
            {/* <p className="post-category">{categoryLabels[post.category]}</p> */}
            </div>
            
            

            
               <div className={`post-content ${shouldFade ? 'fade-text' : ''}`} >
                    
                <p className="truncated-text">{post.desc.length > contentThreshold ? post.desc.substring(0, contentThreshold) + '...' : post.desc}

                </p>
                </div>
                
   
            
            
            
            
            <div class="post-footer">
            <p 
            className="post-username"
            onClick = {handleUsernameClick}
            > 
            {post.owner_username} 
            </p>

            <p className="post-date">{post.formatted_date}</p>

            {post.is_owner && (
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
                
            )}
            
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