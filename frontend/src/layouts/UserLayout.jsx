import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';

export default function UserLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="page-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="page-content">
        <TopNav onMenuClick={() => setSidebarOpen(o => !o)} />
        <div className="page-inner animate-fade-in">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
