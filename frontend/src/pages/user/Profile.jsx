import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Camera, Calendar, Shield, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || ''
  });

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if(updateProfile) {
        await updateProfile(formData);
        toast.success('Profile updated');
      } else {
        toast.success('Profile updated (mock)');
      }
      setIsEditing(false);
    } catch (error) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <div className="card p-6 flex flex-col items-center text-center">
            <div className="relative mb-4 group cursor-pointer">
              <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-4xl font-bold border-4 border-white shadow-lg overflow-hidden">
                {user?.avatar ? <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" /> : user?.name?.charAt(0) || 'U'}
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-white">
                <Camera size={24} />
              </div>
            </div>
            <h2 className="text-2xl font-bold">{user?.name || 'User Name'}</h2>
            <p className="text-gray-500 mb-4">{user?.email || 'user@example.com'}</p>
            <div className="w-full border-t border-gray-100 pt-4 mt-2">
              <p className="text-sm text-gray-500 flex items-center justify-center">
                <Calendar size={16} className="mr-2" /> Member since 2023
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="card p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center"><User className="mr-2 text-indigo-500" /> Personal Information</h3>
              {!isEditing && <button onClick={() => setIsEditing(true)} className="btn btn-ghost text-sm">Edit Profile</button>}
            </div>

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="input-label">Full Name</label>
                  <input type="text" className="input w-full" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="input-label">Email (Read Only)</label>
                  <input type="email" className="input w-full bg-gray-50 text-gray-500" value={user?.email || ''} readOnly disabled />
                </div>
                <div>
                  <label className="input-label">Bio</label>
                  <textarea className="input w-full h-24 resize-none" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})}></textarea>
                </div>
                <div className="flex space-x-2 pt-2">
                  <button type="submit" className="btn btn-primary flex items-center"><Save size={16} className="mr-2" /> Save Changes</button>
                  <button type="button" onClick={() => setIsEditing(false)} className="btn btn-ghost">Cancel</button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Full Name</p>
                  <p className="text-lg">{user?.name || 'User Name'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Email</p>
                  <p className="text-lg">{user?.email || 'user@example.com'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Bio</p>
                  <p className="text-gray-800">{user?.bio || 'No bio provided.'}</p>
                </div>
              </div>
            )}
          </div>

          <div className="card p-6 border border-gray-200 shadow-none">
            <h3 className="text-xl font-bold flex items-center mb-4 text-gray-800"><Shield className="mr-2 text-gray-500" /> Security</h3>
            <p className="text-sm text-gray-600 mb-4">Ensure your account is using a long, random password to stay secure.</p>
            <button className="btn btn-secondary text-sm">Change Password</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
