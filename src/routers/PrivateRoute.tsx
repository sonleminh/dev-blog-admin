import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useWhoAmI } from '../services/auth';
import { useEffect } from 'react';

const PrivateRoute = () => {
  const navigate = useNavigate();
  const auth = useAuthContext();
  const { data, isFetching, isError } = useWhoAmI();
  // console.log('data:', data);
  useEffect(() => {
    if (!isFetching) {
      if (data && !isError) {
        console.log('prv_data:', data);
        auth?.signIn(data);
      } else {
        navigate('/signin');
      }
    }
  }, [data, isFetching]);
  return auth?.user ? <Outlet></Outlet> : <>Loading ...</>;
};

export default PrivateRoute;
