import api from './api';

const mockNotes = [
  { id: 1, title: 'Welcome to SmartNotes! 🎉', content: '# Welcome!\n\nThis is your first note. You can:\n- Create and organize notes\n- Add labels and reminders\n- Use rich text formatting\n- Pin favorites\n\nEnjoy organizing your thoughts!', labelId: null, labelName: null, labelColor: null, isPinned: true, isArchived: false, isDeleted: false, isFavorite: true, color: '#6C63FF', createdAt: new Date(Date.now() - 86400000*3).toISOString(), updatedAt: new Date(Date.now() - 3600000).toISOString() },
  { id: 2, title: 'Project Kickoff Meeting', content: '## Meeting Notes\n\n**Date:** Today\n\n### Agenda\n1. Project overview\n2. Team introductions\n3. Timeline discussion\n\n### Action Items\n- [ ] Send project brief\n- [ ] Schedule follow-up', labelId: 1, labelName: 'Work', labelColor: '#6C63FF', isPinned: false, isArchived: false, isDeleted: false, isFavorite: false, color: '#FFFFFF', createdAt: new Date(Date.now() - 86400000).toISOString(), updatedAt: new Date(Date.now() - 1800000).toISOString() },
  { id: 3, title: 'Book Reading List', content: '## Books to Read\n\n1. Clean Code - Robert Martin\n2. The Pragmatic Programmer\n3. Design Patterns\n4. Atomic Habits', labelId: 2, labelName: 'Personal', labelColor: '#FF6584', isPinned: false, isArchived: false, isDeleted: false, isFavorite: true, color: '#fff0f5', createdAt: new Date(Date.now() - 86400000*5).toISOString(), updatedAt: new Date(Date.now() - 86400000*2).toISOString() },
  { id: 4, title: 'App Idea - Smart Habit Tracker', content: '## Concept\n\nBuild a habit tracking app that uses AI to suggest personalized habits based on user goals.\n\n### Features\n- Daily check-ins\n- Progress visualization\n- AI recommendations\n- Social challenges', labelId: 3, labelName: 'Ideas', labelColor: '#43C6AC', isPinned: false, isArchived: false, isDeleted: false, isFavorite: false, color: '#f0fff4', createdAt: new Date(Date.now() - 86400000*7).toISOString(), updatedAt: new Date(Date.now() - 86400000*2).toISOString() },
  { id: 5, title: 'Q3 Study Plan', content: '## Study Goals\n\n- React Advanced Patterns\n- System Design\n- Data Structures & Algorithms\n\n### Weekly Schedule\n- Mon/Wed: DSA\n- Tue/Thu: System Design\n- Fri: React', labelId: 4, labelName: 'Study', labelColor: '#F7971E', isPinned: false, isArchived: false, isDeleted: false, isFavorite: false, color: '#fffbeb', createdAt: new Date(Date.now() - 86400000*2).toISOString(), updatedAt: new Date(Date.now() - 900000).toISOString() },
];

const MOCK = false;

export const noteService = {
  async getAll(page = 0, size = 12) {
    if (MOCK) {
      await new Promise(r => setTimeout(r, 400));
      return { content: mockNotes.filter(n => !n.isDeleted && !n.isArchived), totalElements: mockNotes.length, totalPages: 1, number: 0 };
    }
    const res = await api.get(`/notes?page=${page}&size=${size}`);
    return res.data.data;
  },
  async getOne(id) {
    if (MOCK) return mockNotes.find(n => n.id === id);
    const res = await api.get(`/notes/${id}`);
    return res.data.data;
  },
  async create(data) {
    if (MOCK) { const n = { ...data, id: Date.now(), isPinned: false, isArchived: false, isDeleted: false, isFavorite: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }; mockNotes.push(n); return n; }
    const res = await api.post('/notes', data);
    return res.data.data;
  },
  async update(id, data) {
    if (MOCK) { const idx = mockNotes.findIndex(n => n.id === id); if (idx > -1) { mockNotes[idx] = { ...mockNotes[idx], ...data }; return mockNotes[idx]; } }
    const res = await api.put(`/notes/${id}`, data);
    return res.data.data;
  },
  async delete(id) {
    if (MOCK) { const n = mockNotes.find(n => n.id === id); if (n) n.isDeleted = true; return; }
    await api.delete(`/notes/${id}`);
  },
  async archive(id) {
    if (MOCK) { const n = mockNotes.find(n => n.id === id); if (n) n.isArchived = !n.isArchived; return n; }
    const res = await api.patch(`/notes/${id}/archive`);
    return res.data.data;
  },
  async pin(id) {
    if (MOCK) { const n = mockNotes.find(n => n.id === id); if (n) n.isPinned = !n.isPinned; return n; }
    const res = await api.patch(`/notes/${id}/pin`);
    return res.data.data;
  },
  async favorite(id) {
    if (MOCK) { const n = mockNotes.find(n => n.id === id); if (n) n.isFavorite = !n.isFavorite; return n; }
    const res = await api.patch(`/notes/${id}/favorite`);
    return res.data.data;
  },
  async getArchived() {
    if (MOCK) return mockNotes.filter(n => n.isArchived && !n.isDeleted);
    const res = await api.get('/notes/archived'); return res.data.data;
  },
  async getTrash() {
    if (MOCK) return mockNotes.filter(n => n.isDeleted);
    const res = await api.get('/notes/trash'); return res.data.data;
  },
  async getFavorites() {
    if (MOCK) return mockNotes.filter(n => n.isFavorite && !n.isDeleted);
    const res = await api.get('/notes/favorites'); return res.data.data;
  },
  async search(q) {
    if (MOCK) return mockNotes.filter(n => !n.isDeleted && (n.title.toLowerCase().includes(q.toLowerCase()) || (n.content || '').toLowerCase().includes(q.toLowerCase())));
    const res = await api.get(`/notes/search?q=${encodeURIComponent(q)}`); return res.data.data;
  },
};
