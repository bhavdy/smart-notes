import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, X, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import * as adminService from '../../services/adminService';

const AdminFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const response = await adminService.getFeedback();
      if (response && response.data) {
        setFeedback(response.data);
      } else {
        // Mock data
        setFeedback([
          { id: 1, user: 'Alice Smith', subject: 'Great App!', rating: 5, status: 'PENDING', date: '2023-10-24', message: 'I really love the new UI, it is so clean and easy to use. Keep up the good work!' },
          { id: 2, user: 'Bob Jones', subject: 'Bug in notes', rating: 3, status: 'REVIEWED', date: '2023-10-23', message: 'Sometimes when I save a note, it says saved but the changes disappear after refresh. Please fix.' },
          { id: 3, user: 'Charlie Brown', subject: 'Feature Request', rating: 4, status: 'RESOLVED', date: '2023-10-21', message: 'Can you add a dark mode toggle in the profile settings?' },
          { id: 4, user: 'Diana Prince', subject: 'Excellent Support', rating: 5, status: 'PENDING', date: '2023-10-20', message: 'The admin team responded very quickly to my password issue. Thank you.' },
        ]);
      }
    } catch (error) {
      toast.error('Failed to load feedback');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setFeedback(feedback.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
    toast.success(`Feedback status updated to ${newStatus}`);
    // In real app, call API
  };

  const openModal = (item) => {
    setSelectedFeedback(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFeedback(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'REVIEWED':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'RESOLVED':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex text-yellow-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={16} fill={star <= rating ? "currentColor" : "none"} className={star <= rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"} />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">User Feedback</h1>
        <p className="text-gray-500 dark:text-gray-400">Review and manage feedback from users</p>
      </div>

      <div className="card glass overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading feedback...</div>
        ) : (
          <div className="table-wrap overflow-x-auto">
            <table className="table w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400">User</th>
                  <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Subject</th>
                  <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Rating</th>
                  <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Date</th>
                  <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedback.length > 0 ? (
                  feedback.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="py-3 px-4 font-medium">{item.user}</td>
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{item.subject}</td>
                      <td className="py-3 px-4">{renderStars(item.rating)}</td>
                      <td className="py-3 px-4">
                        <select 
                          className={`text-xs font-medium px-2 py-1 rounded-full outline-none cursor-pointer appearance-none ${getStatusBadge(item.status)}`}
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        >
                          <option value="PENDING" className="bg-white text-gray-900">PENDING</option>
                          <option value="REVIEWED" className="bg-white text-gray-900">REVIEWED</option>
                          <option value="RESOLVED" className="bg-white text-gray-900">RESOLVED</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">{item.date}</td>
                      <td className="py-3 px-4 flex justify-end">
                        <button 
                          className="btn btn-primary btn-icon p-2 rounded-md"
                          onClick={() => openModal(item)}
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-500">No feedback found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Feedback Details */}
      {isModalOpen && selectedFeedback && (
        <div className="modal-overlay fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="modal-box card bg-white dark:bg-gray-900 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <MessageSquare size={20} className="text-primary-500" />
                Feedback Details
              </h3>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">From User</p>
                  <p className="font-medium">{selectedFeedback.user}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Date Submitted</p>
                  <p className="font-medium">{selectedFeedback.date}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Rating</p>
                {renderStars(selectedFeedback.rating)}
              </div>
              
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Subject</p>
                <p className="font-semibold text-lg">{selectedFeedback.subject}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Message</p>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg text-gray-700 dark:text-gray-300">
                  {selectedFeedback.message}
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Status:</span>
                <span className={`badge px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(selectedFeedback.status)}`}>
                  {selectedFeedback.status}
                </span>
              </div>
              <button 
                className="btn btn-secondary px-4 py-2 border rounded-md"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeedback;
