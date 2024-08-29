import React, { useState, useEffect } from 'react';
import api from "../api";
import { useNavigate } from 'react-router-dom';
import "../styles/ProfilePage.css"



const Profile = () => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [resume, setResume] = useState('');
  const [skills, setSkills] = useState('');
  const [projects, setProjects] = useState('');
  const [picture, setPicture] = useState('');
  const [major, setMajor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/user/profile/")
    .then((res) => res.data)
    .then(async (data) => {
        setUsername(data.user.username);
        setBio(data.bio)
        setSkills(data.skills)
        setResume(data.resume)
        setProjects(data.projects)
        setPicture(data.picture_url)
        setMajor(data.major)
        console.log(data)
        console.log(data.picture_url)
        console.log(data.user.id);
        console.log(picture)
        
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
          
        <div className='profile-username'>
        {username}
        </div>
        
            
              <img
                src={picture}
                alt="Profile Preview"
                class="circular-image img-fluid"
                style={{ width: '100px', height: '100px' }}
              />
          
          <div>
        
        <div className='bio-container mt-3'>
            <label className='profile-label font-weight-bold' htmlFor="bio" class='bold-text'>Bio:</label>
            <p>{bio}</p>
            
          </div>
          <button  className="profile-button" onClick={handleNavigate}>
              Edit Profile</button> 
               
  </div>
  </div>
  
  
  <div className="col-md-5 right-profile">
          
          <p class='font-weight-bold'>Skills:</p>
          <p>{skills}</p>
          
            
          <p class='font-weight-bold'>Projects:</p>
          <p>{projects}</p>
          
          <p class='font-weight-bold'>Resume(Copy & Paste)</p>
          <p>{resume}</p>
          
          
      </div>
      
      </div>
      </div>
   
)};

export default Profile;