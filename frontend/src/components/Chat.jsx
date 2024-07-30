import React from "react";
import "../styles/Chat.css"

const Chat =({chat, onAction}) => {


    return (
        
        <div className="chat-container" onClick={() => onAction(chat)}>
            <p className="chat-name">{chat.name}</p>
        </div>
        
    );
}

export default Chat