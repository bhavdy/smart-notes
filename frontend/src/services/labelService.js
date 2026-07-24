import api from './api';

const mockLabels = [
  { id: 1, name: 'Work',     color: '#6C63FF' },
  { id: 2, name: 'Personal', color: '#FF6584' },
  { id: 3, name: 'Ideas',    color: '#43C6AC' },
  { id: 4, name: 'Study',    color: '#F7971E' },
];

const MOCK = false;

export const labelService = {
  async getAll() {
    if (MOCK) { await new Promise(r => setTimeout(r, 200)); return mockLabels; }
    const res = await api.get('/labels'); return res.data.data;
  },
  async create(name, color) {
    if (MOCK) { const l = { id: Date.now(), name, color }; mockLabels.push(l); return l; }
    const res = await api.post('/labels', { name, color }); return res.data.data;
  },
  async delete(id) {
    if (MOCK) { const idx = mockLabels.findIndex(l => l.id === id); if (idx > -1) mockLabels.splice(idx, 1); return; }
    await api.delete(`/labels/${id}`);
  },
};
