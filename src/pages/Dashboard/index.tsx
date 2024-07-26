import Footer from '@/components/Footer';
import {
  Card,
  CardHeader,
  Container,
  Divider,
  Typography,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

const Dashboard = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ['article'] });
  return (
    <>
      <Container maxWidth='lg'>
        <Card sx={{ mt: 3, borderRadius: 2 }}>
          <Card>
            <CardHeader
              title={
                <Typography sx={{ fontSize: 20, fontWeight: 500 }}>
                  Dashboard
                </Typography>
              }
            />
          </Card>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
