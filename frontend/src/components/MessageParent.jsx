import { useState, useEffect } from "react";
import api from "../api";
import Message from "./Message";
import { useParams } from 'react-router-dom';


function MessagesParent(){
    const [messages, setMessages] = useState([]);
    // const [showMessages, setShowMessages] = useState(false);
    // const [chat, setChat] = useState([]);
    const { chatId:chatId} = useParams();
    console.log(chatId)
    useEffect(() => {
      getChatMessages();
      }, [chatId]);




  const getChatMessages = async () => {
    try{
        const response = await api.get(`/api/chats/${chatId}/messages/`)
        setMessages(response.data);
        console.log(response.data);
      }catch(error){
        console.log('Failed to fetch messages', error)
      }
  }

      return (
        <div>          
            <div>
              {messages.map(message => (
                <Message key={message.id} message={message}/>
              ))}
            </div>
        </div>
      )
};
export default MessagesParent;