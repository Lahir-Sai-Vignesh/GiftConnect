import React, { useState, createContext} from 'react';

const AppContext = createContext();

export function AuthProvider({ children }) {
  // if I set it to false whenever I refresh my page is reset to false but I need to set it depending on the authToken to persist isLoggedIn throughout refreshes
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('authToken')); 
  
  const [userName, setUserName] = useState(sessionStorage.getItem('username'));

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, userName, setUserName }}>
      {children}
    </AppContext.Provider>
  );
}

export {AppContext};

