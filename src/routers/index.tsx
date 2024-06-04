import AdminLayout from '../layouts/AdminLayout';
import BaseLayout from '../layouts/BaseLayout';
import Category from '../pages/Article';
import Article from '../pages/Category';
import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const routes = [
  {
    element: <PublicRoute />,
    children: [
      {
        element: <BaseLayout />,
        children: [
          {
            path: 'login',
            element: <Login />,
            children: [],
          },
        ],
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: '/',
            element: <Homepage />,
          },
          {
            path: 'article',
            element: <Article />,
          },
          {
            path: 'category',
            element: <Category />,
          },
        ],
      },
    ],
  },
];

export default routes;
