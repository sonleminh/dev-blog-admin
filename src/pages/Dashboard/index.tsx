import React from 'react';
import { useWhoAmI } from '../../services/auth';

const Dashboard = () => {
  const { data } = useWhoAmI();
  return <div>Dashboard</div>;
};

export default Dashboard;
