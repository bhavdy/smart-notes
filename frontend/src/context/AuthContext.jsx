import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('sn_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const stored = localStorage.getItem('sn_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setToken(data.token);
    setUser({ id: data.id, name: data.name, email: data.email, role: data.role, avatar: data.avatar });
    localStorage.setItem('sn_token', data.token);
    localStorage.setItem('sn_user', JSON.stringify({ id: data.id, name: data.name, email: data.email, role: data.role, avatar: data.avatar }));
    return data;
  };

  const register = async (nameOrObj, email, password) => {
    let n = nameOrObj, e = email, p = password;
    if (typeof nameOrObj === 'object' && nameOrObj !== null) {
      n = nameOrObj.name;
      e = nameOrObj.email;
      p = nameOrObj.password;
    }
    const data = await authService.register(n, e, p);
    setToken(data.token);
    setUser({ id: data.id, name: data.name, email: data.email, role: data.role, avatar: data.avatar });
    localStorage.setItem('sn_token', data.token);
    localStorage.setItem('sn_user', JSON.stringify({ id: data.id, name: data.name, email: data.email, role: data.role, avatar: data.avatar }));
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('sn_token');
    localStorage.removeItem('sn_user');
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('sn_user', JSON.stringify(updated));
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUser, isAdmin, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
