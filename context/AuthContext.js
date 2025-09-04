"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Set up axios interceptors for automatic token inclusion
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    // Request interceptor to add auth header
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const currentToken = localStorage.getItem("token");
        if (currentToken) {
          config.headers.Authorization = `Bearer ${currentToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle auth errors
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token is invalid, clear auth data
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setUser(null);
          setIsAuthenticated(false);
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // Verify token and load user data
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.post("/api/auth/verify", { token });
        
        if (response.data.user) {
          setUser(response.data.user);
          setIsAuthenticated(true);
          // Update localStorage with fresh user data
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        // Clear invalid token and user data
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/signin", credentials);
      const { user, token } = res.data;

      // Save user & token to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      setUser(user);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return { 
        success: false, 
        error: error.response?.data?.error || "Login failed" 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Clear localStorage first
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    
    // Update state synchronously
    setUser(null);
    setIsAuthenticated(false);
    setLoading(false);
  };

  // Check if user is authenticated
  const checkAuth = () => {
    return isAuthenticated && user;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isAuthenticated, 
      login, 
      logout, 
      setUser, 
      checkAuth 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
