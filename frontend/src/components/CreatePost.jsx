
import React from "react";

function CreatePost({ post }) {
    const createPost = (data) => {
      // API call to update the post
      console.log("Editing post with:", data);
    };
  
    return <PostForm onSubmit={createPost} />;
  }

  export default CreatePost;