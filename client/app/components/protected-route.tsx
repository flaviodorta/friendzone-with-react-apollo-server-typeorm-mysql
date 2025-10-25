import { Navigate, Outlet } from 'react-router';

import { useAuth } from '../context/auth-provider';

const ProtectedRoute = () => {
  const { session, loading } = useAuth();

  console.log('session', session);

  if (loading) return <div>Verificando sessão...</div>;

  if (!session || session.revoked) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
