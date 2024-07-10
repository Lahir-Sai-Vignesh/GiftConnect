import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MainPage from './components/MainPage/MainPage';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={ <MainPage /> } />
      </Routes>
    </>
  )
}

export default App
