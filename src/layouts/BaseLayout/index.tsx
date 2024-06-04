import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const BaseLayout = () => {
  return (
    <Box>
      Baselayout
      <Outlet />
    </Box>
  );
};

export default BaseLayout;
