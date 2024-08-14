import { useState, useEffect } from "react";
import api from "../api";
import Chat from "./Chat";
import { useNavigate } from 'react-router-dom';



function ChatParent(){
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();
  
    
    useEffect(() => {
        getChats();
    }, []);

    const getChats = async () => {
      
      try{
        const response = await api.get(`/api/chats/`)
        setChats(response.data);
        console.log(response.data);
      }catch(error){
        console.log('Failed to fetch messages', error)
      }
    }


    const handleAction = async (chat) =>{
      navigate(`/messages/${chat.id}`)
      
    }


      return (
        <div>
          <h1>Chats</h1>       
            <div>
              {chats.map(chat => (
                <Chat key={chat.id} chat={chat} onAction={handleAction} />
              ))}
            </div>
        </div>
      )
};
export default ChatParent;