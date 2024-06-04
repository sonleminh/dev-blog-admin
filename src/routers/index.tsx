import { Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import BaseLayout from '../layouts/BaseLayout';
import Category from '../pages/Category';
import Article from '../pages/Article';
import Login from '../pages/Login';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Dashboard from '../pages/Dashboard';

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
            element: <Navigate to={'/dashboard'} replace />,
          },
          {
            path: 'dashboard',
            element: <Dashboard />,
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
