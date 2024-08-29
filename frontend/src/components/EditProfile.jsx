import React, { useState, useEffect } from 'react';
import api from "../api";
import { useNavigate } from 'react-router-dom';
import "../styles/ProfilePage.css"


function EditPage() {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [resume, setResume] = useState('');
  const [skills, setSkills] = useState('');
  const [projects, setProjects] = useState('');
  const [picture, setPicture] = useState(null);
  const [major, setMajor] = useState(null);
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState('');

  
  const categoryLabels = {
    STEM: 'Technology',
    FM: 'Film & Media'
  };
  
  useEffect(() => {
        api
            .get("/api/user/profile/")
            .then((res) => res.data)
            .then((data) => {
                setUsername(data.user.username);
                setBio(data.bio)
                setSkills(data.skills)
                setResume(data.resume)
                setProjects(data.projects)
                setPreviewUrl(data.picture_url)
                setMajor(data.major)
                console.log(data);
                
            })
            .catch((err) => alert(err));
    }, []);

    useEffect(() => {
      if (picture instanceof File) {
        const url = URL.createObjectURL(picture);
        setPreviewUrl(url);
        //setProfileImageUrl(picture)
  
        return () => URL.revokeObjectURL(url); 
      }
    }, [picture]);

    const handlePictureChange = (e) => {
      if (e.target.files[0]) {
        const file = e.target.files[0];
        setPicture(file);
        
      } else {
        setPicture(null);
        setPreviewUrl('')
      }
    };

    
  

    

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('username', username);
      formData.append('bio', bio);
      formData.append('resume', resume);
      formData.append('skills', skills);
      formData.append('projects', projects);
      //formData.append('major', major)
      if (picture instanceof File) {
        formData.append('picture', picture);
      }

      try {
        const response = await api.put('/api/user/profile/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
        console.log('profile updated', response.data)
        navigate('/profile')
      }catch(error){
        console.log(error);
      }
         
  };  

return (
<div className='profile-back container'>
      
      <div className='profile-container container'>
      <div className='col-md-5 left-profile'>
      <p className='font-weight-bold'>{categoryLabels[major]}</p>
      
      <div className='centered-content'>
      <p className='profile-username'> {username}</p>
      <div>
      {previewUrl && (
            <img
              src={previewUrl}
              alt="Profile Preview"
              className="circular-image img-fluid"
              style={{ width: '100px', height: '100px' }}
            />
         
        )}
        </div>
    <div className='profile-picture'>
    <input
        type="file"
        id="profilePicture"
        accept="image/*"
        onChange={handlePictureChange}
        style={{ display: 'none' }} // Hide the default input
    />
    

    <label htmlFor="profilePicture" className="edit-profile-pic">
      Choose Image
    </label>
  </div>
  </div>

          
          <div className='bio-container mt-3'>
          <label htmlFor="bio" className='profile-label font-weight-bold'>Bio:</label>
          <textarea 
            type ="text"
            value={bio}
            class= 'form-control'
            onChange={(e) => setBio(e.target.value)}
          />
          </div>
        <div className='centered-content'>
        <button className='profile-button' onClick={handleSubmit}>
            Update Profile</button> 
      
      </div>      
      </div>  


        <div className='col-md-5 right-profile'>
        <p class='bold-text'>Skills:</p>
        <textarea 
            type ="text"
            class= 'form-control'
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            ></textarea>
          
        <p class='font-weight-bold'>Projects:</p>
        <textarea 
            type ="text"
            class= 'form-control'
            value={projects}
            onChange={(e) => setProjects(e.target.value)}
            
          />
        <p class='font-weight-bold'>Resume(Copy & Paste)</p>
        <textarea 
            class= 'form-control'
            type ="text"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            
          />
      </div>  
    </div>
  </div>
    
   
      
  );
};

export default EditPage;