import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ReactNode } from 'react';

type ProtectedAdminRouteProps = {
  children: ReactNode;
};

const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
