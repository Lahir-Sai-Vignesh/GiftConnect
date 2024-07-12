import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MainPage from './components/MainPage/MainPage';
import './App.css';
import DetailsPage from './components/DetailsPage/DetailsPage';
import SearchPage from './components/SearchPage/SearchPage';
import RegisterPage from './components/RegisterPage/RegisterPage';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={ <MainPage /> } />
        <Route path="/product/:productId" element = {<DetailsPage />} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  )
}

export default App
