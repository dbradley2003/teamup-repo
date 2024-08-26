import React from "react";
import api from "../api";
import  { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { editPost } from "./services";
import "../styles/PostForm.css"



function EditPostForm({post}) {

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    
        useEffect(() => {
          if (post) {
            setTitle(post.title);
            setDesc(post.desc)
          }else {
            setTitle('');
            setDesc('')
          }
        }, [post]); 
      
        const handleContentChange = (event) => {
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
        setLoading(true);  

        if (post){
          console.log('id provided')
          const data = editPost(post.id,title,desc)
          navigate("/");  
          }
        else{
          try {
            const response = await api.post(`/api/posts/`, {title, desc });  // Assuming title and desc are defined in the component's state
            console.log('Successfully created post', response.data);
            navigate("/");  // Assuming useNavigate has been defined and imported correctly
        } catch (error) {
            console.error('Error creating post:', error); // Properly log the error to the console
            alert('Failed to create post: ' + (error.response?.data?.message || error.message));  // More detailed error alert
        } finally {
            setLoading(false); 
        }
    };
        }
    
        

    return (
    
    <form onSubmit={handleSubmit} className="edit-form-container">  
        <h1>Edit Post</h1>
        <input className="edit-title-text" 
        type="text"
        id="title"
        name = 'title'
        maxLength="1000"
        value= {title}
        onChange= {handleContentChange}
        placeholder="Title"
        />
        <textarea className="edit-desc-text" 
        type="text"
        name = 'desc'
        value= {desc}
        onChange= {handleContentChange}
         placeholder="Description"
        />

        <button className="edit-submit-buton" type="submit">
            Submit
        </button>
    
    </form>
    )
}

export default EditPostForm;