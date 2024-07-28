import { useState, useEffect } from "react";
import api from "../api";
import Message from "./Message";


function MessageParent(){
    const [messages, setMessages] = useState([]);
    const [showMessages, setShowMessages] = useState(false);
    
    
    useEffect(() => {
        getMessages();
    }, []);


    const getMessages = async () => {
        try{
        const response = await api.get("/api/messages/")
        setMessages(response.data);
        console.log(response.data);
        } catch(error){
            console.log('Failed to fetch messages', error)
        }
    }

    const toggleMessages = () => {
        setShowMessages(!showMessages);
      };

      return (
        <div>
          <button onClick={toggleMessages}>
            {showMessages ? 'Hide Messages' : 'Show Messages'}
          </button>
          {showMessages && (
            <div>
              {messages.map(message => (
                <Message key={message.id} message={message} />
              ))}
            </div>
          )}
        </div>
      )
};
export default MessageParent;