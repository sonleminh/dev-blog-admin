import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './Header';

const AdminLayout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Box sx={{ ml: '260px' }}>
        <Outlet />
      </Box>
    </>
  );
};

export default AdminLayout;
