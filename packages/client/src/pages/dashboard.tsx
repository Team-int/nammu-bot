import React from 'react';
import useUserAtomState from '../atom/User';
import DashboardComponent from '../components/Dashboard';

export default function Dashboard() {
  const [user] = useUserAtomState();

  return <DashboardComponent />;
}
