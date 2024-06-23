import { useRoutes } from 'react-router-dom';
import TagUpsert from './components/TagUpsert';
import TagLayout from './components/TagLayout';
import TagList from './components/TagList';

const Tag = () => {
  const router = useRoutes([
    {
      path: '',
      element: <TagLayout />,
      children: [
        {
          path: '',
          element: <TagList />,
          index: true,
        },
        {
          path: '/update/:id',
          element: <TagUpsert />,
        },
        {
          path: '/create',
          element: <TagUpsert />,
        },
      ],
    },
  ]);
  return router;
};

export default Tag;
