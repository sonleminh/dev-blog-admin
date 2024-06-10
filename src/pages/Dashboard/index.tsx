import React from 'react';
import { useWhoAmI } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAuthContext } from '../../contexts/AuthContext';

const Dashboard = () => {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const { data } = useWhoAmI();
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
    </div>
  );
};

export default Dashboard;
