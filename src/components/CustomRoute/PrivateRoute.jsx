import { Navigate, Outlet } from 'react-router-dom';
import useUser from '../../hooks/useUser';

const PrivateRoute = () => {
  const { currentUser } = useUser();

  return currentUser ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
