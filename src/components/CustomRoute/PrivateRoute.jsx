import { Navigate, Outlet } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import UserHeader from '../UserHeader/UserHeader';

const PrivateRoute = () => {
  const { currentUser } = useUser();

  return currentUser ? (
    <>
      <UserHeader />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
