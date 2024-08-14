import React from "react";
import "../styles/Post.css"

const Post =({post, onAction}) => {

    let applyButton = 'Apply'

    if (post.has_applied){
        applyButton = 'Applied'
    }

    return (
        
        <div className="post-box">
            <p className="post-title">{post.title}</p>
            <p className="post-content">{post.desc}</p>
            <button className="post-button" onClick={() => onAction(post, 'apply')}> {applyButton} </button>
            {post.is_owner && (
                <>
                <button className="post-button" onClick={() => onAction(post, 'delete')}>Delete</button>
                <button className="post-button" onClick={() => onAction(post, 'edit')}>Edit</button>
                </>
                
            )}
        </div>
        
    );
}

export default Post