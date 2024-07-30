
import PostsParent from "../components/PostsParent";
import { useNavigate } from 'react-router-dom';
import MessageParent from "../components/ChatParent";

function Home(){
    const navigate = useNavigate();
    
    const handleNavigate = (method) => {

        if (method == 'create'){
            navigate('/apply');
        }
        else if (method == 'messages'){
            navigate('/messages')
        }         
      };


    return (
        <div>
        <h2>Posts</h2>
        <PostsParent />
        <button onClick={() => handleNavigate('create')}>Create Post</button>
        <MessageParent />
        <button onClick={() => handleNavigate('messages')}>Messages</button>
        
        </div>
        
    );
}
export default Home;