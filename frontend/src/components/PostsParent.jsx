
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
   
    const handleApply = async (postId) => {
        
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        try {
          const response = await api.post(`/api/posts/${postId}/apply/`, {});
          console.log('Application created successfully:', response.data);
          alert('Application submitted successfully!');
          getPosts();
         
          
        } catch (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error status:', error.response.status);
           
            switch (error.response.status) {
              case 400:
                alert(error.response.data.error);
                break;
              case 401:
                alert('Unauthorized: ' + error.response.data.message);
                break;
              case 403:
                alert('Forbidden: ' + error.response.data.message);
                break;
              case 404:
                alert('Not Found: ' + error.response.data.message);
                break;
              case 500:
                alert('Internal Server Error: ' + error.response.data.message);
                break;
              default:
                alert('Error: ' + error.response.data.message);
            }
          } else if (error.request) {
            // The request was made but no response was received
            console.error('Error request:', error.request);
            alert('No response received');
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
            alert('Error: ' + error.message);
          }
        }
      };
 
     
    
    return (
        <div>
            {posts.map(post => (
                <Post key={post.id} post={post} onApply={() => handleApply(post.id)} />
            
            ))}
        </div>
    )
};
export default PostParent;



