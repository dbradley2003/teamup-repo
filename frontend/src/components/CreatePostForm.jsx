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
const [showPopup, setShowPopup] = useState(false);
      
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
    await createPost(title,desc,category)
    setShowPopup(true)
    setTimeout(() => {
        setShowPopup(false);
        navigate('/');
      }, 3000);
    };


        
return (
    <div className="create-post-container  ">
    
    
    {!showPopup && (

   <div className="post-form-container"> 
    <form onSubmit={handleSubmit} className="create-post-form">
        
        <h2 className="newpost-head">Create a New Post</h2>
        
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
        <textarea
        type="text"
        rows={15}
        name = 'desc'
        class ="form-control"
        value= {desc}
        onChange= {handleContentChange}
        placeholder="Description"
       
          
        />
        </div>

        <div className="text-center ">
        <button className="post-form-button" type="submit">
            Submit
        </button>
        </div>
    
    </form>
    </div>
     )
     }
    {showPopup && (
        <div className="popup d-flex justify-content-center align-items-center">
            <p className="popup-text">Post was created and sent to be reviewed! </p>
            </div>
    )
    }


    </div>
   
    )
}

export default CreatePostForm;