import React from "react";
import { useState, useEffect } from "react";
import api from "../api";
import Post from "./Post";
import { ACCESS_TOKEN} from "../constants";
import { useNavigate } from 'react-router-dom';
import "../styles/Post.css"




function PostParent(){
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

  
    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        api
            .get("/api/posts/")
            .then((res) => res.data)
            .then((data) => {
                setPosts(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };
   
    const handleAction = async (post, method) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);


          if (method == 'apply'){
            try{
              const response = await api.post(`/api/posts/${post.id}/apply/`, {});
              console.log('Application created successfully:', response.data);
              alert('Application submitted successfully!');
              getPosts();
            } catch(error){
              console.error('Error during application:', error);
            }
          }
          if (method == 'delete'){
            try{
            await api.delete(`/api/posts/${post.id}/`);
            console.log('Post successfully deleted');
            getPosts();
          } catch(error){
            console.error('Error deleting post:', error);
          }
        }
          if (method == 'edit'){
            console.log('edited')
            navigate(`/edit-post/${post.id}`);
            
          }
        } 
      
    
    return (
        <div className="post-container">
            {posts.map(post => (
                <Post key={post.id} post={post} onAction={handleAction} />
            
            ))}
        </div>
    )
};
export default PostParent;



