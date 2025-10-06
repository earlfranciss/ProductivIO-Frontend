import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthService } from "../services/AuthService";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      AuthService.validateToken(storedToken)
        .then((res) => {
          if (res.valid) setUser(JSON.parse(storedUser));
          else throw new Error("Invalid token");
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async ({ email, password }) => {
    try {
      const response = await AuthService.login({ email, password });
      if (response && response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        setUser(response.user);
        return { success: true, user: response.user };
      } else {
        return { success: false, errors: response.errors };
      }
    } catch (err) {
      return { success: false, errors: err.body?.errors || { general: [err.message] } };
    }
  };


  const register = async (userData) => {
    try {
      const data = await AuthService.register(userData);
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
