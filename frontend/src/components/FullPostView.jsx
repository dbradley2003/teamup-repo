import React from 'react';
import { useParams} from 'react-router-dom';
import { useState, useEffect } from "react";

import { getSinglePost } from './services';
import {fetchPosts, deletePost, applyToPost} from "./services"
import {Modal, Form, Button, FormGroup} from 'react-bootstrap'
import '../styles/FullPostView.css';
import '../styles/MessageModal.css';

const FullPostView = () =>{

    const { postId } = useParams();
    const [show, setShow] = useState(false)

    const [username, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [applied,setApplied] = useState(false)
    const [message, setMessage] = useState('')
    const [date, setDate] = useState('');
    

    useEffect(() => {
    getPost();
    
  },[postId,applied] );

  let applyButton = 'Collab'

  if(applied){
    applyButton='Notified'
  }


  async function getPost (){
    const data = await getSinglePost(postId)
    console.log(data)
    setTitle(data.title)
    setDesc(data.desc)
    setUsername(data.owner_username)
    setDate(data.created_at)
    setApplied(data.has_applied)

  }

async function handleApply(){
  setShow(true)
}

async function secondApply(){
  alert('Already notified')
}

const handleSubmit = async  () => {
  console.log(message)
  setShow(false)
  await applyToPost(postId,message);
  getPost()
  
}

const handleClose = () => setShow(false)

    

return (
  <Container maxWidth="md" sx={{ marginTop: 4, textAlign: 'center' }}>
    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
      {/* Title */}
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>

      {/* Post Meta Info */}
      <Typography variant="body2" color="text.secondary">
        by <strong>{username}</strong> on {date}
      </Typography>

      {/* Description */}
      <Typography variant="body1" sx={{ marginTop: 2, whiteSpace: 'pre-line' }}>
        {desc}
      </Typography>

      {/* Apply Button */}
      <Box sx={{ marginTop: 4 }}>
        {!applied ? (
          <Button variant="contained" color="primary" onClick={handleApply}>
            {applyButton}
          </Button>
        ) : (
          <Button variant="outlined" color="primary" disabled>
            {applyButton}
          </Button>
        )}
      </Box>
    </Box>

    {/* Message Modal */}
    <Modal open={show} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 24,
          padding: 4,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Send creator a message
        </Typography>
        <TextareaAutosize
          minRows={3}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <Box sx={{ marginTop: 2, textAlign: 'right' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Send Message
          </Button>
        </Box>
      </Box>
    </Modal>
  </Container>
);
};

export default FullPostView