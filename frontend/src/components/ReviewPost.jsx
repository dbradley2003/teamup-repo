import React from "react";
import "../styles/Post.css"
import {useState,useEffect} from "react"
import "../styles/Review.css"
import { useNavigate} from 'react-router-dom';

export function ReviewPost({post}){

    const navigate = useNavigate();
    const categoryLabels = {
        tech: 'Technology',
        film: 'Film & Media'
    };

const handleViewPost = () =>{
    navigate(`/review/${post.id}`)
}


return (
        
    <div className="review-post-box clickable-post"
    onClick={handleViewPost}
    >
         <p className="review-title mt-2">
            {post.title}
        </p>
        <p className="review-post-owner mt-2">
        {post.owner_username}
        </p> 
        <p className="review-category mt-2">
        {categoryLabels[post.category]}
        </p>
       
        <p className="review-click mt-2">
        click box to view desc
        </p> 
        
        
        </div>
        
       
        
      
          
        
     
        

       
);
}
export default ReviewPost;