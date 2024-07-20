
import { useState, useEffect } from "react";
import api from "../api";
import Post from "./Post";
import { ACCESS_TOKEN} from "../constants";

function PostParent(){
    const [posts, setPosts] = useState([]);
    

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
   
    const handleAction = async (postId, method) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);

          if (method == 'apply'){
            try{
              const response = await api.post(`/api/posts/${postId}/apply/`, {});
              console.log('Application created successfully:', response.data);
              alert('Application submitted successfully!');
              getPosts();
            } catch(error){
              console.error('Error during application:', error);
            }
          }
          if (method == 'delete'){
            try{
            await api.delete(`/api/posts/${postId}/`);
            console.log('Post successfully deleted');
            getPosts();
          } catch(error){
            console.error('Error deleting post:', error);
          }
        } 
        }
    
    return (
        <div>
            {posts.map(post => (
                <Post key={post.id} post={post} onAction={handleAction} />
            
            ))}
        </div>
    )
};
export default PostParent;



