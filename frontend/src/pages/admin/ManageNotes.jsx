import React from 'react';
import { FileText, Database, Archive, AlertCircle } from 'lucide-react';

const ManageNotes = () => {
  // Mock data for notes summary
  const summaryData = {
    totalNotes: 4850,
    notesToday: 124,
    archivedNotes: 560
  };

  const mockNotes = [
    { id: 'N-1001', user: 'Alice Smith', title: 'Q3 Financial Report', created: '2023-10-24', status: 'Active' },
    { id: 'N-1002', user: 'Bob Jones', title: 'Project Ideas 2024', created: '2023-10-23', status: 'Active' },
    { id: 'N-1003', user: 'Diana Prince', title: 'Meeting Minutes', created: '2023-10-23', status: 'Archived' },
    { id: 'N-1004', user: 'Evan Wright', title: 'System Architecture', created: '2023-10-22', status: 'Active' },
    { id: 'N-1005', user: 'Alice Smith', title: 'Personal To-Do', created: '2023-10-21', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Manage Notes</h1>
        <p className="text-gray-500 dark:text-gray-400">System-wide notes overview</p>
      </div>

      <div className="note-card card bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-blue-500 mt-0.5" size={20} />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-300">Privacy Notice</h3>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
              For privacy reasons, full note content is only accessible via individual user accounts. 
              Admins can view metadata, summary statistics, and manage system-wide storage policies here.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card card glass p-6 flex items-center gap-4 border-t-4 border-indigo-500">
          <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Database size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total System Notes</p>
            <h3 className="text-2xl font-bold">{summaryData.totalNotes}</h3>
          </div>
        </div>

        <div className="stat-card card glass p-6 flex items-center gap-4 border-t-4 border-green-500">
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Created Today</p>
            <h3 className="text-2xl font-bold">{summaryData.notesToday}</h3>
          </div>
        </div>

        <div className="stat-card card glass p-6 flex items-center gap-4 border-t-4 border-gray-500">
          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 flex items-center justify-center">
            <Archive size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Archived Notes</p>
            <h3 className="text-2xl font-bold">{summaryData.archivedNotes}</h3>
          </div>
        </div>
      </div>

      <div className="card glass overflow-hidden mt-6">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold">Recent Notes Activity</h3>
        </div>
        
        <div className="table-wrap overflow-x-auto">
          <table className="table w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400">ID</th>
                <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400">User</th>
                <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Title</th>
                <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Created</th>
                <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockNotes.map((note, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-mono text-sm text-gray-500">{note.id}</td>
                  <td className="py-3 px-4 font-medium">{note.user}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{note.title}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{note.created}</td>
                  <td className="py-3 px-4">
                    <span className={`badge px-2 py-1 rounded-full text-xs font-medium ${
                      note.status === 'Active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {note.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageNotes;
