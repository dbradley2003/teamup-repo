import React from "react";

const Post =({post, onApply}) => {

    let applyButton = 'Apply'

    if (post.has_applied){
        applyButton = 'Applied'
    }

    return (
        
        <div className="post-container">
            <p className="post-title">{post.title}</p>
            <p className="post-content">{post.content}</p>
            <button className="app-button" onClick={onApply}> {applyButton} </button>
        </div>
        
    );
}

export default Post