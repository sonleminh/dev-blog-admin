import { useNavigate } from 'react-router-dom';
import { getRequest, postRequest } from '../axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../../contexts/AuthContext';
import { ISignInResponse, IUser } from '../../interfaces/IUser';
import { ISignInPayload } from '../../interfaces/ISignIn';
import Cookies from 'js-cookie';

const authUrl = '/auth';

const signInApi = async (payload: ISignInPayload) => {
  const result = await postRequest(`${authUrl}/signin`, payload);
  return result.data as ISignInResponse;
};

export const useSignInMutate = () => {
  const navigate = useNavigate();
  const auth = useAuthContext();
  return useMutation({
    mutationKey: ['user'],
    mutationFn: signInApi,
    onSuccess: (data) => {
      const { accessToken, ...user } = data.user;
      auth?.signIn(user);
      Cookies.set('ACCESS_TOKEN', accessToken);
      navigate('/dashboard');
      // const {accessToken, ...user} = data
    },
  });
};

const whoAmI = async () => {
  return await getRequest<IUser>(`${authUrl}/profile`)
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      if (Cookies.get('ACCESS_TOKEN')) {
        Cookies.remove('ACCESS_TOKEN');
      }
    });
};

export const useWhoAmI = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: whoAmI,
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
    // refetchInterval: false,
    retry: 0,
    gcTime: 0,
  });
};
