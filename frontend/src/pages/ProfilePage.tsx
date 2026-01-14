import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../api/api';
import { User, Trash2, Camera, Upload } from 'lucide-react';

export const ProfilePage = () => {
    const { user, login, logout } = useAuth();
    const { showToast } = useToast();
    const [name, setName] = useState(user?.name || '');
    const [email] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setIsUploading(true);
        try {
            const response = await api.post('/users/avatar', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            login(localStorage.getItem('token')!, { ...user, avatarUrl: response.data.avatarUrl });
            showToast('Avatar updated!', 'success');
        } catch (err: any) {
            showToast(err.response?.data?.message || 'Upload failed', 'error');
        } finally {
            setIsUploading(false);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!window.confirm('Are you sure you want to update your profile?')) return;
        try {
            const response = await api.patch('/users/profile', { name, email, ...(password && { password }) });
            login(localStorage.getItem('token')!, response.data);
            showToast('Profile updated successfully', 'success');
            setPassword('');
        } catch (err: any) {
            showToast(err.response?.data?.message || 'Update failed', 'error');
        }
    };

    const handleSoftDelete = async () => {
        if (!window.confirm('Are you sure you want to deactivate your account? You will be logged out and cannot log back in.')) return;
        try {
            await api.delete('/users/profile');
            showToast('Account deactivated', 'success');
            logout();
        } catch (err: any) {
            showToast(err.response?.data?.message || 'Deactivation failed', 'error');
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-10 animate-slide-up">
            <header>
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">Account Settings</h1>
                <p className="text-gray-500 font-medium mt-1">Manage your identity and preferences.</p>
            </header>

            <div className="glass-card rounded-[2.5rem] p-8 sm:p-12 space-y-12">
                <section>
                    <div className="flex flex-col sm:flex-row items-center gap-8 mb-12">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-black">
                                {user?.avatarUrl ? (
                                    <img
                                        src={`http://localhost:3000${user.avatarUrl}`}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    user?.name.charAt(0)
                                )}
                            </div>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploading}
                                className="absolute -bottom-2 -right-2 p-3 bg-white text-indigo-600 rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all border border-indigo-50 group-hover:rotate-6"
                            >
                                {isUploading ? (
                                    <div className="w-5 h-5 border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin" />
                                ) : (
                                    <Camera size={20} strokeWidth={2.5} />
                                )}
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleAvatarUpload}
                                className="hidden"
                                accept="image/*"
                            />
                        </div>
                        <div className="text-center sm:text-left">
                            <h2 className="text-2xl font-black text-gray-900">{user?.name}</h2>
                            <p className="text-gray-500 font-medium">{user?.role} Account</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                            <Upload size={24} strokeWidth={2.5} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Full Name</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                                <input
                                    type="email"
                                    className="input-field opacity-60"
                                    value={email}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="space-y-1 border-t border-gray-50 pt-6">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">New Password (Optional)</label>
                            <input
                                type="password"
                                className="input-field"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Leave blank to keep current"
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <button type="submit" className="btn-primary px-10 h-14 text-base shadow-xl shadow-indigo-100">
                                Save Profile
                            </button>
                        </div>
                    </form>
                </section>

                <section className="border-t border-gray-50 pt-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-red-50 text-red-500 rounded-2xl">
                            <Trash2 size={24} strokeWidth={2.5} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Danger Zone</h2>
                    </div>

                    <div className="bg-red-50/50 border border-red-100 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="space-y-1">
                            <p className="font-bold text-red-700">Deactivate Account</p>
                            <p className="text-sm text-red-600/70 font-medium">Permanently remove your data and access.</p>
                        </div>
                        <button
                            onClick={handleSoftDelete}
                            className="bg-white text-red-600 border border-red-200 px-6 h-12 rounded-xl font-bold hover:bg-red-50 transition-all duration-300 active:scale-95 whitespace-nowrap"
                        >
                            Deactivate
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};
