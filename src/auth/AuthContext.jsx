import React, { createContext, useContext, useState, useEffect } from 'react';
import { dbService } from '../data/dbService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem('sc_user');
    if (saved) {
      try { setCurrentUser(JSON.parse(saved)); } catch {}
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const user = dbService.login(email, password);
    if (user) {
      setCurrentUser(user);
      sessionStorage.setItem('sc_user', JSON.stringify(user));
      return { success: true, user };
    }
    return { error: 'Email hoac mat khau khong dung!' };
  };

  const register = (userData) => {
    const result = dbService.register(userData);
    if (result.user) {
      setCurrentUser(result.user);
      sessionStorage.setItem('sc_user', JSON.stringify(result.user));
    }
    return result;
  };

  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('sc_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
