import React, { useState, useEffect } from 'react';
import api from "../api";
import { useNavigate } from 'react-router-dom';
// import "/styles/ProfilePage.css"


function EditPage() {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [picture, setPicture] = useState(null);
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');

  

  
  useEffect(() => {
        api
            .get("/api/user/profile/")
            .then((res) => res.data)
            .then((data) => {
                setUsername(data.user.username);
                setBio(data.bio)
                setProfileImageUrl(data.picture)
                console.log(data);
                
            })
            .catch((err) => alert(err));
    }, []);

    useEffect(() => {
      if (picture instanceof File) {
        const url = URL.createObjectURL(picture);
        setPreviewUrl(url);
  
        return () => URL.revokeObjectURL(url); // Cleanup function to revoke URL
      }
    }, [picture]);

    const handlePictureChange = (e) => {
      if (e.target.files[0]) {
        setPicture(e.target.files[0]);
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
      }catch(error){
        console.log(error);
      }
         
  };  

return (
<div>
      <h1>Profile Page</h1>
      <h2>{username}</h2>
      <form onSubmit={handleSubmit}>
      
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea 
            type ="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            
          />
        </div>
        
        <div>
        <label htmlFor="profilePicture">Profile Picture:</label>
        
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handlePictureChange}
          />
        </div>

        {profileImageUrl && (
            <div>
                <img src={profileImageUrl} alt="Profile" style={{ width: '100px', height: '100px' }} />
            </div>
        )}

        {previewUrl && (
          <div>
            <img
              src={previewUrl}
              alt="Profile Preview"
              style={{ width: '100px', height: '100px' }}
            />
          </div>
        )}
        <button type="submit">
            Update Profile</button> 
        </form>
    </div>
  );
};

export default EditPage;