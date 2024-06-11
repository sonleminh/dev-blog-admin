import { Outlet, useNavigate } from 'react-router-dom';
import { useWhoAmI } from '../services/auth';
import { useAuthContext } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const PublicRoute = () => {
  // const queryClient = useQueryClient();
  // queryClient.invalidateQueries({ queryKey: ['user'] });
  const navigate = useNavigate();
  const auth = useAuthContext();
  const { data, isFetching } = useWhoAmI();
  // console.log('data:', data);

  useEffect(() => {
    if (!isFetching) {
      if (data) {
        console.log('public_data:', data);
        // navigate('dashboard');
      }
    }
  }, [data, isFetching]);

  // useEffect(() => {
  //   console.log(2);
  //   queryClient.invalidateQueries({ queryKey: ['user'] });
  // }, [queryClient]);
  return <Outlet />;
  // return !auth?.user ? <Outlet /> : <>Loading ...</>;
};

export default PublicRoute;
