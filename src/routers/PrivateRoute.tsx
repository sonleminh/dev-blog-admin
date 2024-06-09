import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useWhoAmI } from '../services/auth';
import { useEffect } from 'react';

const PrivateRoute = () => {
  const navigate = useNavigate();
  const auth = useAuthContext();
  const { data, isFetching } = useWhoAmI();

  useEffect(() => {
    if (!isFetching) {
      if (data) {
        auth?.signIn(data);
      } else {
        navigate('/login');
      }
    }
  }, []);
  return auth?.user ? <Outlet></Outlet> : <>Loading ...</>;
};

export default PrivateRoute;
