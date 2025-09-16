// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("coffeeUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save user to localStorage when logged in
  const login = (userData) => {
    localStorage.setItem("coffeeUser", JSON.stringify(userData));
    setUser(userData);
  };

  // Remove user from localStorage when logged out
  const logout = () => {
    localStorage.removeItem("coffeeUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ This is the missing hook
export const useAuth = () => {
  return useContext(AuthContext);
};
