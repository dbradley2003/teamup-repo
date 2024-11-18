import React from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
function CreatePost() {
    const createPost = (data) => {
      console.log("Editing post with:", data);
    };

    
  
    return <PostForm onSubmit={createPost} />;
  
  }

  export default CreatePost;