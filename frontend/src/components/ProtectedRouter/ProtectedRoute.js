import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {
  const authToken = sessionStorage.getItem('authToken');
  if(!authToken){
    /*In react-router-dom, the replace attribute in the Navigate component ensures that the navigation action replaces the 
    current entry in the history stack instead of adding a new one. 
    This is useful when you want to prevent the user from navigating back to the previous page using the browser's back button.*/
    
    // with replace current protected component is replaced by navigation to login in the history stack
    // without replace when user clicks back button login page is seen
    
    return <Navigate to="/login" replace />
  }
  return children
}

export default ProtectedRoute
