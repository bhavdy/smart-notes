import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { noteService } from '../../services/noteService';
import { format } from 'date-fns';
import { ArrowLeft, Edit2, Archive, Star, Trash2, Pin } from 'lucide-react';
import toast from 'react-hot-toast';

const ViewNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await noteService.getOne(id);
        setNote(data);
      } catch (error) {
        toast.error('Failed to load note');
        navigate('/notes');
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, navigate]);

  const handleAction = async (action) => {
    try {
      if (action === 'delete') {
        if(window.confirm('Are you sure you want to delete this note?')) {
          await noteService.moveToTrash(id);
          toast.success('Note deleted');
          navigate('/notes');
        }
      } else {
        const updates = {};
        if (action === 'archive') updates.isArchived = !note.isArchived;
        if (action === 'favorite') updates.isFavorite = !note.isFavorite;
        if (action === 'pin') updates.isPinned = !note.isPinned;
        
        await noteService.update(id, updates);
        setNote({ ...note, ...updates });
        toast.success('Note updated');
      }
    } catch (error) {
      toast.error('Action failed');
    }
  };

  if (loading) return <div className="p-8">Loading note...</div>;
  if (!note) return <div className="p-8">Note not found</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate(-1)} className="btn btn-ghost flex items-center text-gray-500">
          <ArrowLeft size={20} className="mr-2" /> Back
        </button>
        <div className="flex space-x-2">
          <button onClick={() => handleAction('pin')} className={`btn btn-icon ${note.isPinned ? 'text-blue-500' : 'text-gray-500'}`} title="Pin">
            <Pin size={20} fill={note.isPinned ? 'currentColor' : 'none'} />
          </button>
          <button onClick={() => handleAction('favorite')} className={`btn btn-icon ${note.isFavorite ? 'text-yellow-500' : 'text-gray-500'}`} title="Favorite">
            <Star size={20} fill={note.isFavorite ? 'currentColor' : 'none'} />
          </button>
          <button onClick={() => handleAction('archive')} className="btn btn-icon text-gray-500" title="Archive">
            <Archive size={20} />
          </button>
          <Link to={`/notes/${note._id}/edit`} className="btn btn-primary flex items-center">
            <Edit2 size={16} className="mr-2" /> Edit
          </Link>
          <button onClick={() => handleAction('delete')} className="btn btn-danger flex items-center">
            <Trash2 size={16} className="mr-2" /> Delete
          </button>
        </div>
      </div>

      <div className="card p-8 flex-1 shadow-sm" style={{ backgroundColor: note.color || '#ffffff' }}>
        <h1 className="text-4xl font-bold font-display mb-4">{note.title || 'Untitled'}</h1>
        
        <div className="flex items-center gap-4 mb-8 text-sm text-gray-500 border-b pb-4">
          {note.label && <span className="badge bg-black/10 px-3 py-1 rounded-full text-black">{note.label}</span>}
          <span>Created: {format(new Date(note.createdAt || Date.now()), 'PPp')}</span>
          {note.updatedAt && note.updatedAt !== note.createdAt && (
            <span>Updated: {format(new Date(note.updatedAt), 'PPp')}</span>
          )}
        </div>

        <div className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
          {note.content}
        </div>
      </div>
    </div>
  );
};

export default ViewNote;
