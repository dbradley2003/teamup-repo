import { useState, useEffect, useRef } from "react";
import api from "../api";
import Message from "./Message";
import { useParams } from 'react-router-dom';
import { useSocket } from './SocketContext';
// import {fetchPosts} from './services'
import "../styles/MessageForm.css"

function MessagesParent(){
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState('');
    const { chatId:chatId} = useParams();
    const [Recipient, setRecipient] = useState('')
    const [Sender, setSender] = useState('')
    const socket = useSocket();

    
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    const messageContainerRef = useRef(null);
    const previousScrollHeightRef = useRef(0);
    const isInitialLoad = useRef(true);  // To track initial load
   


    useEffect(() => {

    getChatMessages(page, true);
      

    if (socket){
      socket.on('new_message', (message) =>{
        console.log(message.username, Sender)
        setMessages(prevMessages => [...prevMessages, message])
      })
      return () => {
        socket.off('new_message');
    };
    }
    
      }, [chatId, socket, page]);



  function sendMessage(message, recipient, sender) {
    if (socket){
    socket.emit('message', {message: message, recipient: recipient, sender: sender}, (response) => {
      console.log(response.message);
    })  
  }
  }



  const getChatMessages = async (page, isLoadingOlderMessages=false) => {
    if (loading || !hasMore) return;
    setLoading(true)
    try{
        const response = await api.get(`/api/chats/${chatId}/messages/?page=${page}`)
        setRecipient(response.data.recipient)
        setSender(response.data.sender)
        console.log(response.data)

        const messageContainer = messageContainerRef.current;
        const posBeforeReload = messageContainer.scrollTop
        const heightBeforeReload = messageContainer.scrollHeight
       
        setMessages(prevMessages => isLoadingOlderMessages 
          ? [...response.data.paginator.results, ...prevMessages] 
          : [...prevMessages, ...response.data.paginator.results]);

        setHasMore(response.data.paginator.next !== null)

        if (isLoadingOlderMessages && messageContainer) {
          
          const newScrollHeight = messageContainer.scrollHeight;
          const heightDifference = newScrollHeight - heightBeforeReload;
          messageContainer.scrollTop = posBeforeReload + heightDifference
      }else if (isInitalLoad.current){
        messageContainer.scrollTop = messageContainer.scrollHeight;
        isInitialLoad.current = false;
      }
        
        
        
        //console.log(response.data.recipient);
      }catch(error){
        console.log('Failed to load messages', error)
      } finally{
        setLoading(false)
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

    const handleScroll = () => {
      const messageContainer = messageContainerRef.current
    
      if (messageContainer.scrollTop === 0 && !loading && hasMore) {
          setPage(prevPage => prevPage + 1);
      }
  };

  
  useEffect(() => {
      const messageContainer = messageContainerRef.current;
      messageContainer.addEventListener('scroll', handleScroll);
    
      messageContainer.scrollTop = messageContainer.scrollHeight;

      // Cleanup
      return () => {
          messageContainer.removeEventListener('scroll', handleScroll);
      };
  }, []);
 
    
      return (
        <div className= "chat-message-container" >
            <div className="messages-list"  ref={messageContainerRef} > 
              {messages.map(message => (
                <Message 
                key={message.id} 
                message={message}
                isSender={message.username == Sender}
                />
               
              ))}
               {loading && <p> loading... </p>}
              
               
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