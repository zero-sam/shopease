import { createContext, useState, useEffect } from 'react';
import { loginUser, getProfile } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState("");

  // Login Function
  const login = async (email, password) => {
    const res = await loginUser(email, password);
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    setAuthError("");
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setAuthError("");
  };

  // Auto-login if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getProfile()
        .then(res => {
          setUser(res.data);
          setAuthError("");
        })
        .catch((err) => {
          setAuthError("Session expired or invalid. Please log in again.");
          setUser(null);
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, authError }}>
      {authError && (
        <div style={{ background: '#ffe0e0', color: '#c0392b', padding: '10px', textAlign: 'center' }}>
          {authError}
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
};
