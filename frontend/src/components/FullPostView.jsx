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

    

    return(
        <div className='view-post container  mt-4'>
          <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
            <Modal.Header closeButton >
            <Modal.Title className='modal-title'> Send creator a message </Modal.Title>
            </Modal.Header>
              <Form className='form-container'>
                <FormGroup className='form-group'>
                  <Form.Control
                  as="textarea"
                  className="custom-textarea"
                  rows = {3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  // readOnly={false}
                  />
                </FormGroup>
              </Form>
            <Modal.Footer>
            <Button variant="primary" onClick={handleSubmit} className='modal-button'>
              Send Message
            </Button>
            </Modal.Footer>
            </Modal>
            <div className='container'>
            <div className='row justify-content-center'>
            <div className='col-md-12'>
          
        <h1 className='display-4'>{title}</h1>
        <div className="text-center text-muted">
        <span>by {username}</span>
        </div>
        {/* <h6 className='text-creator'>By: {username} </h6> */}
        <p className='mt-4'>{desc}</p>
        

      <div className='view-button-container text-center'>
        {!applied ? (
        <button className="view-post-button mt-4" onClick={handleApply}> {applyButton} </button>
        ) : (
       
          <button className="view-post-button  mt-4" > {applyButton} </button>
        )}
        </div>
          </div>
        </div>
        </div>
        </div>
        
    )
}

export default FullPostView