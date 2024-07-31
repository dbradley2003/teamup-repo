import React, { useState, useEffect } from 'react';
import api from "../api";
import { useNavigate } from 'react-router-dom';
import "/Users/christianrosse/Downloads/TeamUp2/teamup-repo/frontend/src/styles/ProfilePage.css"


const EditPage = async () => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [picture, setPicture] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
        api
            .get("/api/user/profile/")
            .then((res) => res.data)
            .then((data) => {
                setUsername(data.user.username);
                setBio(data.bio)
                setPicture(data.picture)
                console.log(data.user.id);
                
            })
            .catch((err) => alert(err));
    }, []);

    // const handleBioChange = (event) => {
    //   setBio(event.target.value);
    // };

    
    // const handleProfilePictureChange = (e) => {
    //   setPicture(e.target.files[0]);
    // };
    

    const handleSubmit = async (e) => {

      e.preventDefault();
      //setLoading(true);  // Assuming you uncomment and define a setLoading function

    
        try {
          console.log(bio)
          const response = await api.put('/api/user/profile/', {username, bio, picture }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          });
          //const response = await api.put('/api/user/profile/', {username, bio, picture });  // Assuming title and desc are defined in the component's state
          console.log('Successfully created post', response.data);
          navigate('/profile'); // Navigate to /another path

          //navigate("/");  // Assuming useNavigate has been defined and imported correctly
      } catch (error) {
          console.error('Error creating post:', error); // Properly log the error to the console
          alert('Failed to create post: ' + (error.response?.data?.message || error.message));  // More detailed error alert
      } finally {
          //setLoading(false);  // Ensure loading state is reset whether the request succeeds or fails
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
            onChange={(e) => setPicture(e.target.files[0])}
          />
        </div>
        {picture && (
          <div>
            
            <img
              src={URL.createObjectURL(picture)}
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