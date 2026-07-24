import api from './api';

export async function getDashboard() {
  const res = await api.get('/admin/dashboard');
  return res.data.data;
}

export async function getUsers(page = 0, size = 10) {
  const res = await api.get(`/admin/users?page=${page}&size=${size}`);
  return res.data.data;
}

export async function toggleUser(id) {
  const res = await api.patch(`/admin/users/${id}/toggle`);
  return res.data.data;
}

export async function deleteUser(id) {
  await api.delete(`/admin/users/${id}`);
}

export async function getLogs(page = 0, size = 20) {
  const res = await api.get(`/admin/logs?page=${page}&size=${size}`);
  return res.data.data;
}

export async function getFeedback(page = 0, size = 10) {
  const res = await api.get(`/admin/feedback?page=${page}&size=${size}`);
  return res.data.data;
}

// Also export as named object for compatibility
export const adminService = { getDashboard, getUsers, toggleUser, deleteUser, getLogs, getFeedback };
