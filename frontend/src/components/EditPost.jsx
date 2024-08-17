import React from "react";
import EditPostForm from "./EditPostForm";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getSinglePost } from "./services";


//Returns and sends Post object to edit-post-form to be edited

function EditPost() {

const [post, setPost] = useState();
const { postId: postId } = useParams();
   
useEffect(() => {
    if (postId){
        GetPostContent()
        }
},[postId])

async function GetPostContent(){
    const data = await getSinglePost(postId)
    setPost(data)
}

    return (
    <EditPostForm post={post}/>
    )
  }

  export default EditPost;