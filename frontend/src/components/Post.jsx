import React from "react";
import "../styles/Post.css"

const Post =({post, onAction}) => {

    let applyButton = 'Collab'

    if (post.has_applied){
        applyButton = 'Notified'
    }

    const categoryLabels = {
        tech: 'Technology',
        film: 'Film & Media'
    };

    return (
        
        <div className="post-box">
            <p className="post-title">{post.title}</p>
            <p className="post-category">{categoryLabels[post.category]}</p>
            <p className="post-content">{post.desc}</p>
            
            <button className="post-button" onClick={() => onAction(post, 'apply')}> {applyButton} </button>
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
        
    );
}

export default Post