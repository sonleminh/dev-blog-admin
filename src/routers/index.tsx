import { Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import BaseLayout from '../layouts/BaseLayout';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { Suspense, lazy } from 'react';
import SuspenseLoader from '../components/SuspenseLoader';

const Loader =
  <P extends object>(Component: React.ComponentType<P>): React.FC<P> =>
  (props: P) =>
    (
      <Suspense fallback={<SuspenseLoader />}>
        <Component {...props} />
      </Suspense>
    );

const SignIn = Loader(lazy(() => import('../pages/SignIn')));
const Dashboard = Loader(lazy(() => import('../pages/Dashboard')));
const Article = Loader(lazy(() => import('../pages/Article')));
const Tag = Loader(lazy(() => import('../pages/Tag')));

const routes = [
  {
    element: <PublicRoute />,
    children: [
      {
        element: <BaseLayout />,
        children: [
          {
            path: '/',
            element: <>cc</>,
          },
          {
            path: 'signin',
            element: <SignIn />,
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
            path: 'article/*',
            element: <Article />,
          },
          {
            path: 'tag/*',
            element: <Tag />,
          },
        ],
      },
    ],
  },
];

export default routes;
