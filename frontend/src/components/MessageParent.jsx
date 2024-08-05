import { useState, useEffect } from "react";
import api from "../api";
import Message from "./Message";
import { useParams } from 'react-router-dom';
import { useSocket } from './SocketContext';

function MessagesParent(){
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState('');
    const { chatId:chatId} = useParams();
    const [Recipient, setRecipient] = useState('')
    const socket = useSocket();
   


    useEffect(() => {
      getChatMessages();


    //   const handleNewMessage = (message) => {
    //     console.log('received')
    //     setMessages(prevMessages => [...prevMessages, message])
    //   }
    socket.on('new_message', (message) =>{
      console.log(message)
      setMessages(prevMessages => [...prevMessages, message])
    })

    //   socket.on('new_message', handleNewMessage);

      return () => {
        socket.off('new_message');
    };

      }, [chatId, socket]);


  


  function sendMessage(message, recipient) {
    socket.emit('message', {message: message, recipient: recipient}, (response) => {
      console.log(response.message);
    })
    
  }

  const getChatMessages = async () => {
    try{
        const response = await api.get(`/api/chats/${chatId}/messages/`)
        console.log(response.data)
        setMessages(response.data.messages);
        setRecipient(response.data.recipient)
        console.log(response.data.recipient);
      }catch(error){
        console.log('Failed to fetch messages', error)
      }
  }

  const handleMessage = (event) => {
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
      console.log('Successfully sent message', response.data);
      setContent(response.data.content)
      sendMessage(content,Recipient)
      setContent('')
    } catch(error){
      console.error('Error sending message:', error); 
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