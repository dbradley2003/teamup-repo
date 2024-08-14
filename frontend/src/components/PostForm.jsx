import React from "react";
import api from "../api";
import  { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";




function PostForm({post}) {

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    
        // Initialize title state to empty string
        // Update title state when post prop changes
        useEffect(() => {
          // Check if post is provided and has a title
          if (post) {
            setTitle(post.title);
            setDesc(post.desc)
          } else {
            // Reset title if no post or no title in post
            setTitle('');
            setDesc('')
          }
        }, [post]);  // Depend on post to trigger effect
      
        const handleTitleChange = (event) => {
          const {name, value} = event.target;
          switch (name) {
            case 'title':
              setTitle(value);
              break;
            case 'desc':
              setDesc(value);
              break;
        }
      }


    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);  // Assuming you uncomment and define a setLoading function

        if (post){
          console.log('id provided')
          console.log(post.id)
          try {
            const response = await api.put(`/api/posts/${post.id}/`, {title, desc})
            console.log('Successfully edited post', response.data);
            navigate("/");  // Assuming useNavigate has been defined and imported correctly
          } catch(error){
            console.error('Error editing post:', error); // Properly log the error to the console
          }
        }else{
          try {
            const response = await api.post(`/api/posts/`, {title, desc });  // Assuming title and desc are defined in the component's state
            console.log('Successfully created post', response.data);
            navigate("/");  // Assuming useNavigate has been defined and imported correctly
        } catch (error) {
            console.error('Error creating post:', error); // Properly log the error to the console
            alert('Failed to create post: ' + (error.response?.data?.message || error.message));  // More detailed error alert
        } finally {
            setLoading(false);  // Ensure loading state is reset whether the request succeeds or fails
        }
    };
        }
    
        

    return (<form onSubmit={handleSubmit} className="form-container">  
        Submit
        <input 
        type="text"
        id="title"
        name = 'title'
        value= {title}
        onChange= {handleTitleChange}
        // placeholder="Title"
        />
        <textarea 
        type="text"
        name = 'desc'
        value= {desc}
        onChange= {handleTitleChange}
         placeholder="Description"
        />

        <button type="submit">
            Submit
        </button>
    
    </form>
    )
}

export default PostForm;