import React from "react";

const Post =({post, onAction}) => {

    let applyButton = 'Apply'

    if (post.has_applied){
        applyButton = 'Applied'
    }

    return (
        
        <div className="post-container">
            <p className="post-title">{post.title}</p>
            <p className="post-content">{post.content}</p>
            <button className="app-button" onClick={() => onAction(post.id, 'apply')}> {applyButton} </button>
            {post.is_owner && (
                <>
                <button className="delete-button" onClick={() => onAction(post.id, 'delete')}>Delete</button>
                <button className="edit-button" onClick={() => onAction(post.id, 'edit')}>Edit</button>
                </>
                
            )}
        </div>
        
    );
}

export default Post