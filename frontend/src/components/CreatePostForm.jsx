import React from "react";
import  { useState} from 'react';
import { useNavigate } from "react-router-dom";
import { createPost } from "./services";
import { Box, TextField, Button, Select, MenuItem, Typography } from "@mui/material";
import '../styles/PostForm.css';
import { UnauthenticatedTemplate } from "@azure/msal-react";

export function CreatePostForm() {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('tech');
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
  
    const handleContentChange = (event) => {
      const { name, value } = event.target;
      if (name === 'title') setTitle(value);
      if (name === 'desc') setDesc(value);
      if (name === 'category') setCategory(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createPost(title, desc, category);
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate('/');
        }, 3000);
      };


        
      return (
        <Box 
          sx={{
            maxWidth: 600,
            margin: '0 auto',
            padding: 3,
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 3,
            marginTop:8
          }}
        >
          {!showPopup ? (
            <form onSubmit={handleSubmit}>
              <Typography variant="h5" component="h2" gutterBottom>
                Create a New Post
              </Typography>
    
              {/* Title Input */}
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Title"
                variant="outlined"
                value={title}
                onChange={handleContentChange}
                margin="normal"
                required
              />
    
              {/* Category Select */}
              <Select
                fullWidth
                id="category"
                name="category"
                value={category}
                onChange={handleContentChange}
                displayEmpty
                sx={{ marginTop: 2 }}
              >
                <MenuItem value="tech">Technology</MenuItem>
                <MenuItem value="film">Film & Media</MenuItem>
              </Select>
    
              {/* Description Input */}
              <TextField
                fullWidth
                id="desc"
                name="desc"
                label="Description"
                variant="outlined"
                value={desc}
                onChange={handleContentChange}
                margin="normal"
                multiline
                rows={6}
                required
              />
    
              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: 3 }}
                fullWidth
              >
                Submit
              </Button>
            </form>
          ) : (
            <Box 
              sx={{
                textAlign: 'center',
                padding: 3,
                backgroundColor: '#f0f0f0',
                borderRadius: 2,
              }}
            >
              <Typography variant="body1">
                Post was created and sent to be reviewed!
              </Typography>
            </Box>
          )}
        </Box>
      );
    }


   


