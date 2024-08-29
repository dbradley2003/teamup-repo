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
<div className='profile-back'>
<div>
        

      
        
        <div className="wrapper">
        <div className='container'>
        <div className='username'>
        {username}</div>
        
            <div>
              <img
                src={picture}
                alt="Profile Preview"
                className="circular-image"
                style={{ width: '100px', height: '100px' }}
              />
            </div>
          
          <div>
      
  
      
  
      
  </div>
        
        <div>
            <label htmlFor="bio" class='bold-text'>Bio:</label>
            <p>{bio}</p>
            
          </div>
          <button onClick={handleNavigate}>
              Edit Profile</button> 
               
  </div>
  
  <div className="container">
          
          <p class='bold-text'>Skills:</p>
          <p>{skills}</p>
          
            
          <p class='bold-text'>Projects:</p>
          <p>{projects}</p>
          
          <p class='bold-text'>Resume(Copy & Paste)</p>
          <p>{resume}</p>
          
          
      </div>
      </div>
        
  
       
      </div>
    );
    </div>
)};

export default Profile;