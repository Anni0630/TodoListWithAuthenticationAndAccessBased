import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const AdminRoute = () => {
    const { user, token, isLoading } = useAuth();

    if (isLoading) return <div>Loading...</div>;
    if (!token) return <Navigate to="/login" replace />;
    if (user?.role !== 'ADMIN') return <Navigate to="/dashboard" replace />;

    return <Outlet />;
};
