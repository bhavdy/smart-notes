import React, { useState, useEffect } from 'react';
import { noteService } from '../../services/noteService';
import { format } from 'date-fns';
import { Trash2, RotateCcw, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const Trash = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrashNotes();
  }, []);

  const loadTrashNotes = async () => {
    try {
      setLoading(true);
      const data = await noteService.getTrash();
      setNotes(data || []);
    } catch (error) {
      toast.error('Failed to load trash');
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (id) => {
    try {
      await noteService.restoreFromTrash(id);
      toast.success('Note restored');
      loadTrashNotes();
    } catch (error) {
      toast.error('Failed to restore note');
    }
  };

  const handleDeleteForever = async (id) => {
    if(window.confirm('Are you sure you want to permanently delete this note? This cannot be undone.')) {
      try {
        await noteService.deleteForever(id);
        toast.success('Note permanently deleted');
        loadTrashNotes();
      } catch (error) {
        toast.error('Failed to delete note');
      }
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 flex items-center"><Trash2 className="mr-3 text-red-500" /> Trash</h1>
      
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg flex items-center mb-8">
        <AlertTriangle size={20} className="mr-2 text-yellow-600" />
        Notes in trash are permanently deleted after 30 days.
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map(i => <div key={i} className="card p-6 h-40 animate-pulse bg-gray-100"></div>)}
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <Trash2 size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">Trash is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map(note => (
            <div key={note._id} className="note-card card p-5 flex flex-col relative opacity-75">
              <h3 className="font-bold text-lg mb-2">{note.title}</h3>
              <p className="text-gray-600 line-clamp-3 mb-4">{note.content}</p>
              
              <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-100">
                <span className="text-xs text-gray-400">Deleted: {format(new Date(note.updatedAt || Date.now()), 'MMM d')}</span>
                <div className="flex space-x-2">
                  <button onClick={() => handleRestore(note._id)} className="btn btn-ghost text-blue-600 px-2 py-1 text-sm flex items-center">
                    <RotateCcw size={14} className="mr-1" /> Restore
                  </button>
                  <button onClick={() => handleDeleteForever(note._id)} className="btn btn-danger px-2 py-1 text-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trash;
