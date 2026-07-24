import React, { useState, useEffect } from 'react';
import { Filter, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import * as adminService from '../../services/adminService';

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await adminService.getLogs();
      if (response && response.data) {
        setLogs(response.data);
      } else {
        // Mock data
        setLogs([
          { id: 1, user: 'Alice Smith', action: 'CREATE', entity: 'NOTE', description: 'Created new note "Q3 Meeting"', time: '2023-10-24 14:30:22' },
          { id: 2, user: 'Bob Jones', action: 'UPDATE', entity: 'USER', description: 'Updated profile settings', time: '2023-10-24 13:15:05' },
          { id: 3, user: 'Diana Prince', action: 'DELETE', entity: 'NOTE', description: 'Deleted note "Old Draft"', time: '2023-10-24 11:45:10' },
          { id: 4, user: 'Admin User', action: 'UPDATE', entity: 'SYSTEM', description: 'Modified user role for ID: 45', time: '2023-10-24 09:20:00' },
          { id: 5, user: 'Evan Wright', action: 'CREATE', entity: 'FEEDBACK', description: 'Submitted new feedback', time: '2023-10-23 16:55:30' },
          { id: 6, user: 'Alice Smith', action: 'UPDATE', entity: 'NOTE', description: 'Edited note "Shopping List"', time: '2023-10-23 15:10:12' },
        ]);
      }
    } catch (error) {
      toast.error('Failed to load activity logs');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getActionBadge = (action) => {
    switch (action) {
      case 'CREATE':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'DELETE':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'UPDATE':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const filteredLogs = filter === 'ALL' ? logs : logs.filter(log => log.action === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Activity Logs</h1>
          <p className="text-gray-500 dark:text-gray-400">Monitor system and user actions</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          <select 
            className="input py-2 px-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="ALL">All Actions</option>
            <option value="CREATE">Creates</option>
            <option value="UPDATE">Updates</option>
            <option value="DELETE">Deletes</option>
          </select>
        </div>
      </div>

      <div className="card glass overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading logs...</div>
        ) : (
          <div className="table-wrap overflow-x-auto">
            <table className="table w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400 w-16">#</th>
                  <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400">User</th>
                  <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Action</th>
                  <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Entity</th>
                  <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400 w-1/3">Description</th>
                  <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} /> Time
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log, index) => (
                    <tr key={log.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="py-3 px-4 text-gray-500 font-mono text-sm">{log.id}</td>
                      <td className="py-3 px-4 font-medium">{log.user}</td>
                      <td className="py-3 px-4">
                        <span className={`badge px-2 py-1 rounded-full text-xs font-medium tracking-wide ${getActionBadge(log.action)}`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">{log.entity}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{log.description}</td>
                      <td className="py-3 px-4 text-sm text-gray-500 whitespace-nowrap">{log.time}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-500">No activity logs found matching the filter</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Pagination */}
        {!loading && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm text-gray-500">
            <div>Showing {filteredLogs.length} logs</div>
            <div className="flex gap-2">
              <button className="btn btn-ghost px-3 py-1 border rounded-md" disabled>Previous</button>
              <button className="btn btn-ghost px-3 py-1 border rounded-md" disabled>Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLogs;
