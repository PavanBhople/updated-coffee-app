import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function AdminRoute({ redirectTo = '/login' }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return user?.role === 'admin' ? <Outlet /> : <Navigate to="/" />;
}
