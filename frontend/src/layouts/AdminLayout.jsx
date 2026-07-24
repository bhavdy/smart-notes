import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import TopNav from '../components/TopNav';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="page-layout">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="page-content">
        <TopNav onMenuClick={() => setSidebarOpen(o => !o)} isAdmin />
        <div className="page-inner animate-fade-in">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
