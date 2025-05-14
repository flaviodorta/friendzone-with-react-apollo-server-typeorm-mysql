import { Navigate, Outlet } from 'react-router';

import { useAuth } from '../context/auth-provider';

const ProtectedRoute = () => {
  const { session, loading } = useAuth();

  if (loading) return <div>Verificando sessão...</div>;

  if (!session) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
