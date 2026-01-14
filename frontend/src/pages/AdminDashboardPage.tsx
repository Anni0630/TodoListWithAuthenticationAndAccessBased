import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/api';
import { useToast } from '../context/ToastContext';
import { Shield, Trash2, Edit2, CheckCircle, XCircle, Save, X } from 'lucide-react';

export const AdminDashboardPage = () => {
    const queryClient = useQueryClient();
    const { showToast } = useToast();
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [editData, setEditData] = useState<any>({});

    const { data: users, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await api.get('/users');
            return res.data;
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string, data: any }) => api.patch(`/users/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            setEditingUserId(null);
            showToast('User updated successfully', 'success');
        },
        onError: (err: any) => {
            showToast(err.response?.data?.message || 'Update failed', 'error');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => api.delete(`/users/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            showToast('User deleted permanently', 'info');
        },
        onError: (err: any) => {
            showToast(err.response?.data?.message || 'Delete failed', 'error');
        }
    });

    const handleEditStart = (user: any) => {
        setEditingUserId(user.id);
        setEditData({ name: user.name, email: user.email, role: user.role, isActive: user.isActive });
    };

    const handleUpdate = (id: string) => {
        if (window.confirm('Are you sure you want to save these changes?')) {
            updateMutation.mutate({ id, data: editData });
        }
    };

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading users...</div>;

    return (
        <div className="max-w-6xl mx-auto space-y-10 animate-slide-up">
            <header className="flex items-center justify-between pb-2">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-purple-100 text-purple-600 rounded-2xl">
                            <Shield size={28} />
                        </div>
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-500 font-medium mt-2">Manage users and system permissions.</p>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-3xl font-black text-indigo-600">{users?.length}</span>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Total Users</span>
                </div>
            </header>

            <div className="glass-card rounded-[2.5rem] overflow-hidden border-none ring-1 ring-gray-100/50">
                <table className="min-w-full divide-y divide-gray-100">
                    <thead>
                        <tr className="bg-gray-50/50">
                            <th className="px-8 py-6 text-left text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Identification</th>
                            <th className="px-8 py-6 text-left text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Security Role</th>
                            <th className="px-8 py-6 text-left text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Operational Status</th>
                            <th className="px-8 py-6 text-right text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Management</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {users?.map((u: any) => {
                            const isEditing = editingUserId === u.id;
                            return (
                                <tr key={u.id} className={`transition-all duration-300 ${isEditing ? "bg-indigo-50/30" : "hover:bg-gray-50/30"}`}>
                                    <td className="px-8 py-6">
                                        {isEditing ? (
                                            <div className="space-y-3 max-w-xs">
                                                <input
                                                    className="input-field h-10 text-sm"
                                                    value={editData.name}
                                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                                    placeholder="Name"
                                                />
                                                <input
                                                    className="input-field h-10 text-sm"
                                                    value={editData.email}
                                                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                                    placeholder="Email"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-100">
                                                    {u.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-base font-bold text-gray-900 leading-tight">{u.name}</div>
                                                    <div className="text-sm text-gray-400 font-medium">{u.email}</div>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap">
                                        {isEditing ? (
                                            <select
                                                className="input-field h-10 text-sm py-1 bg-white"
                                                value={editData.role}
                                                onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                                            >
                                                <option value="USER">USER</option>
                                                <option value="ADMIN">ADMIN</option>
                                            </select>
                                        ) : (
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${u.role === 'ADMIN'
                                                ? 'bg-purple-100 text-purple-700'
                                                : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {u.role}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap">
                                        {isEditing ? (
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only"
                                                        checked={editData.isActive}
                                                        onChange={(e) => setEditData({ ...editData, isActive: e.target.checked })}
                                                    />
                                                    <div className={`w-10 h-5 rounded-full transition-colors ${editData.isActive ? 'bg-indigo-500' : 'bg-gray-200'}`}></div>
                                                    <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform ${editData.isActive ? 'translate-x-5' : ''}`}></div>
                                                </div>
                                                <span className="text-sm font-bold text-gray-500 uppercase tracking-tighter">Active</span>
                                            </label>
                                        ) : (
                                            u.isActive ? (
                                                <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-sm">
                                                    <CheckCircle size={16} /> Active Member
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 text-red-500 font-bold text-sm">
                                                    <XCircle size={16} /> Restricted
                                                </span>
                                            )
                                        )}
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap text-right text-sm">
                                        <div className="flex justify-end gap-2">
                                            {isEditing ? (
                                                <>
                                                    <button
                                                        onClick={() => handleUpdate(u.id)}
                                                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                                        title="Save"
                                                    >
                                                        <Save size={20} strokeWidth={2.5} />
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingUserId(null)}
                                                        className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl transition-all"
                                                        title="Cancel"
                                                    >
                                                        <X size={20} strokeWidth={2.5} />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => handleEditStart(u)}
                                                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                                        title="Edit"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            if (window.confirm('Are you sure you want to permanently delete this user?')) {
                                                                deleteMutation.mutate(u.id);
                                                            }
                                                        }}
                                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
