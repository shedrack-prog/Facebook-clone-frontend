import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function LoggedInRoutes() {
  const { user } = useSelector((user) => ({ ...user }));

  return user ? <Navigate to="/" /> : <Outlet />;
}
