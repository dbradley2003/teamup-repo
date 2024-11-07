
import PostsParent from "../components/PostsParent";
import "../styles/Post.css"
import { useNavigate } from 'react-router-dom';
import { useIsAuthenticated } from "@azure/msal-react";
import { useMsal } from "@azure/msal-react";
function Home(){
    const { instance, accounts, inProgress } = useMsal();
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated(); 
    console.log(accounts)
    return (
     
     
    <div className="post-page">
            <div className="subheader-container">
            <h2 className="subheader-title">Connect with fellow students to collaborate on projects!</h2>
            <p className="subheader-title-caption"> Build your resume, and gain hands-on experience. Post your ideas, find teammates, and create something amazing together.</p>
     
      <div className="post-icon-container">
      <a className="circle-icon" onClick={() => navigate('/apply')}>
        <i className=" fa-solid fa-plus fa-2x"></i>
          </a>
          <div className="plus-text">
          Post Your Project 
          </div>
       
     </div>
    
     </div>
        <PostsParent />
        </div>
        
    );
}
export default Home;