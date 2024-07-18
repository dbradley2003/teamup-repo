// import React from 'react';

// const Profile = () => {
//     return (
//         <div>
//             <h1>New Page</h1>
//             <p>Welcome to the new page!</p>
//         </div>
//     );
// };

// export default Profile;

import "/Users/christianrosse/Downloads/TeamUp2/teamup-repo/frontend/src/styles/ProfilePage.css"

import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import api from "../api";


const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  // Fetch user data when the component mounts
  useEffect(() => {
    // Replace with your API endpoint
    //api.get('/api/user/profile')
        try{
      const response = api.get('/api/user/profile')
        setUsername(response.data.username);
        setBio(response.data.bio);
        setProfilePicture(response.data.profilePicture);
      }
        catch(error) {
        console.error('There was an error fetching the user data!', error);
      };
  }, []);

  // Handle bio change
  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bio', bio);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    // Replace with your API endpoint
    api.post('/api/user/profile', formData)
      .then(response => {
        alert('Profile updated successfully!');
      })
      .catch(error => {
        console.error('There was an error updating the profile!', error);
      });
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>{username}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={bio}
            onChange={handleBioChange}
          />
        </div>
        <div>
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input
            type="file"
            id="profilePicture"
            onChange={handleProfilePictureChange}
          />
        </div>
        <button 
            type="submit" 
            onClick={handleSubmit}>
            Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
