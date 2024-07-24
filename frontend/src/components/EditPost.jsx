
import React from "react";
import PostForm from "../components/PostForm";
import api from "../api";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";



function EditPost() {

    const [post, setPost] = useState();
    const { postId: postId } = useParams();
   

    useEffect(() => {
    const getPost = () => {
        
        api
            .get(`/api/posts/${postId}/`)
            .then((res) => res.data)
            .then((data) => {
                setPost(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };
    if (postId){
        getPost()
    }
},[postId])
  
    return (
    <PostForm post={post}/>
    )
  }

  export default EditPost;