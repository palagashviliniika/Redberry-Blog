import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('authToken'));

  useEffect(() => {
    // Check if the user is logged in based on the presence of a cookie
    const cookieToken = Cookies.get('authToken');
    if (cookieToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    // Set a cookie on successful login
    Cookies.set('authToken', 'authorizedUser', { expires: 1 }); // Set an expiration (optional)
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Remove the cookie on logout
    Cookies.remove('authToken');
    setIsLoggedIn(false);
  };

  const isAuthenticated = () => {
    // Return whether the authentication token cookie is present or not
    return !!Cookies.get('authToken');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
