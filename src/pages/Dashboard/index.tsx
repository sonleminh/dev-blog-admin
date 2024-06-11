import { Box } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useGetArticleList } from '../../services/article';

const Dashboard = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ['article'] });
  const auth = useAuthContext();
  const navigate = useNavigate();
  // const { data } = useWhoAmI();
  const { data } = useGetArticleList();
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
