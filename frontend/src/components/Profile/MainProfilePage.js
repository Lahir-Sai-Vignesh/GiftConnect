import React from 'react'
import ProfilePage from './ProfilePage.js';
import UserPosts from './UserPosts.js';
import './MainProfilePage.css';


function MainProfilePage() {
  return (
    <div className="main-container">
    <ProfilePage />
    <div className="other-component">
      <UserPosts />
    </div>
  </div>
  )
}

export default MainProfilePage
