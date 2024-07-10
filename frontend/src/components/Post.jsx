import React from "react";

function Post({post, onApply}) {

    const handleApply = () => {
        onApply(post.id)
    }

    return (
        <div className="post-container">
            <p className="post-title">{post.title}</p>
            <p className="post-content">{post.content}</p>
            <button className="app-button" onClick={handleApply}> Apply</button>
        </div>
    );
}

export default Post