import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// Guards
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Public Pages
import Landing from './pages/public/Landing';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import About from './pages/public/About';
import Features from './pages/public/Features';
import Pricing from './pages/public/Pricing';
import Contact from './pages/public/Contact';
import FAQ from './pages/public/FAQ';
import ForgotPassword from './pages/public/ForgotPassword';

// User Pages
import Dashboard from './pages/user/Dashboard';
import Notes from './pages/user/Notes';
import AddNote from './pages/user/AddNote';
import EditNote from './pages/user/EditNote';
import ViewNote from './pages/user/ViewNote';
import Archive from './pages/user/Archive';
import Trash from './pages/user/Trash';
import Favorites from './pages/user/Favorites';
import Labels from './pages/user/Labels';
import Reminders from './pages/user/Reminders';
import Calendar from './pages/user/Calendar';
import Search from './pages/user/Search';
import Profile from './pages/user/Profile';
import Settings from './pages/user/Settings';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageNotes from './pages/admin/ManageNotes';
import ActivityLogs from './pages/admin/ActivityLogs';
import AdminFeedback from './pages/admin/AdminFeedback';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                fontFamily: 'Inter, sans-serif',
                borderRadius: '12px',
                fontSize: '0.9rem',
              }
            }}
          />
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/"          element={<Landing />} />
              <Route path="/about"     element={<About />} />
              <Route path="/features"  element={<Features />} />
              <Route path="/pricing"   element={<Pricing />} />
              <Route path="/contact"   element={<Contact />} />
              <Route path="/faq"       element={<FAQ />} />
            </Route>

            {/* Auth Routes (no layout) */}
            <Route path="/login"           element={<Login />} />
            <Route path="/register"        element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected User Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<UserLayout />}>
                <Route path="/dashboard"    element={<Dashboard />} />
                <Route path="/notes"        element={<Notes />} />
                <Route path="/notes/new"    element={<AddNote />} />
                <Route path="/notes/:id"    element={<ViewNote />} />
                <Route path="/notes/:id/edit" element={<EditNote />} />
                <Route path="/archive"      element={<Archive />} />
                <Route path="/trash"        element={<Trash />} />
                <Route path="/favorites"    element={<Favorites />} />
                <Route path="/labels"       element={<Labels />} />
                <Route path="/reminders"    element={<Reminders />} />
                <Route path="/calendar"     element={<Calendar />} />
                <Route path="/search"       element={<Search />} />
                <Route path="/profile"      element={<Profile />} />
                <Route path="/settings"     element={<Settings />} />
              </Route>
            </Route>

            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin"              element={<AdminDashboard />} />
                <Route path="/admin/users"        element={<ManageUsers />} />
                <Route path="/admin/notes"        element={<ManageNotes />} />
                <Route path="/admin/logs"         element={<ActivityLogs />} />
                <Route path="/admin/feedback"     element={<AdminFeedback />} />
              </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
