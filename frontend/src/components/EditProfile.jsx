import React, { useState, useEffect } from 'react';
import api from "../api";
import { useNavigate } from 'react-router-dom';
import "../styles/ProfilePage.css"


export function EditPage() {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [projects, setProjects] = useState('');
  const [picture, setPicture] = useState(null);
  const [major, setMajor] = useState(null);
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState('');
  const[resumeFile, setResumeFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(''); 
  const [resumePreviewUrl, setResumePreviewUrl] = useState('')

  
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
                setResumeUrl(data.resume_url)
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
      
      if (resumeFile instanceof File) {
        console.log(resumeFile)
        formData.append('resumeUrl', resumeFile);  
      }
     

      if (picture instanceof File) {
        formData.append('picture', picture);
      }

      // formData.append('username', username);
      formData.append('bio', bio);
      formData.append('skills', skills);
      formData.append('projects', projects);
      formData.append('major', major)
      

      try {
        const response = await api.put('/api/user/profile/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
        console.log('Profile updated', response.data)
        if (response.data.resume_url){
          setResumeUrl(response.data.resume_url)
        }
        navigate('/profile')
      }catch(error){
        console.log(error);
      }
         
  };  

 function handleResumeUpload(event){
  const file = event.target.files[0]

  if(file){
    setResumeFile(file)
    const previewUrl = URL.createObjectURL(file);
    setResumePreviewUrl(previewUrl)
  }
  
 }


return (
<div className='edit-page-container'>

      <div className='col-md-10'>
      {/* <div className='row justify-content-center'> */}
      <div className='edit-unified-section d-flex'>
      <div className='edit-profile-section  p-4'>
      
      
      {/* <div className='text-center'>
      {previewUrl && (
            <img
              src={previewUrl}
              alt="Profile Preview"
              className="edit-profile-image rounded-circle shadow-4 "
              style={{ width: '100px', height: '100px' }}
            />
        )}   
         </div> */}
{/* <input
        type="file"
        id="profilePicture"
        accept="image/*"
        onChange={handlePictureChange}
        style={{ display: 'none' }} 
    />        */}
    <p className='profile-username mb-2'> {username}</p>
    {/* <div className='form-group mt-2'>
    <label htmlFor='username'> Username</label>
    <input
    type="text"
    id="username"
    className='form-control mt-2'
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    />
    </div> */}
     <div className='form-group mt-2'>
      <label htmlFor='major'>Major Category</label>
      <select
      id="major"
      className='form-control mt-2'
      value={major}
      onChange={(e) => setMajor(e.target.value)}
      >
        <option value="STEM">Technology</option>
        <option value="FM">Film & Media</option>
      </select>
     </div>

     <div className='form-group mt-2'>
    <label htmlFor='bio'> Bio</label>
          <textarea 
          placeholder='Fill out your bio...'
            type ="text"
            id='bio'
            value={bio}
            rows={10}
            class= 'form-control mt-2'
            style={{ width: '100%', resize: 'vertical' }} 
            onChange={(e) => setBio(e.target.value)}
          />
          </div>

   
<div className='text-center'>
        <button className='edit-profile-button mt-2' onClick={handleSubmit}>
            Save 
            </button> 
          </div>
        </div>
       
      <div className='divider '></div>

        <div className='details-wrapper'>
        <h2 className='edit-information-title '>Edit Information</h2>
        <div className='edit-profiledetails-section '>
        <h3 class='mt-2'>Expertise Area</h3>
        <textarea 
            type ="text"
            class= 'form-control'
            value={skills}
            maxLength={275}
            rows={5}
            onChange={(e) => setSkills(e.target.value)}
            ></textarea>
          
        <h3 class='mt-4'>Share a Project</h3>
        <textarea 
            type ="text"
            rows={5}
            maxLength={275}
            class= 'form-control'
            value={projects}
            onChange={(e) => setProjects(e.target.value)}
            
          />
        <h3 class='mt-4'>Upload Resume</h3>
        <input 
            type ="file"
            class= 'form-control'
            accept = ".pdf,.doc,.docx"
            onChange={handleResumeUpload}
            
          />
        {resumePreviewUrl ? (
          <p className='mt-4'>
            <a href={resumePreviewUrl} className='custom-link' target="_blank" rel="noopener noreferrer">
              View Selected Resume
            </a>
          </p>

         ) : (
        resumeUrl && (
          <p className='mt-4 '>
            <a href={resumeUrl} className='custom-link' target="_blank" rel="noopener noreferrer">
              View Uploaded Resume
            </a>
          </p>
        )
        )}
        
        </div>
        
  </div> 
  </div>
  </div>
   </div>

 
  );
};

