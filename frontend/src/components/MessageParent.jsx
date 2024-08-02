import { useState, useEffect } from "react";
import api from "../api";
import Message from "./Message";
import { useParams, useNavigate } from 'react-router-dom';


function MessagesParent(){
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState('');
    const { chatId:chatId} = useParams();
    const navigate = useNavigate();
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


  const handleMessage = (event) => {
    // const {name, value} = event.target;
    setContent(event.target.value);
    console.log(event.target.value);
  }

  const payload = {
    content: content,
    chat: chatId
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await api.post(`/api/chats/${chatId}/messages/`, payload)
      console.log('Successfully edited post', response.data);
      setContent('')
      getChatMessages();
    } catch(error){
      console.error('Error editing post:', error); // Properly log the error to the console
    }   
    };


      return (
        <div>          
            <div>
              {messages.map(message => (
                <Message key={message.id} message={message}/>
              ))}
              <div className="message-form">
                <form onSubmit={handleSubmit}>
                  New Message
                <input 
                type="text"
                id="messageContent"
                name = 'messageContent'
                onChange= {handleMessage}
                value = {content}
                 />
                 <button type ="submit">Send</button>
                </form>
              </div>
            </div>
        </div>
      )
};
export default MessagesParent;