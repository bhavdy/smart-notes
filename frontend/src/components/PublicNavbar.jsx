import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function PublicNavbar() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="pub-nav sticky-top">
      <div className="pub-nav-inner container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="nav-logo flex items-center">
          <span className="font-bold text-xl">Smart<span className="text-teal-500">Notes</span></span>
        </Link>
        <div className="nav-links hidden md:flex items-center gap-6">
          <NavLink to="/" className="nav-link font-medium hover:text-primary transition-colors">Home</NavLink>
          <NavLink to="/features" className="nav-link font-medium hover:text-primary transition-colors">Features</NavLink>
          <NavLink to="/pricing" className="nav-link font-medium hover:text-primary transition-colors">Pricing</NavLink>
          <NavLink to="/about" className="nav-link font-medium hover:text-primary transition-colors">About</NavLink>
          <NavLink to="/faq" className="nav-link font-medium hover:text-primary transition-colors">FAQ</NavLink>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="btn-icon hover:bg-base-300 p-2 rounded-full transition-colors" aria-label="Toggle theme">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/login" className="btn btn-ghost hidden md:inline-flex">Login</Link>
          <Link to="/register" className="btn btn-primary hidden md:inline-flex">Get Started</Link>
          <button className="btn-icon md:hidden p-2 rounded-full hover:bg-base-300 transition-colors">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
