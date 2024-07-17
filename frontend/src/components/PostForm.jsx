import React from "react";
import api from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
// import "../styles/Form.css"

function PostForm() {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Assuming you uncomment and define a setLoading function
    
        try {
            const response = await api.post(`/api/posts/`, {title, desc });  // Assuming title and desc are defined in the component's state
            console.log('Successfully created post', response.data);
            navigate("/");  // Assuming useNavigate has been defined and imported correctly
        } catch (error) {
            console.error('Error creating post:', error); // Properly log the error to the console
            alert('Failed to create post: ' + (error.response?.data?.message || error.message));  // More detailed error alert
        } finally {
            setLoading(false);  // Ensure loading state is reset whether the request succeeds or fails
        }
    };

    return (<form onSubmit={handleSubmit} className="form-container">  
        Submit Post
        <input 
        type="text"
        value= {title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        />
        <textarea 
        value= {desc}
        onChange={(e) => setDesc(e.target.value)}
         placeholder="Description"
        />

        <button type="submit">
            Submit
        </button>
    
    </form>
    )
}

export default PostForm;