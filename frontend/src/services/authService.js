import api from './api';

// Mock mode: returns demo data when backend is unavailable
const MOCK = false; // Set to true to use mock data without backend

const mockUser = { token: 'mock_token', type: 'Bearer', id: 2, name: 'Jane Doe', email: 'user@smartnotes.com', role: 'USER', avatar: null };
const mockAdmin = { token: 'mock_admin_token', type: 'Bearer', id: 1, name: 'Admin User', email: 'admin@smartnotes.com', role: 'ADMIN', avatar: null };

export const authService = {
  async login(email, password) {
    if (MOCK) {
      await new Promise(r => setTimeout(r, 600));
      if (email === 'admin@smartnotes.com') return mockAdmin;
      return mockUser;
    }
    const res = await api.post('/auth/login', { email, password });
    return res.data.data;
  },

  async register(nameOrObj, email, password) {
    let n = nameOrObj, e = email, p = password;
    if (typeof nameOrObj === 'object' && nameOrObj !== null) {
      n = nameOrObj.name;
      e = nameOrObj.email;
      p = nameOrObj.password;
    }
    if (MOCK) {
      await new Promise(r => setTimeout(r, 600));
      return { ...mockUser, name: n, email: e };
    }
    const res = await api.post('/auth/register', { name: n, email: e, password: p });
    return res.data.data;
  },

  async me() {
    const res = await api.get('/auth/me');
    return res.data.data;
  }
};
