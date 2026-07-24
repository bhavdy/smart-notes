import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Star, Tag, Archive, Trash2, Bell, Calendar, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ open, onClose }) {
  const { logout } = useAuth();

  return (
    <>
      {open && <div className="modal-overlay md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>}
      <aside className={`sidebar fixed md:sticky top-0 left-0 h-screen w-64 bg-gradient-to-b from-base-200 to-base-300 border-r border-base-300 z-50 transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} flex flex-col`}>
        <div className="sidebar-logo p-6 border-b border-base-300 flex items-center">
          <span className="font-bold text-xl">Smart<span className="text-teal-500">Notes</span></span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin">
          <div className="sidebar-section px-4 mb-6">
            <h4 className="sidebar-section-title text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2 px-2">Main</h4>
            <div className="flex flex-col gap-1">
              <NavLink to="/dashboard" className={({ isActive }) => `sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm ${isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-base-300/50'}`} onClick={onClose}><LayoutDashboard size={18} /> Dashboard</NavLink>
              <NavLink to="/notes" className={({ isActive }) => `sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm ${isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-base-300/50'}`} onClick={onClose}><FileText size={18} /> Notes</NavLink>
              <NavLink to="/favorites" className={({ isActive }) => `sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm ${isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-base-300/50'}`} onClick={onClose}><Star size={18} /> Favorites</NavLink>
            </div>
          </div>
          
          <div className="sidebar-section px-4 mb-6">
            <h4 className="sidebar-section-title text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2 px-2">Organize</h4>
            <div className="flex flex-col gap-1">
              <NavLink to="/labels" className={({ isActive }) => `sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm ${isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-base-300/50'}`} onClick={onClose}><Tag size={18} /> Labels</NavLink>
              <NavLink to="/archive" className={({ isActive }) => `sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm ${isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-base-300/50'}`} onClick={onClose}><Archive size={18} /> Archive</NavLink>
              <NavLink to="/trash" className={({ isActive }) => `sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm ${isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-base-300/50'}`} onClick={onClose}><Trash2 size={18} /> Trash</NavLink>
              <NavLink to="/reminders" className={({ isActive }) => `sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm ${isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-base-300/50'}`} onClick={onClose}><Bell size={18} /> Reminders</NavLink>
              <NavLink to="/calendar" className={({ isActive }) => `sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm ${isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-base-300/50'}`} onClick={onClose}><Calendar size={18} /> Calendar</NavLink>
            </div>
          </div>

          <div className="sidebar-section px-4 mb-4">
            <h4 className="sidebar-section-title text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2 px-2">Account</h4>
            <div className="flex flex-col gap-1">
              <NavLink to="/profile" className={({ isActive }) => `sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm ${isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-base-300/50'}`} onClick={onClose}><User size={18} /> Profile</NavLink>
              <NavLink to="/settings" className={({ isActive }) => `sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm ${isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-base-300/50'}`} onClick={onClose}><Settings size={18} /> Settings</NavLink>
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
