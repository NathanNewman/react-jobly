import React, { createContext, useState, useEffect } from 'react';
import JoblyApi from './api';

// Create the AuthContext
export const AuthContext = createContext();

// Create a provider component to wrap the app and provide the authentication state
export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("authenticated");
    if (token) {
      // Update AuthContext with the token
      setAuthenticated(token);
      JoblyApi.token = token;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};