import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { noteService } from '../../services/noteService';
import { format } from 'date-fns';
import { FileText, Star, Archive, Tag, Plus, ArrowRight, Pin } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, favorites: 0, archived: 0, labels: 0 });
  const [recentNotes, setRecentNotes] = useState([]);
  const [pinnedNotes, setPinnedNotes] = useState([]);
  const [quickTitle, setQuickTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const allNotes = await noteService.getAll();
      
      const pinned = allNotes.filter(n => n.isPinned);
      const recent = allNotes.slice(0, 5);
      
      setPinnedNotes(pinned);
      setRecentNotes(recent);
      setStats({
        total: allNotes.length,
        favorites: allNotes.filter(n => n.isFavorite).length,
        archived: allNotes.filter(n => n.isArchived).length,
        labels: 0 // Mock label count as it requires labelService
      });
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdd = async (e) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;
    try {
      await noteService.create({ title: quickTitle, content: '' });
      toast.success('Note added quickly');
      setQuickTitle('');
      loadDashboardData();
    } catch (error) {
      toast.error('Failed to quick add note');
    }
  };

  if (loading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'User'}!</h1>
        <p className="text-gray-500">{format(new Date(), 'EEEE, MMMM do, yyyy')}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="stat-card card p-6 flex items-center space-x-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full"><FileText size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">Total Notes</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
        </div>
        <div className="stat-card card p-6 flex items-center space-x-4">
          <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full"><Star size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">Favorites</p>
            <p className="text-2xl font-bold">{stats.favorites}</p>
          </div>
        </div>
        <div className="stat-card card p-6 flex items-center space-x-4">
          <div className="p-3 bg-gray-100 text-gray-600 rounded-full"><Archive size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">Archived</p>
            <p className="text-2xl font-bold">{stats.archived}</p>
          </div>
        </div>
        <div className="stat-card card p-6 flex items-center space-x-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-full"><Tag size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">Labels</p>
            <p className="text-2xl font-bold">{stats.labels}</p>
          </div>
        </div>
      </div>

      <div className="card p-6 mb-8 flex flex-col md:flex-row items-center gap-4">
        <h2 className="font-semibold whitespace-nowrap">Quick Add:</h2>
        <form onSubmit={handleQuickAdd} className="flex w-full gap-2">
          <input 
            type="text" 
            className="input flex-1" 
            placeholder="Type a note title and press enter..."
            value={quickTitle}
            onChange={(e) => setQuickTitle(e.target.value)}
          />
          <button type="submit" className="btn btn-primary"><Plus size={20} /> Add</button>
        </form>
      </div>

      {pinnedNotes.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center"><Pin size={20} className="mr-2" /> Pinned Notes</h2>
          <div className="flex overflow-x-auto gap-4 pb-4">
            {pinnedNotes.map(note => (
              <Link to={`/notes/${note._id}`} key={note._id} className="note-card card p-4 min-w-[250px] shrink-0 block hover:shadow-lg transition">
                <h3 className="font-semibold mb-2">{note.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-3">{note.content}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recent Notes</h2>
          <Link to="/notes" className="btn btn-ghost text-sm flex items-center">View All <ArrowRight size={16} className="ml-1" /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentNotes.map(note => (
            <Link to={`/notes/${note._id}`} key={note._id} className="note-card card p-5 block hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-2">{note.title}</h3>
              <p className="text-gray-600 line-clamp-3 mb-4">{note.content}</p>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>{format(new Date(note.updatedAt || Date.now()), 'MMM d, yyyy')}</span>
              </div>
            </Link>
          ))}
          {recentNotes.length === 0 && (
            <div className="col-span-full p-8 text-center text-gray-500">No notes found. Create your first one!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
