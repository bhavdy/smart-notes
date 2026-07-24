import React, { useState, useEffect } from 'react';
import { Search, UserX, UserCheck, Trash2, Shield, User } from 'lucide-react';
import toast from 'react-hot-toast';
import * as adminService from '../../services/adminService';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminService.getUsers();
      if (response && response.data) {
        setUsers(response.data);
      } else {
        // Mock data
        setUsers([
          { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'USER', status: 'ACTIVE' },
          { id: 2, name: 'Bob Jones', email: 'bob@example.com', role: 'ADMIN', status: 'ACTIVE' },
          { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'USER', status: 'INACTIVE' },
          { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'USER', status: 'ACTIVE' },
          { id: 5, name: 'Evan Wright', email: 'evan@example.com', role: 'USER', status: 'ACTIVE' }
        ]);
      }
    } catch (error) {
      toast.error('Failed to load users');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      // Mock toggle
      setUsers(users.map(u => 
        u.id === userId 
          ? { ...u, status: currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' }
          : u
      ));
      toast.success(`User status updated to ${currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'}`);
    } catch (error) {
      toast.error('Failed to update user status');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        // Mock delete
        setUsers(users.filter(u => u.id !== userId));
        toast.success('User deleted successfully');
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Manage Users</h1>
          <p className="text-gray-500 dark:text-gray-400">View and manage system users</p>
        </div>
        
        <div className="input-group relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="input w-full pl-10"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="card glass overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading users...</div>
        ) : (
          <div className="table-wrap overflow-x-auto">
            <table className="table w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400 w-12">#</th>
                  <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400 w-16">Avatar</th>
                  <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Name</th>
                  <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Email</th>
                  <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Role</th>
                  <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="py-3 px-4 text-gray-500">{index + 1}</td>
                      <td className="py-3 px-4">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                          {user.role === 'ADMIN' ? <Shield size={16} /> : <User size={16} />}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">{user.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`badge px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === 'ADMIN' 
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' 
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`badge px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === 'ACTIVE' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 flex justify-end gap-2">
                        <button 
                          className="btn btn-secondary p-2 rounded-md"
                          onClick={() => handleToggleStatus(user.id, user.status)}
                          title={user.status === 'ACTIVE' ? "Disable User" : "Enable User"}
                        >
                          {user.status === 'ACTIVE' ? <UserX size={18} /> : <UserCheck size={18} />}
                        </button>
                        <button 
                          className="btn btn-danger p-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50"
                          onClick={() => handleDeleteUser(user.id)}
                          title="Delete User"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-gray-500">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Simple Pagination */}
        {!loading && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm text-gray-500">
            <div>Showing {filteredUsers.length} users</div>
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

export default ManageUsers;
