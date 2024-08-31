import React from "react";
import "../styles/Post.css"

import { useNavigate } from 'react-router-dom';



const Post =({post, onAction}) => {

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

    const contentThreshold = 200;
    return (
        
        <div className="post-box clickable-post"
        onClick={handleViewPost}
        >
            
            
            <div className="post-header">
            <p className="post-title">{post.title}</p>
            <p className="post-category">{categoryLabels[post.category]}</p>
            </div>
            
            

            <div className="post-content">
                {post.desc.length > contentThreshold ? (
                    <>
                <p>{post.desc.substring(0,100)}</p>
                <div className="fade-out"></div>
                </>
                ):(
                    <p>{post.desc}</p>
                )}
            </div>
            
            
            
            <div class="post-footer">
            <p 
            className="post-username text-primary text-decoration-underline"
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