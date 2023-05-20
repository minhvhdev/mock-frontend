import { Outlet } from 'react-router-dom';
import UserHeader from '../UserHeader/UserHeader';

const PublicRoute = () => {
  return (
    <>
      <UserHeader />
      <Outlet />
    </>
  );
};

export default PublicRoute;
