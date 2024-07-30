import React from "react";

const Message =({message}) => {


    return (
        
        <div className="message-container">
            <p className="message-title">{message.author.username}</p>
        </div>
        
    );
}

export default Message