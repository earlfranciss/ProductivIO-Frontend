import React, { createContext, useContext, useState } from "react";

// Create context
const AuthContext = createContext();

// Hook to use auth
export const useAuth = () => useContext(AuthContext);

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fake login (replace with API later)
  const login = async (email, password) => {
    if (email === "test@example.com" && password === "password") {
      const loggedUser = { email };
      setUser(loggedUser);
      return { success: true, user: loggedUser };
    } else {
      return { success: false, error: "Invalid email or password" };
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
