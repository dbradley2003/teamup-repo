import React from 'react';
import { useParams} from 'react-router-dom';
import { useState, useEffect } from "react";

import { getSinglePost } from './services';
import '../styles/FullPostView.css';

const FullPostView = () =>{

    const { postId } = useParams();

    const [username, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    

    useEffect(() => {
    getPost();
  },[postId] );

  async function getPost (){
    const data = await getSinglePost(postId)
    console.log(data)
    setTitle(data.title)
    setDesc(data.desc)
    setUsername(data.owner_username)
  }

    return(
        <div className='container mt-5'>
          <div className='row justify-content-center'>
          <div className="col-md-8">
        <h1 className='mb-3'>{title}</h1>
        <h6 className='text-secondary'>Creator: {username} </h6>
        <p className='mt-4'>{desc}</p>
        </div>
        </div>
        </div>
        
    )
}

export default FullPostView