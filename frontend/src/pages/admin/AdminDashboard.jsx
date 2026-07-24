import React, { useState, useEffect } from 'react';
import { Users, FileText, Activity, Shield, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import * as adminService from '../../services/adminService';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalNotes: 0,
    activeUsers: 0,
    adminCount: 0,
    recentUsers: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await adminService.getDashboard();
      if (response && response.data) {
        setStats(response.data);
      } else {
        // Mock data fallback for UI development
        setStats({
          totalUsers: 1250,
          totalNotes: 4850,
          activeUsers: 840,
          adminCount: 5,
          recentUsers: [
            { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'USER', status: 'ACTIVE', joinDate: '2023-10-15' },
            { id: 2, name: 'Bob Jones', email: 'bob@example.com', role: 'ADMIN', status: 'ACTIVE', joinDate: '2023-10-14' },
            { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'USER', status: 'INACTIVE', joinDate: '2023-10-12' },
            { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'USER', status: 'ACTIVE', joinDate: '2023-10-10' },
            { id: 5, name: 'Evan Wright', email: 'evan@example.com', role: 'USER', status: 'ACTIVE', joinDate: '2023-10-09' }
          ]
        });
      }
    } catch (error) {
      toast.error('Failed to load dashboard data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = [12, 19, 15, 25, 22, 30, 28]; // Mock 7 days data

  if (loading) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Welcome back, {user?.name || 'Admin'}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="stat-card card glass p-6 flex flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
            <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
          </div>
        </div>

        <div className="stat-card card glass p-6 flex flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Notes</p>
            <h3 className="text-2xl font-bold">{stats.totalNotes}</h3>
          </div>
        </div>

        <div className="stat-card card glass p-6 flex flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Active Users</p>
            <h3 className="text-2xl font-bold">{stats.activeUsers}</h3>
          </div>
        </div>

        <div className="stat-card card glass p-6 flex flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center">
            <Shield size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Admin Count</p>
            <h3 className="text-2xl font-bold">{stats.adminCount}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts & System Status */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card glass p-6">
            <h3 className="font-semibold mb-4">Notes Activity (7 Days)</h3>
            <div className="flex items-end justify-between h-40 gap-2">
              {chartData.map((val, i) => (
                <div key={i} className="w-full bg-blue-100 dark:bg-blue-900/20 rounded-t-sm relative group h-full flex items-end">
                  <div 
                    className="w-full bg-blue-500 dark:bg-blue-600 rounded-t-sm transition-all duration-300" 
                    style={{ height: `${(val / 30) * 100}%` }}
                  ></div>
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card glass p-6 flex items-center gap-4">
            <CheckCircle className="text-green-500" size={32} />
            <div>
              <h3 className="font-semibold">System Status</h3>
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">All Systems Operational</p>
            </div>
          </div>
        </div>

        {/* Recent Users */}
        <div className="lg:col-span-2 card glass p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Users</h3>
          </div>
          <div className="table-wrap overflow-x-auto">
            <table className="table w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Name</th>
                  <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Email</th>
                  <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Role</th>
                  <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Join Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentUsers?.map(u => (
                  <tr key={u.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4 font-medium">{u.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{u.email}</td>
                    <td className="py-3 px-4">
                      <span className={`badge px-2 py-1 rounded-full text-xs font-medium ${u.role === 'ADMIN' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`badge px-2 py-1 rounded-full text-xs font-medium ${u.status === 'ACTIVE' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">{u.joinDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
