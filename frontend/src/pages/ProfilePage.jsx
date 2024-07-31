import React, { useState, useEffect } from 'react';
import api from "../api";
import { useNavigate } from 'react-router-dom';
// import "/styles/ProfilePage.css"


const Profile = () => {
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

    const handleNavigate = () => {
        navigate('/editprofile'); // Navigate to /another path
      };

    const handleSubmit = async (e) => {

      e.preventDefault();
      //setLoading(true);  // Assuming you uncomment and define a setLoading function

    
        try {
          console.log(bio)
          const response = await api.put(`/api/user/profile/`, {username, bio });  // Assuming title and desc are defined in the component's state
          console.log('Successfully created post', response.data);

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
      
      
        <div>
          
            <h2>{bio}</h2>
            
            
          
        </div>

        <div>
          <img src={picture} alt="Profile" />
          
        </div>
        
        <button onClick={handleNavigate}>Edit Profile</button> 
        
    </div>
  );
};

export default Profile;