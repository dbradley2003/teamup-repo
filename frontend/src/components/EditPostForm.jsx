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
    const [category, setCategory] = useState('')
    const [showPopup, setShowPopup] = useState(false);

    
        useEffect(() => {
          if (post) {
            setTitle(post.title);
            setDesc(post.desc)
            setCategory(post.category)
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
            case 'category':
              setCategory(value)

        }
      }


    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);  

        if (post){
          const data = editPost(post.id,title,desc,category)
          setShowPopup(true)
          setTimeout(() => {
          setShowPopup(false);
          navigate('/');
          }, 3000);

          }
        }
    
        

    return (
    <div className="edit-post-container">
       {!showPopup && (
       <div className="edit-form-container"> 
    <form onSubmit={handleSubmit} className="edit-post-form"> 
      <div className="text-center" >
    <h2 className="editpost-head ">Edit Post</h2>
    </div>
        <div className="form-group ">
        <input 
        type="text"
        id="title"
        name = 'title'
        class ="form-control"
        maxLength="1000"
        value= {title}
        onChange= {handleContentChange}
        placeholder="Title"
        />
        </div>
        <div className="form-group ">
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
        <div className="form-group ">
        <textarea 
        type="text"
        class ="form-control"
        name = 'desc'
        rows={15}
        value= {desc}
        onChange= {handleContentChange}
         placeholder="Description"
        />
        </div>
        <div className="text-center" >
        <button className="post-form-button " type="submit">
            Submit
        </button>
        </div>
    
    </form>
    </div>
       )
      }
      {showPopup && (
        <div className="popup d-flex justify-content-center align-items-center">
            <p className="edit-popup-text">Post was edited and will be quickly reviewed before updated </p>
            </div>
    )
    }
    </div>
    )
}

export default EditPostForm;