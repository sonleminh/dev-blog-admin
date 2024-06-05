import { useNavigate } from 'react-router-dom';
import { postRequest } from '../axios';
import { useMutation } from '@tanstack/react-query';

const authUrl = '/auth';

const signInApi = async (payload: unknown) => {
  const result = await postRequest(`${authUrl}/signin`, payload);
  return result.data;
};

export const useSignInMutate = () => {
  //   const navigate = useNavigate();

  return useMutation({
    mutationKey: ['tai-khoan'],
    mutationFn: signInApi,
    onSuccess: (data) => {
      // const {accessToken, ...user} = data
      console.log('data:', data);
    },
  });
};
