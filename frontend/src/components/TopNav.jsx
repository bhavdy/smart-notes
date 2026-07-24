import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, Bell, Sun, Moon, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function TopNav({ onMenuClick, isAdmin }) {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard' || path === '/admin') return 'Dashboard';
    if (path.startsWith('/notes') || path === '/admin/notes') return 'Notes';
    if (path.startsWith('/favorites')) return 'Favorites';
    if (path.startsWith('/labels')) return 'Labels';
    if (path.startsWith('/archive')) return 'Archive';
    if (path.startsWith('/trash')) return 'Trash';
    if (path.startsWith('/reminders')) return 'Reminders';
    if (path.startsWith('/calendar')) return 'Calendar';
    if (path.startsWith('/profile')) return 'Profile';
    if (path.startsWith('/settings')) return 'Settings';
    if (path.startsWith('/admin/users')) return 'Users';
    if (path.startsWith('/admin/logs')) return 'Logs';
    if (path.startsWith('/admin/feedback')) return 'Feedback';
    return 'SmartNotes';
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <header className="topnav sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-base-300 bg-base-100/90 backdrop-blur-md px-4 sm:px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="btn-icon md:hidden p-2 hover:bg-base-200 rounded-full transition-colors" aria-label="Open menu">
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-semibold hidden sm:block">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button className="btn-icon p-2 hover:bg-base-200 rounded-full transition-colors" aria-label="Search">
          <Search size={20} />
        </button>
        <button onClick={toggleTheme} className="btn-icon p-2 hover:bg-base-200 rounded-full transition-colors" aria-label="Toggle theme">
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="btn-icon relative p-2 hover:bg-base-200 rounded-full transition-colors" aria-label="Notifications">
          <Bell size={20} />
          <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-primary border border-base-100"></span>
        </button>

        <div className="relative ml-1 sm:ml-2" ref={dropdownRef}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100 rounded-full transition-all"
          >
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary to-teal-400 text-primary-content flex items-center justify-center font-bold text-sm shadow-sm border-2 border-base-100">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name || 'User'} className="h-full w-full rounded-full object-cover" />
              ) : (
                getInitials(user?.name)
              )}
            </div>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl border border-base-300 bg-base-100 shadow-xl py-2 z-50 transform origin-top-right transition-all">
              <div className="px-4 py-3 border-b border-base-300/50 mb-1">
                <p className="text-sm font-semibold truncate">{user?.name || 'User Name'}</p>
                <p className="text-xs text-base-content/70 truncate mt-0.5">{user?.email || 'user@example.com'}</p>
                <div className="mt-2">
                  <span className={`badge text-[10px] uppercase font-bold tracking-wider ${isAdmin ? 'badge-primary' : 'bg-base-300 text-base-content'}`}>
                    {isAdmin ? 'Admin' : 'User'}
                  </span>
                </div>
              </div>
              
              <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-base-200 transition-colors mx-1 rounded-md" onClick={() => setDropdownOpen(false)}>
                <User size={16} className="text-base-content/70" /> Profile
              </Link>
              <Link to="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-base-200 transition-colors mx-1 rounded-md" onClick={() => setDropdownOpen(false)}>
                <Settings size={16} className="text-base-content/70" /> Settings
              </Link>
              
              <div className="border-t border-base-300/50 my-1 mx-2"></div>
              
              <button 
                onClick={() => {
                  logout();
                  setDropdownOpen(false);
                }} 
                className="flex w-[calc(100%-8px)] items-center gap-3 px-4 py-2.5 text-sm text-danger hover:bg-danger/10 hover:text-danger transition-colors mx-1 rounded-md font-medium"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
