import React from "react";
import "../styles/Message.css"

const Message =({message,isSender}) => {


    const messageClass = isSender ? "message-sender" : "message-recipient";

    return (
        
        <div className={`message-container ${messageClass}`}>
           <strong className="message-details">
            {message.username}</strong>: {message.content}
        </div>
        
    );
}

export default Message