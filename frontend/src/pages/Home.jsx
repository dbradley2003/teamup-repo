
import PostsParent from "../components/PostsParent";
import { useNavigate } from 'react-router-dom';
import "../styles/Post.css"

function Home(){
    


    return (
        <div className="homepage-container">
        <PostsParent />
        </div>
    );
}
export default Home;