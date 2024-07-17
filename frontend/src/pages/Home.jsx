
import PostsParent from "../components/PostsParent";
import { useNavigate } from 'react-router-dom';

function Home(){
    const navigate = useNavigate();
    
    const handleNavigate = () => {
        navigate('/apply');
      };

    return (
        <div>
        <h2>Posts</h2>
        <PostsParent />
        <button onClick={handleNavigate}>Create Post</button>
        </div>
        
    );
}
export default Home;