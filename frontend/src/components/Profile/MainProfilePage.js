import React, { useEffect } from 'react'
import ProfilePage from './ProfilePage.js';
import { Outlet } from 'react-router-dom';
import UserPosts from './UserPosts.js';



function MainProfilePage() {
    
  return (
    <div style={{display: "flex", width: "100%"}} >
    <ProfilePage />
    <div style={{width:"75%",backgroundColor: "#e0e0e0"}}>
      <UserPosts />
    </div>
    <Outlet/>
  </div>
  )
}

export default MainProfilePage
