import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../components/api'; // your configured axios instance
import { logout } from './AuthService'; // avoid name collision

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const accessToken = localStorage.getItem('accessToken');

  const fetchCurrentUser = async () => {
    try {
      const res = await api.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUser(res.data.user);
    } catch (error) {
      console.error("Error fetching current user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem('accessToken');
    setUser(null);
    setIsLoggingOut(false);
    window.location.href = '/';
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout: handleLogout, loading, isLoggingOut, fetchCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
