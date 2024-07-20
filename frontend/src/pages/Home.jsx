
import PostsParent from "../components/PostsParent";
import { useNavigate } from 'react-router-dom';
import "../styles/Home.css"

function Home(){
    const navigate = useNavigate();
    
    const handleNavigate = () => {
        navigate('/apply');
      };

    return (
        <div>
        <h2>Posts</h2>
        <PostsParent />
        <button className="create-post" onClick={handleNavigate}>+</button>
        </div>
        
    );
}
export default Home;