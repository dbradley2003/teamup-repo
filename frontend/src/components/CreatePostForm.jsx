import React from "react";
import  { useState} from 'react';
import { useNavigate } from "react-router-dom";
import { createPost } from "./services";

function CreatePostForm() {

const [title, setTitle] = useState('')
const [desc, setDesc] = useState('')
const navigate = useNavigate()
      
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
    createPost(title,desc)
    navigate("/");  
    };
        
return (
    <form onSubmit={handleSubmit} className="new-form-container">  
        <h1>Create Post</h1>
        <input className="new-title-text" 
        type="text"
        id="title"
        name = 'title'
        value= {title}
        onChange= {handleContentChange}
        placeholder="Title"
        />
        <textarea className="new-desc-text" 
        type="text"
        name = 'desc'
        value= {desc}
        onChange= {handleContentChange}
         placeholder="Description"
        />

        <button className="new-submit-buton" type="submit">
            Submit
        </button>
    
    </form>
    )
}

export default CreatePostForm;