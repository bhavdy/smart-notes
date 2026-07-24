import React, { useState, useEffect } from 'react';
import { labelService } from '../../services/labelService';
import { Tag, Plus, Edit2, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#64748b'];

const Labels = () => {
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLabel, setEditingLabel] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', color: COLORS[4] });

  useEffect(() => {
    loadLabels();
  }, []);

  const loadLabels = async () => {
    try {
      setLoading(true);
      const data = await labelService.getAll();
      setLabels(data || []);
    } catch (error) {
      toast.error('Failed to load labels');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (label = null) => {
    if (label) {
      setEditingLabel(label);
      setFormData({ name: label.name, color: label.color || COLORS[4] });
    } else {
      setEditingLabel(null);
      setFormData({ name: '', color: COLORS[4] });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLabel(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return toast.error('Name is required');

    try {
      if (editingLabel) {
        await labelService.update(editingLabel._id, formData);
        toast.success('Label updated');
      } else {
        await labelService.create(formData);
        toast.success('Label created');
      }
      handleCloseModal();
      loadLabels();
    } catch (error) {
      toast.error('Failed to save label');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this label? Notes with this label will not be deleted.')) {
      try {
        await labelService.delete(id);
        toast.success('Label deleted');
        loadLabels();
      } catch (error) {
        toast.error('Failed to delete label');
      }
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center"><Tag className="mr-3 text-purple-500" /> Labels</h1>
        <button onClick={() => handleOpenModal()} className="btn btn-primary flex items-center">
          <Plus size={20} className="mr-2" /> Create Label
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="card p-4 h-24 animate-pulse bg-gray-100"></div>)}
        </div>
      ) : labels.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <Tag size={48} className="mx-auto mb-4 opacity-50" />
          <p>No labels found. Create one to organize your notes.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {labels.map(label => (
            <div key={label._id} className="card p-4 flex items-center justify-between group">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: label.color || '#ccc' }}></div>
                <span className="font-medium text-gray-800">{label.name}</span>
              </div>
              <div className="flex opacity-0 group-hover:opacity-100 transition space-x-1">
                <button onClick={() => handleOpenModal(label)} className="p-1.5 rounded hover:bg-gray-100 text-gray-500"><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(label._id)} className="p-1.5 rounded hover:bg-red-50 text-red-500"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="modal-box bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{editingLabel ? 'Edit Label' : 'Create Label'}</h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-800"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="input-label block mb-1 text-sm font-medium">Label Name</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  className="input w-full"
                  placeholder="e.g. Work, Personal"
                  autoFocus
                />
              </div>
              <div className="mb-6">
                <label className="input-label block mb-2 text-sm font-medium">Color</label>
                <div className="flex gap-2 flex-wrap">
                  {COLORS.map(c => (
                    <button 
                      key={c}
                      type="button"
                      onClick={() => setFormData({...formData, color: c})}
                      className={`w-8 h-8 rounded-full border-2 ${formData.color === c ? 'border-gray-800' : 'border-transparent'}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={handleCloseModal} className="btn btn-ghost">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Label</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Labels;
