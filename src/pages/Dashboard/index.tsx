import Footer from '@/components/Footer';
import {
  Box,
  Card,
  CardHeader,
  Container,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

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
            <Divider />
            <Box sx={{ p: 2 }}>
              <Box>Welcome to devblog dashboard!</Box>
            </Box>
          </Card>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
