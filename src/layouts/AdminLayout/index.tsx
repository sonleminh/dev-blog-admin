import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const AdminLayout = () => {
  return (
    <div>
      <Sidebar />
      <Box sx={{ ml: '290px', bgcolor: (theme) => theme.palette.primary.main }}>
        <Outlet />
      </Box>
    </div>
  );
};

export default AdminLayout;
