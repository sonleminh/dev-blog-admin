import Footer from '@/components/Footer';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const TagLayout = () => {
  return (
    <>
      <Container maxWidth='lg'>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default TagLayout;
