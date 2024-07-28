
import PostsParent from "../components/PostsParent";
import { useNavigate } from 'react-router-dom';
import MessageParent from "../components/MessageParent";

function Home(){
    const navigate = useNavigate();
    
    const handleNavigate = () => {
        navigate('/apply');
      };

    const OpenMessages = () => {
    <MessageParent />
    }

    return (
        <div>
        <h2>Posts</h2>
        <PostsParent />
        <button onClick={handleNavigate}>Create Post</button>
        <MessageParent />
        
        </div>
        
    );
}
export default Home;