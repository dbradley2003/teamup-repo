import React from "react";

function CreatePost() {
    const createPost = (data) => {
      console.log("Editing post with:", data);
    };
  
    return <PostForm onSubmit={createPost} />;
  }

  export default CreatePost;