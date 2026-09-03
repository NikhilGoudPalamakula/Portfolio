import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from './authStore';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children ?? <Outlet />;
};

export default ProtectedRoute;
