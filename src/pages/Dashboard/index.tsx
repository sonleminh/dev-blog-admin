import React from 'react';
import { useWhoAmI } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAuthContext } from '../../contexts/AuthContext';
import { useGetArticleList } from '../../services/article';
import { useQueryClient } from '@tanstack/react-query';

const Dashboard = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ['article'] });
  const auth = useAuthContext();
  const navigate = useNavigate();
  // const { data } = useWhoAmI();
  const { data } = useGetArticleList();
  console.log('data:', data);
  return (
    <div>
      Dashboard{' '}
      <Box
        onClick={() => {
          auth?.signOut();
          // navigate('/signin');
        }}>
        Public
      </Box>
      <ul>
        {data?.articleList?.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
