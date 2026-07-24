import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Activity, MessageSquare, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminSidebar({ open, onClose }) {
  const { logout } = useAuth();

  return (
    <>
      {open && <div className="modal-overlay md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>}
      <aside className={`sidebar fixed md:sticky top-0 left-0 h-screen w-64 bg-gradient-to-b from-base-200 to-base-300 border-r border-base-300 z-50 transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} flex flex-col`}>
        <div className="sidebar-logo p-6 border-b border-base-300 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Shield className="text-primary" size={24} />
            <span className="font-bold text-xl">Smart<span className="text-teal-500">Notes</span></span>
          </div>
          <span className="badge badge-primary badge-sm self-start text-[10px] font-bold uppercase tracking-widest px-2 py-1">Admin Panel</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin">
          <div className="sidebar-section px-4 mb-6">
            <h4 className="sidebar-section-title text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2 px-2">Management</h4>
            <div className="flex flex-col gap-1">
              <NavLink end to="/admin" className={({ isActive }) => `sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm ${isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-base-300/50'}`} onClick={onClose}><LayoutDashboard size={18} /> Dashboard</NavLink>
              <NavLink to="/admin/users" className={({ isActive }) => `sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm ${isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-base-300/50'}`} onClick={onClose}><Users size={18} /> Users</NavLink>
              <NavLink to="/admin/notes" className={({ isActive }) => `sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm ${isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-base-300/50'}`} onClick={onClose}><FileText size={18} /> Notes</NavLink>
              <NavLink to="/admin/logs" className={({ isActive }) => `sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm ${isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-base-300/50'}`} onClick={onClose}><Activity size={18} /> Logs</NavLink>
              <NavLink to="/admin/feedback" className={({ isActive }) => `sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm ${isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-base-300/50'}`} onClick={onClose}><MessageSquare size={18} /> Feedback</NavLink>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-base-300 bg-base-200/50">
          <button onClick={logout} className="btn btn-ghost w-full flex items-center justify-start gap-3 text-danger hover:bg-danger/10 hover:text-danger px-3 py-2.5 text-sm font-medium transition-colors">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
