import React from "react";

const Message =({message}) => {


    return (
        
        <div className="message-container">
            <p className="message-title">{message.author.username}</p>
            <p className="message-content">{message.content}</p>
        </div>
        
    );
}

export default Message