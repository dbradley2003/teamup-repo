import React from "react";

const Post =({post, onApply}) => {

    return (
        <div className="post-container">
            <p className="post-title">{post.title}</p>
            <p className="post-content">{post.content}</p>
            <button className="app-button" onClick={onApply}> Apply</button>
        </div>
    );
}

export default Post