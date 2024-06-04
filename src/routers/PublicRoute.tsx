import { Outlet } from 'react-router-dom';

const PublicRoute = () => {
  console.log(2);
  return <Outlet />;
};

export default PublicRoute;
