import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AuthContext.js'

function Navbar() {
  const { isLoggedIn, setIsLoggedIn, userName } = useContext(AppContext);
  const navigate = useNavigate();
  // console.log(isLoggedIn);
  const location = useLocation();
  //console.log(location);
  const path = location.pathname;
  //console.log(path);
  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem('username');
    setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <header className="d-flex flex-wrap justify-content-center py-3 mb-3 border-bottom">
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">

        <span className="fs-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gift" viewBox="0 0 16 16">
            <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5V7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A3 3 0 0 1 3 2.506zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43zM9 3h2.932l.023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0zM1 4v2h6V4zm8 0v2h6V4zm5 3H9v8h4.5a.5.5 0 0 0 .5-.5zm-7 8V7H2v7.5a.5.5 0 0 0 .5.5z" />
          </svg> Gift Connect
        </span>
      </a>

      <ul className="nav nav-pills">
        <li className="nav-item"><a href="/" className={`nav-link ${path === "/" ? 'active' : ''}`} aria-current="page">Home</a></li>
        <li className="nav-item"><a href="/search" className={`nav-link ${path === "/search" ? 'active' : ''}`}>Search</a></li>
        {isLoggedIn ? (
          <>
            <li className="nav-item"> <span className={`nav-link ${path === "/profile" ? 'active' : ''}`} style={{ color: "black", cursor: "pointer" }} onClick={() => navigate('/profile')}>Welcome, {userName}</span> </li>
            <li className="nav-item"><a href="/post-gift" className={`nav-link ${path === "/post-gift" ? 'active' : ''}`}>PostGift</a></li>
            <li className="nav-item"><button className="nav-link " onClick={handleLogout}>Logout</button></li>
          </>
        ) : (<>
          <li className="nav-item"><a href="/login" className={`nav-link ${path === "/login" ? 'active' : ''}`}>Login</a></li>
          <li className="nav-item"><a href="/register" className={`nav-link ${path === "/register" ? 'active' : ''}`}>Register</a></li>
        </>)
        }

      </ul>
    </header>
  )
}

export default Navbar
