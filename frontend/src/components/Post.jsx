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
            <button className="post-button" onClick={() => onAction(post.id, 'apply')}> {applyButton} </button>
            {post.is_owner && (
                <>
                <button className="post-button" onClick={() => onAction(post.id, 'delete')}>Delete</button>
                <button className="post-button" onClick={() => onAction(post.id, 'edit')}>Edit</button>
                </>
                
            )}
        </div>
        
    );
}

export default Post