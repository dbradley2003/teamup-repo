import React from "react";
import { useState, useEffect } from "react";
import ReviewPost from "../components/ReviewPost"
import { useNavigate } from 'react-router-dom';
import "../styles/Post.css"
import "../styles/header.css/"
import api from "../api";
// import Pagination from "./Pagination"

function ReviewPosts(){
    const [posts,setPosts] = useState([]);

    useEffect(() =>{
        getReviewPosts()
    },[]);


    async function getReviewPosts (){
        try{
        const response = await api.get('/api/posts/review/')
        setPosts(response.data)
        } catch (error){
          console.error("Error fetching posts for review", error)
        }
      }

      return(
            <div className="review-posts container-fluid">

              <div className="row">
                    {posts.map(post => (
              <div className="col-md-4 mb-4" key={post.id}>
                 <div className="post-container">
                <ReviewPost post={post}/>
                </div>
                </div>
              
                
            ))}
            </div>
            </div>

            


      )





}

export default ReviewPosts;