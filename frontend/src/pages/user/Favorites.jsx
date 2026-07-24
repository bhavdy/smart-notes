import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { noteService } from '../../services/noteService';
import { format } from 'date-fns';
import { Star, Pin } from 'lucide-react';
import toast from 'react-hot-toast';

const Favorites = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const data = await noteService.getFavorites();
      setNotes(data || []);
    } catch (error) {
      toast.error('Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  const handleUnfavorite = async (e, id) => {
    e.preventDefault();
    try {
      await noteService.update(id, { isFavorite: false });
      toast.success('Removed from favorites');
      loadFavorites();
    } catch (error) {
      toast.error('Failed to remove from favorites');
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 flex items-center"><Star className="mr-3 text-yellow-500" fill="currentColor" /> Favorites</h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map(i => <div key={i} className="card p-6 h-40 animate-pulse bg-gray-100"></div>)}
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <Star size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">No favorite notes yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map(note => (
            <Link to={`/notes/${note._id}`} key={note._id} className="note-card card p-5 block group relative hover:shadow-lg transition">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition flex gap-2">
                <button onClick={(e) => handleUnfavorite(e, note._id)} className="p-1 rounded hover:bg-gray-200 text-yellow-500" title="Remove Favorite">
                  <Star size={18} fill="currentColor" />
                </button>
              </div>
              <h3 className="font-bold text-lg mb-2 pr-10">{note.title}</h3>
              <p className="text-gray-600 line-clamp-3 mb-4">{note.content}</p>
              <div className="flex justify-between items-center text-xs text-gray-400 mt-auto">
                <span>{format(new Date(note.createdAt || Date.now()), 'MMM d, yyyy')}</span>
                {note.isPinned && <Pin size={14} className="text-blue-500" />}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
