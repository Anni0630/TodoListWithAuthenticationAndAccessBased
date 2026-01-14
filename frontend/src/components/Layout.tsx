import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, CheckSquare, Shield } from 'lucide-react';

export const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col selection:bg-indigo-100 selection:text-indigo-700">
            {/* Background Blob decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-50/50 rounded-full blur-3xl opacity-60 animate-pulse"></div>
                <div className="absolute -bottom-[10%] -left-[10%] w-[35%] h-[35%] bg-purple-50/50 rounded-full blur-3xl opacity-60 animate-pulse delay-700"></div>
            </div>

            <nav className="sticky top-0 z-40 bg-white/70 backdrop-blur-lg border-b border-gray-100/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-10">
                            <Link to="/dashboard" className="flex items-center gap-2 group">
                                <div className="p-1.5 bg-indigo-600 rounded-lg text-white group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-indigo-200">
                                    <CheckSquare size={22} />
                                </div>
                                <span className="font-bold text-gray-900 text-xl tracking-tight">Todo<span className="text-indigo-600">Pro</span></span>
                            </Link>
                            <div className="hidden sm:flex items-center gap-2">
                                <Link
                                    to="/dashboard"
                                    className="text-gray-500 hover:text-indigo-600 font-medium px-3.5 py-2 rounded-xl transition-all duration-300 hover:bg-indigo-50/50 active:scale-95"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/profile"
                                    className="text-gray-500 hover:text-indigo-600 font-medium px-3.5 py-2 rounded-xl transition-all duration-300 hover:bg-indigo-50/50 active:scale-95"
                                >
                                    Profile
                                </Link>
                                {user?.role === 'ADMIN' && (
                                    <Link
                                        to="/admin"
                                        className="text-gray-500 hover:text-indigo-600 font-medium px-3.5 py-2 rounded-xl transition-all duration-300 hover:bg-indigo-50/50 active:scale-95 flex items-center gap-2 border border-transparent hover:border-indigo-100"
                                    >
                                        <Shield size={16} /> Admin
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <div className="flex items-center gap-3 pr-2">
                                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-black shadow-lg shadow-indigo-100 overflow-hidden border-2 border-white">
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
                                <div className="hidden sm:flex flex-col items-end">
                                    <span className="text-sm font-semibold text-gray-900 leading-tight">{user?.name}</span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{user?.role}</span>
                                </div>
                            </div>
                            <div className="h-8 w-[1px] bg-gray-100 hidden sm:block"></div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-gray-400 hover:text-red-500 p-2 rounded-xl hover:bg-red-50 transition-all duration-300 active:scale-90"
                                title="Log out"
                            >
                                <LogOut size={20} />
                                <span className="hidden sm:inline font-medium">Sign Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <Outlet />
            </main>
        </div>
    );
};
