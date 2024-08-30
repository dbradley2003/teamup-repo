import React, { useState, useEffect } from 'react';
import api from "../api";
import { useNavigate } from 'react-router-dom';
import "../styles/ProfilePage.css"



const Profile = () => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [skills, setSkills] = useState('');
  const [projects, setProjects] = useState('');
  const [picture, setPicture] = useState('');
  const [major, setMajor] = useState('');
  const navigate = useNavigate();

  const categoryLabels = {
    STEM: 'Technology',
    FM: 'Film & Media'
  };

  useEffect(() => {
    api.get("/api/user/profile/")
    .then((res) => res.data)
    .then(async (data) => {
        setUsername(data.user.username);
        setBio(data.bio)
        setSkills(data.skills)
        setResumeUrl(data.resume_url)
        setProjects(data.projects)
        setPicture(data.picture_url)
        setMajor(data.major)
        console.log(data)
        console.log(data.picture_url)
        console.log(data.user.id);
        console.log(picture)
        console.log(data.resume_url)
        
    })
    .catch((err) => alert(err))
        
    }, [picture]);


    // const handleBioChange = (event) => {
    //   setBio(event.target.value);
    // };

    const handleNavigate = () => {
        navigate('/editprofile'); // Navigate to /another path
      };

    const handleSubmit = async (e) => {

      e.preventDefault();
      //setLoading(true);  // Assuming you uncomment and define a setLoading function

    
        try {
          console.log(bio)
          const response = await api.put(`/api/user/profile/`, username, bio, picture, major);  // Assuming title and desc are defined in the component's state
          console.log('Successfully created post', response.data);
          handleNavigate()

          //navigate("/");  // Assuming useNavigate has been defined and imported correctly
      } catch (error) {
          console.error('Error creating post:', error); // Properly log the error to the console
          alert('Failed to create post: ' + (error.response?.data?.message || error.message));  // More detailed error alert
      } finally {
          //setLoading(false);  // Ensure loading state is reset whether the request succeeds or fails
      }
  };
          

return (

<div className='profile-back container no-border no-background '>
        <div className='profile-container container'>
       
        <div className='col-md-5 left-profile'>
        <p className='font-weight-bold'>{categoryLabels[major]}</p>
        <div className='centered-content'>
        <p className='profile-username'>{username}</p>
        
        
        <div className='profile_pic mb-1'>
              <img
                src={picture}
                alt="Profile Preview"
                class="circular-image img-fluid"
                style={{ width: '100px', height: '100px', }}
              />
          
          </div>
       
        
        <div className='bio-container mb-2'>
            <label className='font-weight-bold' htmlFor="bio"></label>
            <p className='font-weight-bold'>{bio}</p>
            
          </div>
          <button  className="profile-button mt-2" onClick={handleNavigate}>
              Edit Profile</button> 
        </div>
  </div>
  
  
  <div className="col-md-5 right-profile">
          
          <p class='font-weight-bold'>Skills:</p>
          <p style={{ whiteSpace: 'pre-wrap' }}>{skills}</p> 
          
            
          <p class='font-weight-bold'>Projects:</p>
          <p style={{ whiteSpace: 'pre-wrap' }}>{projects}</p> 
          
          <p class='font-weight-bold'>Resume: </p>
          {resumeUrl ? (
            <p>
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                View {username}'s Resume
              </a>

            </p>
          ) : (
            <p>No resume uploaded</p>
          )}
          
          
          
      </div>
      
      </div>
      </div>
   
)};

export default Profile;