import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MainPage from './components/MainPage/MainPage';
import './App.css';
import DetailsPage from './components/DetailsPage/DetailsPage';
import SearchPage from './components/SearchPage/SearchPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import ProfilePage from './components/Profile/ProfilePage';
import PostGift from './components/PostGift/PostGift';
import MainProfilePage from './components/Profile/MainProfilePage';
import EditPost from './components/EditPosts/EditPosts';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={ <MainPage /> } />
        <Route path="/product/:productId" element = {<DetailsPage editingMode={false}/>} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path = '/profile' element = {<MainProfilePage />}/>
        <Route path='/profile/edit/product/:productId' element={<DetailsPage editingMode={true}/>}/>
        <Route path='/profile/edit/product/editpost/:productId' element={<EditPost/>}/>
        <Route path ='/post-gift' element ={<PostGift/>} />
      </Routes>
    </>
  )
}

export default App
