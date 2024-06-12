import { Box } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../../contexts/AuthContext';

const Dashboard = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ['article'] });
  const auth = useAuthContext();
  // const { data } = useWhoAmI();
  return <div>Dashboard</div>;
};

export default Dashboard;
