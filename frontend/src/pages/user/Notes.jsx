import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { noteService } from '../../services/noteService';
import { format } from 'date-fns';
import { Plus, Search, Grid, List, Pin, Archive, Star, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const data = await noteService.getAll();
      setNotes(data);
    } catch (error) {
      toast.error('Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (e, id, action) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (action === 'pin') {
        const note = notes.find(n => n._id === id);
        await noteService.update(id, { isPinned: !note.isPinned });
      } else if (action === 'archive') {
        const note = notes.find(n => n._id === id);
        await noteService.update(id, { isArchived: !note.isArchived });
      } else if (action === 'favorite') {
        const note = notes.find(n => n._id === id);
        await noteService.update(id, { isFavorite: !note.isFavorite });
      } else if (action === 'delete') {
        await noteService.moveToTrash(id);
      }
      loadNotes();
      toast.success('Note updated');
    } catch (error) {
      toast.error('Action failed');
    }
  };

  const filteredNotes = notes.filter(n => {
    if (n.isArchived || n.isTrash) return false;
    if (filter === 'pinned' && !n.isPinned) return false;
    if (searchQuery && !n.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Notes</h1>
        <Link to="/notes/new" className="btn btn-primary flex items-center"><Plus size={20} className="mr-2" /> New Note</Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
        <div className="input-group flex w-full md:w-96 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input 
            type="text" 
            className="input w-full pl-10" 
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <select className="input" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Notes</option>
            <option value="pinned">Pinned</option>
          </select>
          <div className="flex border rounded-md overflow-hidden bg-white">
            <button className={`p-2 ${viewMode === 'grid' ? 'bg-gray-200' : ''}`} onClick={() => setViewMode('grid')}><Grid size={20} /></button>
            <button className={`p-2 ${viewMode === 'list' ? 'bg-gray-200' : ''}`} onClick={() => setViewMode('list')}><List size={20} /></button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => <div key={i} className="card p-6 h-40 animate-pulse bg-gray-100"></div>)}
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <FileText size={48} className="mx-auto mb-4 opacity-50" />
          <p>No notes found.</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
          {filteredNotes.map(note => (
            <Link to={`/notes/${note._id}`} key={note._id} className="note-card card p-5 block group relative hover:shadow-lg transition">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition flex gap-2">
                <button onClick={(e) => handleAction(e, note._id, 'pin')} className={`p-1 rounded hover:bg-gray-200 ${note.isPinned ? 'text-blue-500' : 'text-gray-500'}`}><Pin size={18} fill={note.isPinned ? 'currentColor' : 'none'} /></button>
                <button onClick={(e) => handleAction(e, note._id, 'favorite')} className={`p-1 rounded hover:bg-gray-200 ${note.isFavorite ? 'text-yellow-500' : 'text-gray-500'}`}><Star size={18} fill={note.isFavorite ? 'currentColor' : 'none'} /></button>
                <button onClick={(e) => handleAction(e, note._id, 'archive')} className="p-1 rounded hover:bg-gray-200 text-gray-500"><Archive size={18} /></button>
                <button onClick={(e) => handleAction(e, note._id, 'delete')} className="p-1 rounded hover:bg-gray-200 text-red-500"><Trash2 size={18} /></button>
              </div>
              <h3 className="font-bold text-lg mb-2 pr-24">{note.title}</h3>
              <p className="text-gray-600 line-clamp-3 mb-4">{note.content}</p>
              <div className="flex justify-between items-center text-xs text-gray-400 mt-auto">
                <span>{format(new Date(note.createdAt || Date.now()), 'MMM d, yyyy')}</span>
                {note.label && <span className="badge bg-gray-100 px-2 py-1 rounded">{note.label}</span>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
