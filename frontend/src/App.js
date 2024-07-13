import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MainPage from './components/MainPage/MainPage';
import './App.css';
import DetailsPage from './components/DetailsPage/DetailsPage';
import SearchPage from './components/SearchPage/SearchPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={ <MainPage /> } />
        <Route path="/product/:productId" element = {<DetailsPage />} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
