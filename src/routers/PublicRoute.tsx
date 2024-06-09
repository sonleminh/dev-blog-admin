import { Outlet, useNavigate } from 'react-router-dom';
import { useWhoAmI } from '../services/auth';
import { useAuthContext } from '../contexts/AuthContext';
import { useEffect } from 'react';

const PublicRoute = () => {
  const navigate = useNavigate();
  const auth = useAuthContext();
  const { data, isFetching } = useWhoAmI();
  console.log('data:', data);

  useEffect(() => {
    if (!isFetching) {
      if (data) {
        navigate('dashboard');
      }
    }
  }, [data, isFetching]);

  return !auth?.user ? <Outlet /> : <>Loading ...</>;
};

export default PublicRoute;
