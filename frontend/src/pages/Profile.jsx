import React, { useState, useEffect } from 'react';
import api from "../api";


const ProfilePage = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
        api
            .get("/api/user/profile/")
            .then((res) => res.data)
            .then((data) => {
                setUsername(data.user.username);
                console.log(data.user);
            })
            .catch((err) => alert(err));
    })


return (
    <div>
      <h1>Profile Page</h1>
      <h2>{username}</h2>
     </div>
)
}
export default ProfilePage;