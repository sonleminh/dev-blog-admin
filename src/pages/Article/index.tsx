import { useRoutes } from 'react-router-dom';
import ArticleLayout from './components/ArticleLayout';
import ArticleList from './components/ArticleList';
import ArticleUpsert from './components/ArticleUpsert';

const Article = () => {
  const router = useRoutes([
    {
      path: '',
      element: <ArticleLayout />,
      children: [
        {
          path: '',
          element: <ArticleList />,
          index: true,
        },
        {
          path: '/update/:id',
          element: <ArticleUpsert />,
        },
        {
          path: '/create',
          element: <ArticleUpsert />,
        },
      ],
    },
  ]);
  return router;
};

export default Article;
