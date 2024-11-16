
import PostsParent from "../components/PostsParent";
import "../styles/Post.css"
import { useNavigate } from 'react-router-dom';
import { useIsAuthenticated } from "@azure/msal-react";
import { useMsal } from "@azure/msal-react";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import Typography from "@mui/material/Typography";
export function Home(){
    const navigate = useNavigate();
    return (
     
     <>
      <AuthenticatedTemplate>
        <div className="subheader-container mt-5">
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
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
            <Typography variant="h6">
              <center>Please sign-in to see your profile information.</center>
            </Typography>
          </UnauthenticatedTemplate>
        </>
       
    );
}
