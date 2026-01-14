import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { CheckSquare } from 'lucide-react';
import api from '../api/api';

export const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await api.post('/auth/signup', { name, email, password });
            login(response.data.access_token, response.data.user);
            showToast('Account created successfully!', 'success');
            navigate('/dashboard');
        } catch (err: any) {
            showToast(err.response?.data?.message || 'Signup failed', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fcfdff] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-indigo-100 selection:text-indigo-700">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
                <div className="absolute -top-24 -left-20 w-96 h-96 bg-indigo-100/40 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute top-1/2 -right-20 w-80 h-80 bg-purple-100/40 rounded-full blur-[100px] animate-pulse delay-1000"></div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md animate-slide-up">
                <div className="flex justify-center mb-8">
                    <div className="p-3 bg-white shadow-2xl shadow-indigo-100 rounded-3xl group transition-all duration-500 hover:scale-110">
                        <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-inner">
                            <CheckSquare size={32} strokeWidth={2.5} />
                        </div>
                    </div>
                </div>
                <h2 className="text-center text-4xl font-black text-gray-900 tracking-tight">Create account</h2>
                <p className="mt-3 text-center text-gray-500 font-medium tracking-tight">Join TodoPro and get things done.</p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm animate-slide-up delay-100">
                <div className="bg-white/80 backdrop-blur-xl py-10 px-8 shadow-2xl shadow-gray-200/50 rounded-[2.5rem] border border-white/50 ring-1 ring-gray-100">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-1">
                            <label className="text-[13px] font-bold text-gray-400 uppercase tracking-widest px-1">Full Name</label>
                            <input
                                type="text"
                                required
                                className="input-field"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[13px] font-bold text-gray-400 uppercase tracking-widest px-1">Email address</label>
                            <input
                                type="email"
                                required
                                className="input-field"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[13px] font-bold text-gray-400 uppercase tracking-widest px-1">Password</label>
                            <input
                                type="password"
                                required
                                className="input-field"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary h-12 text-base shadow-xl shadow-indigo-100"
                        >
                            {isLoading ? 'Creating account...' : 'Create account'}
                        </button>
                    </form>
                    <div className="mt-10 text-center">
                        <span className="text-gray-400 text-sm font-medium">Already have an account?</span>
                        <Link to="/login" className="ml-2 text-indigo-600 hover:text-indigo-700 text-sm font-bold transition-colors">Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
