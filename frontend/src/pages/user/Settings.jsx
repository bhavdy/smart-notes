import React, { useState } from 'react';
import { Moon, Sun, Bell, Download, Trash2, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState({ email: true, reminders: true, marketing: false });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    toast.success(`Theme set to ${newTheme} (Mock)`);
  };

  const handleNotifChange = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success('Preferences updated');
  };

  const handleExport = () => {
    toast.success('Data export started. You will receive an email shortly.');
  };

  const handleDeleteAccount = () => {
    if(window.confirm('WARNING: This will permanently delete your account and ALL your notes. This action CANNOT be undone. Are you absolutely sure?')) {
      toast.success('Account deletion requested');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="space-y-8">
        
        <section className="card p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center"><Moon className="mr-2 text-indigo-500" /> Appearance</h2>
          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <div>
              <p className="font-medium">Theme</p>
              <p className="text-sm text-gray-500">Choose between light and dark mode</p>
            </div>
            <button onClick={toggleTheme} className="btn btn-secondary flex items-center">
              {theme === 'light' ? <><Moon size={18} className="mr-2" /> Dark Mode</> : <><Sun size={18} className="mr-2" /> Light Mode</>}
            </button>
          </div>
        </section>

        <section className="card p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center"><Bell className="mr-2 text-blue-500" /> Notifications</h2>
          <div className="space-y-4 border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive daily summaries and alerts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={notifications.email} onChange={() => handleNotifChange('email')} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Reminder Alerts</p>
                <p className="text-sm text-gray-500">Get notified when a reminder is due</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={notifications.reminders} onChange={() => handleNotifChange('reminders')} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </section>

        <section className="card p-6 border border-red-100">
          <h2 className="text-xl font-bold mb-4 flex items-center text-red-600"><Shield className="mr-2" /> Danger Zone</h2>
          <div className="space-y-4 border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Export Data</p>
                <p className="text-sm text-gray-500">Download all your notes as JSON/Markdown</p>
              </div>
              <button onClick={handleExport} className="btn btn-secondary flex items-center"><Download size={16} className="mr-2" /> Export</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-red-600">Delete Account</p>
                <p className="text-sm text-gray-500">Permanently delete your account and data</p>
              </div>
              <button onClick={handleDeleteAccount} className="btn btn-danger flex items-center"><Trash2 size={16} className="mr-2" /> Delete Account</button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Settings;
