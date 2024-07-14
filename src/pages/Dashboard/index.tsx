import { useQueryClient } from '@tanstack/react-query';

const Dashboard = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ['article'] });
  return <div>Dashboard</div>;
};

export default Dashboard;
