
import PostsParent from "../components/PostsParent";
import { useNavigate } from 'react-router-dom';
import "../styles/Home.css"

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
            
        <h1 className="header-text">Posts</h1>
        <PostsParent />
        <button className="create-post" onClick={() => handleNavigate('create')}>+</button>
        <button className="chats-button" onClick={() => handleNavigate('chats')}>chats</button>   
        </div>
    );
}
export default Home;