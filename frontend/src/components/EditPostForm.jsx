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
          console.log('id provided')
          const data = editPost(post.id,title,desc,category)
          navigate("/");  
          }
        }
    
        

    return (
    <div className="edit-form-wrapper">
    <form onSubmit={handleSubmit} className="edit-post-form">  
    <h2 className="editpost-head ">Edit Post</h2>
        <div className="form-group mt-2">
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
        class ="form-control"
        name = 'desc'
        rows={15}
        value= {desc}
        onChange= {handleContentChange}
         placeholder="Description"
        />
        </div>

        <button className="post-form-button mt-2" type="submit">
            Submit
        </button>
    
    </form>
    </div>
    )
}

export default EditPostForm;