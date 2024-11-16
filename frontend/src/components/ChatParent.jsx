import { useState, useEffect } from "react";
import Chat from "./Chat";
import { useNavigate } from 'react-router-dom';
import { fetchChats } from "./services";


export function ChatParent(){
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        getChats();
    }, []);

    async function getChats() {
        const data = await fetchChats()
        setChats(data);
    }

    const handleAction = async (chat) =>{
      navigate(`/messages/${chat.id}`)
    }

      return (
        <div>
          <h1></h1>       
            <div>
              {chats.map(chat => (
                <Chat key={chat.id} chat={chat} onAction={handleAction} />
              ))}
            </div>
        </div>
      )
};
export default ChatParent;