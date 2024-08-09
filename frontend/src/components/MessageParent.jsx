import { useState, useEffect } from "react";
import api from "../api";
import Message from "./Message";
import { useParams } from 'react-router-dom';
import { useSocket } from './SocketContext';
import "../styles/MessageForm.css"

function MessagesParent(){
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState('');
    const { chatId:chatId} = useParams();
    const [Recipient, setRecipient] = useState('')
    const [Sender, setSender] = useState('')
    const socket = useSocket();
   


    useEffect(() => {
      getChatMessages();

    if (socket){
      socket.on('new_message', (message) =>{
        console.log(message.username, Sender)
        setMessages(prevMessages => [...prevMessages, message])
      })
      return () => {
        socket.off('new_message');
    };
    }
    
      }, [chatId, socket]);


  function sendMessage(message, recipient, sender) {
    if (socket){
    socket.emit('message', {message: message, recipient: recipient, sender: sender}, (response) => {
      console.log(response.message);
    })  
  }
  }

  const getChatMessages = async () => {
    try{
        const response = await api.get(`/api/chats/${chatId}/messages/`)
        console.log(response.data)
        setMessages(response.data.messages);
        setRecipient(response.data.recipient)
        setSender(response.data.sender)
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
      sendMessage(content,Recipient,Sender)
      setContent('')
    } catch(error){
      console.error('Error sending message:', error); 
    }   
    };
    //Resume checking utilizing ChatGPT API
    //Login using University email
    //Finding matches through tokenization.
    
      return (
        <div className="chat-message-container">          
            <div className="messages-list">
              {messages.map(message => (
                <Message 
                key={message.id} 
                message={message}
                isSender={message.username == Sender}
                />
              ))}
              <div className="message-form">
                <form onSubmit={handleSubmit} className="send-message-form">
                  <label htmlFor="messageContent">New Message </label>
                <input 
                type="text"
                id="messageContent"
                name = 'messageContent'
                onChange= {handleMessage}
                value = {content}
                placeholder="Type your message here..."
                 />
                 <button type ="submit">Send</button>
                </form>
              </div>
            </div>
        </div>
      )
};
export default MessagesParent;