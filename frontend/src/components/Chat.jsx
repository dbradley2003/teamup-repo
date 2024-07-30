import React from "react";

const Chat =({chat, onAction}) => {


    return (
        
        <div className="chat-container" onClick={onAction}>
            <p className="chat-name">{chat.name}</p>
        </div>
        
    );
}

export default Chat