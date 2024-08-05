
import PostsParent from "../components/PostsParent";
import { useNavigate } from 'react-router-dom';
import MessagesParent from "../components/MessageParent";
import "../styles/Home.css"
import Socket from '../components/WebSocket'
import { SocketProvider } from '../components/SocketContext'

function Home(){
    const navigate = useNavigate();
    
    const handleNavigate = (method) => {

        if (method == 'create'){
            navigate('/apply');
        }
        else if (method == 'chats'){
            navigate('/chats')
        }         
      };


    return (
        <div>

        <Socket />
            
        <h2>Posts</h2>
        <PostsParent />
        <button className="create-post" onClick={() => handleNavigate('create')}>+</button>
        <button className="chats-button" onClick={() => handleNavigate('chats')}>chats</button>   
        </div>
    );
}
export default Home;