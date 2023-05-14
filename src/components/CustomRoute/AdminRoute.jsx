import { Navigate, Outlet } from 'react-router-dom';
import useUser from '../../hooks/useUser';

const AdminRoute = () => {
  const { currentUser } = useUser();

  return currentUser?.isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
