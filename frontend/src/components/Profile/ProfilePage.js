import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AuthContext.js';
import urlConfig from '../../config.js';
import axios from 'axios';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const { userName, setUserName } = useContext(AppContext);

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(userName);
  const navigate = useNavigate();
  useEffect(()=>{ const authToken = sessionStorage.getItem('authToken')
      if(!authToken){
          navigate("/login");
      }
  },[]);

  useEffect(() => {
    
    if (userName) {
      setName(userName);
    }
  }, [userName]);

  const userDetails = {
    email: sessionStorage.getItem('email'),
    username: sessionStorage.getItem('username') || userName,
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const url = `${urlConfig.backend_url}/auth/update`;
      const storedEmail = sessionStorage.getItem('email');
      const authToken = sessionStorage.getItem('authToken');
      const config = {
        headers: {
          Authorization: `BEARER ${authToken}`,
          'Content-Type': 'application/json',
          email: storedEmail,
        },
      };
      const response = await axios.put(url, { firstName: name }, config);
      if (response) {
        sessionStorage.setItem('username', name);
        setUserName(name);
        setEdit(false);
        console.log(response);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="profile-container">
      {edit ? (
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={userDetails.email}
              disabled // Disable the email field
            />
          </label>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={name}
            onChange={(e) => setName(e.target.value)}
            />
          </label>

          <button type="submit">Save</button>
        </form>
      ) : (
        <div className="profile-details">
          <h1>Hi, {userDetails.username}</h1>
          <p>
            <b>Email:</b> {userDetails.email}
          </p>
          <button onClick={() => setEdit(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
