import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('wm_token'));
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('wm_user')); } catch { return null; }
  });

  const login = (newToken, newUser) => {
    localStorage.setItem('wm_token', newToken);
    localStorage.setItem('wm_user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('wm_token');
    localStorage.removeItem('wm_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
