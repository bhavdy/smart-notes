import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { noteService } from '../../services/noteService';
import { labelService } from '../../services/labelService';
import { ArrowLeft, Save, Pin, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    labelId: '',
    color: '#ffffff',
    isPinned: false,
    isFavorite: false
  });
  const [labels, setLabels] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [labelsData, noteData] = await Promise.all([
          labelService.getAll().catch(() => []),
          noteService.getOne(id)
        ]);
        setLabels(labelsData || []);
        if (noteData) {
          setFormData({
            title: noteData.title || '',
            content: noteData.content || '',
            labelId: noteData.labelId || '',
            color: noteData.color || '#ffffff',
            isPinned: noteData.isPinned || false,
            isFavorite: noteData.isFavorite || false
          });
        }
      } catch (err) {
        toast.error('Failed to load note');
        navigate('/notes');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() && !formData.content.trim()) {
      toast.error('Title or content is required');
      return;
    }
    try {
      setIsSaving(true);
      await noteService.update(id, formData);
      toast.success('Note updated!');
      navigate(`/notes/${id}`);
    } catch (error) {
      toast.error('Failed to update note');
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-8">Loading note...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate(-1)} className="btn btn-ghost flex items-center text-gray-500">
          <ArrowLeft size={20} className="mr-2" /> Back
        </button>
        <div className="flex space-x-2">
          <button type="button" onClick={() => navigate(-1)} className="btn btn-ghost">Cancel</button>
          <button onClick={handleSubmit} disabled={isSaving} className="btn btn-primary flex items-center">
            <Save size={18} className="mr-2" /> {isSaving ? 'Saving...' : 'Save Note'}
          </button>
        </div>
      </div>

      <div className="card p-8 flex-1 bg-white shadow-sm flex flex-col" style={{ backgroundColor: formData.color }}>
        <div className="flex justify-between items-start mb-6 border-b pb-4 border-gray-100">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Note Title"
            className="text-4xl font-bold bg-transparent outline-none w-full placeholder-gray-300 font-display"
          />
          <div className="flex items-center space-x-2 ml-4">
            <button 
              onClick={() => setFormData(p => ({...p, isPinned: !p.isPinned}))}
              className={`p-2 rounded-full hover:bg-black/5 ${formData.isPinned ? 'text-blue-500' : 'text-gray-400'}`}
            >
              <Pin size={24} fill={formData.isPinned ? 'currentColor' : 'none'} />
            </button>
            <button 
              onClick={() => setFormData(p => ({...p, isFavorite: !p.isFavorite}))}
              className={`p-2 rounded-full hover:bg-black/5 ${formData.isFavorite ? 'text-yellow-500' : 'text-gray-400'}`}
            >
              <Star size={24} fill={formData.isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <select name="labelId" value={formData.labelId} onChange={handleChange} className="input max-w-xs text-sm">
            <option value="">No Label</option>
            {labels.map(l => <option key={l._id} value={l._id}>{l.name}</option>)}
          </select>
          <input type="color" name="color" value={formData.color} onChange={handleChange} className="h-10 w-10 p-1 border rounded" />
        </div>

        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Start typing your note here..."
          className="flex-1 w-full bg-transparent outline-none resize-none text-lg text-gray-700 leading-relaxed min-h-[300px]"
        />
      </div>
    </div>
  );
};

export default EditNote;
