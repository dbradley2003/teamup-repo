import React from "react";
import  { useState} from 'react';
import { useNavigate } from "react-router-dom";
import { createPost } from "./services";

import '../styles/PostForm.css';

function CreatePostForm() {

const [title, setTitle] = useState('')
const [desc, setDesc] = useState('')
const [category, setCategory] = useState('tech')
const navigate = useNavigate()
      
const handleContentChange = (event) => {
    const {name, value} = event.target;
    switch (name) {
        case 'title':
            setTitle(value);
            break;
        case 'desc':
            setDesc(value);
            autoResizeTextarea(event.target);
            break;
        case 'category':
            setCategory(value)
            break;
        }
      }

    const handleSubmit = async (e) => {
    e.preventDefault();
    createPost(title,desc,category)
    navigate("/");  
    };

    const autoResizeTextarea = (textarea) => {
        textarea.style.height = 'auto'; 
        textarea.style.height = `${textarea.scrollHeight}px`;
    };
        
return (
    <div className="form-wrapper">
    
    <form onSubmit={handleSubmit} className="create-post-form">
        
        <h2 className="newpost-head">Create a New Post</h2>
        
        <div className="form-group mt-2">
        <input
        type="text"
        id="title"
        name = 'title'
        class ="form-control"
        value= {title}
        onChange= {handleContentChange}
        placeholder="Title"
        />
        </div>
        <div className="form-group mt-2">
        <select
        name="category"
        class ="form-select"
        value={category}
        onChange= {handleContentChange}
        >
            
        <option value="tech">Technology</option>
        <option value="film">Film & Media</option>
       </select>
       </div>
        <div className="form-group mt-2">
        <textarea
        type="text"
        rows= {20}
        name = 'desc'
        class ="form-control"
        value= {desc}
        onChange= {handleContentChange}
        placeholder="Description"
        style={{ overflow: 'hidden' }}
        />
        </div>
        
        <button className="post-form-button mt-2" type="submit">
            Submit
        </button>
    
    </form>
    </div>
    )
}

export default CreatePostForm;