import React from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect } from "react";

import { getSinglePost } from './services';
import {fetchPosts, deletePost, applyToPost} from "./services"
import {Modal, Form, Button, FormGroup} from 'react-bootstrap'
import '../styles/FullPostView.css';
import '../styles/MessageModal.css';
import api from "../api";

const ReviewFullView = () =>{

    const { postId } = useParams();
    const [username, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        getReviewPost();
        
      },[] );

    async function getReviewPost (){
        const response = await api.get(`/api/posts/${postId}/`)
        console.log(response.data)
        setTitle(response.data.title)
        setDesc(response.data.desc)
        setUsername(response.data.owner_username)
    
      }

      const goBack = () =>{
        navigate('/review')
      }

      const rejectPost = ()=>{
        const response = api.put(`/api/posts/${postId}/`, {'status':'rejected'})
        navigate('/review')
      }

      const acceptPost = ()=>{
        const response = api.put(`/api/posts/${postId}/`, {'status':'approved'})
        navigate('/review')
      }

      return(
        <div className='view-post container  mt-4'>
        
       
      
        <div className='container'>
            <div className='row justify-content-center'>
            <div className='col-md-12'>
          
        <h1 className='display-4 mt-2'>{title}</h1>
        <div className="text-center text-muted">
        <span>by {username}</span>
        </div>
        {/* <h6 className='text-creator'>By: {username} </h6> */}
        <p className='mt-4'>{desc}</p>

        <div className='review-choices-button d-flex flex-direction-row align-content-center justify-content-center mt-4'>
        <button className='accept review-button mt-2 py-2 me-4' onClick={acceptPost} > Accept </button>
        <button className='reject review-button mt-2' onClick={rejectPost} > Reject </button>
        </div>

        <div className='text-center'>
        <button className='review-button mt-4' onClick={goBack}> Back to Review </button>
        </div>

  
          </div>
        </div>
        </div>
        </div>
       
        

      )

}

export default ReviewFullView;