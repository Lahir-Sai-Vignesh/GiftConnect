import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MainPage from './components/MainPage/MainPage';
import './App.css';
import DetailsPage from './components/DetailsPage/DetailsPage';
import SearchPage from './components/SearchPage/SearchPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import ProtectedRoute from './components/ProtectedRouter/ProtectedRoute';
import PostGift from './components/PostGift/PostGift';
import MainProfilePage from './components/Profile/MainProfilePage';
import EditPost from './components/EditPosts/EditPosts';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={ <MainPage /> } />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />

        //protected routes
        <Route path="/product/:productId" element = {<ProtectedRoute> <DetailsPage editingMode={false}/> </ProtectedRoute>} />
        <Route path = '/profile' element = {<ProtectedRoute> <MainProfilePage />  </ProtectedRoute>}/>
        <Route path='/profile/edit/product/:productId' element={<ProtectedRoute> <DetailsPage editingMode={true}/> </ProtectedRoute>} />
        <Route path='/profile/edit/product/editpost/:productId' element={<ProtectedRoute><EditPost/></ProtectedRoute>}/>
        <Route path ='/post-gift' element ={<ProtectedRoute> <PostGift/> </ProtectedRoute>} />
        
      </Routes>
    </>
  )
}

export default App
