import React, { useState, useEffect } from 'react';
import { noteService } from '../../services/noteService';
import { format } from 'date-fns';
import { Bell, Trash2, Calendar as CalIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      setLoading(true);
      // Assuming a dedicated endpoint or filtered notes response
      const data = await noteService.getReminders(); 
      setReminders(data || []);
    } catch (error) {
      toast.error('Failed to load reminders');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await noteService.removeReminder(id);
      toast.success('Reminder removed');
      loadReminders();
    } catch (error) {
      toast.error('Failed to remove reminder');
    }
  };

  const filteredReminders = reminders.filter(r => {
    if (filter === 'upcoming') return new Date(r.reminderDate) > new Date();
    if (filter === 'sent') return new Date(r.reminderDate) <= new Date();
    return true;
  });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center"><Bell className="mr-3 text-blue-500" /> Reminders</h1>
        <select className="input" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All Reminders</option>
          <option value="upcoming">Upcoming</option>
          <option value="sent">Sent / Past</option>
        </select>
      </div>

      {loading ? (
        <div className="flex flex-col gap-4">
          {[1,2,3].map(i => <div key={i} className="card p-4 h-20 animate-pulse bg-gray-100"></div>)}
        </div>
      ) : filteredReminders.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <Bell size={48} className="mx-auto mb-4 opacity-50" />
          <p>No reminders found.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredReminders.map(rem => {
            const isPast = new Date(rem.reminderDate) <= new Date();
            return (
              <div key={rem._id} className={`card p-5 flex items-center justify-between ${isPast ? 'opacity-60' : ''}`}>
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full ${isPast ? 'bg-gray-100 text-gray-500' : 'bg-blue-100 text-blue-500'}`}>
                    <Bell size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{rem.title || 'Note Reminder'}</h3>
                    <p className="text-gray-600 text-sm flex items-center mt-1">
                      <CalIcon size={14} className="mr-1" /> {format(new Date(rem.reminderDate), 'PPpp')}
                    </p>
                    {rem.message && <p className="text-gray-500 text-sm mt-2">{rem.message}</p>}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`badge ${isPast ? 'bg-gray-200 text-gray-700' : 'bg-blue-100 text-blue-700'} px-3 py-1 rounded-full text-xs font-medium`}>
                    {isPast ? 'Sent' : 'Upcoming'}
                  </span>
                  <button onClick={() => handleDelete(rem._id)} className="btn btn-icon text-red-500 hover:bg-red-50" title="Remove Reminder">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reminders;
