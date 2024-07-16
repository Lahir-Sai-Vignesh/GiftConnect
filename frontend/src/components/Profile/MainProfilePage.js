import React, { useEffect } from 'react'
import ProfilePage from './ProfilePage.js';
import UserPosts from './UserPosts.js';
import { useNavigate } from 'react-router-dom';



function MainProfilePage() {
    const navigate = useNavigate();
    useEffect(()=>{ const authToken = sessionStorage.getItem('authToken')
        if(!authToken){
            navigate("/login");
        }
    },[]);
    
  return (
    <div style={{display: "flex", width: "100%"}} >
    <ProfilePage />
    <div style={{width:"75%",backgroundColor: "#e0e0e0"}}>
      <UserPosts />
    </div>
  </div>
  )
}

export default MainProfilePage
