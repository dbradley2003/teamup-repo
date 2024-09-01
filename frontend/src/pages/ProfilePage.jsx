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
  const [year, setYear] = useState('');
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
        setYear(data.student_year)
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

        <div className='profile-page-container'>
        <div className="row justify-content-center">
        <div className='col-md-10'>
        <div class="unified-section d-flex">
        <div className='profile-section p-4'>
        <p className='profile-category '>{categoryLabels[major]}</p>
        
        <div className='text-center'>
              <img
                src={picture}
                alt="Profile Preview"
                class="profile-image rounded-circle shadow-4"
                style={{ width: '100px', height: '100px', }}
              />
              </div>
          
        <p className='profile-username mt-2'><strong>{username}</strong></p>
        <p className='profile-year '>{year}</p>
        <p className='bio '>
        <i class="fas fa-quote-left pe-2"></i>
          {bio}
          </p>
            
         
          {/* <nav class="nav flex-column mt-4">
          <a class="nav-link active" href="#">Settings</a>
          <a class="nav-link" href="#">Log Out</a>
        </nav> */}
        <div className='text-center'>
          <button  className="profile-button mt-2" onClick={handleNavigate}>
              Edit </button> 
              </div>
  </div>
 
  
  <div className='divider mx-3'></div>
  <div class="details-section p-4 d-flex flex-column justify-content-between"> 
          <h3 class='mt-4'>Expertise Area </h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{skills}</p> 
          
            
          <h3 class='mt-4'>Projects</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{projects}</p> 
          
          <h3 class='mt-4'>Resume </h3>
          {resumeUrl ? (
            <p>
              <a href={resumeUrl} className='custom-link' target="_blank" rel="noopener noreferrer">
                View {username}'s resume
              </a>

            </p>
          ) : (
            <p>No resume uploaded</p>
          )}
          
          
      </div>
      </div>
      </div>
      </div>
      </div>
   
)};

export default Profile;