import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { noteService } from '../../services/noteService';
import { format } from 'date-fns';
import { Archive, RotateCcw, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ArchivePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArchivedNotes();
  }, []);

  const loadArchivedNotes = async () => {
    try {
      setLoading(true);
      const data = await noteService.getArchived();
      setNotes(data || []);
    } catch (error) {
      toast.error('Failed to load archived notes');
    } finally {
      setLoading(false);
    }
  };

  const handleUnarchive = async (e, id) => {
    e.preventDefault();
    try {
      await noteService.update(id, { isArchived: false });
      toast.success('Note unarchived');
      loadArchivedNotes();
    } catch (error) {
      toast.error('Failed to unarchive note');
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 flex items-center"><Archive className="mr-3 text-gray-500" /> Archived Notes</h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map(i => <div key={i} className="card p-6 h-40 animate-pulse bg-gray-100"></div>)}
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <Archive size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">No archived notes.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map(note => (
            <Link to={`/notes/${note._id}`} key={note._id} className="note-card card p-5 block group relative hover:shadow-lg transition opacity-80 hover:opacity-100">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition flex gap-2">
                <button onClick={(e) => handleUnarchive(e, note._id)} className="p-1 rounded hover:bg-gray-200 text-blue-500" title="Unarchive"><RotateCcw size={18} /></button>
              </div>
              <h3 className="font-bold text-lg mb-2 pr-10">{note.title}</h3>
              <p className="text-gray-600 line-clamp-3 mb-4">{note.content}</p>
              <div className="flex justify-between items-center text-xs text-gray-400 mt-auto">
                <span>{format(new Date(note.createdAt || Date.now()), 'MMM d, yyyy')}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArchivePage;
