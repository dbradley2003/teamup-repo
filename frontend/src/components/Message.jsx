import React from "react";

const Message =({message}) => {


    return (
        
        <div className="message-container">
           <strong className="message-details">
            {message.author.username}</strong>: {message.content}
        </div>
        
    );
}

export default Message