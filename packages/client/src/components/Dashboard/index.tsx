import React from 'react';
import { useEffect } from 'react';
import useDashboardAtomState from '../../atom/Dashboard';
import useSelectedServerAtomState from '../../atom/SelectedServer';
import useGetUserGuilds from '../../hooks/useGetUserGuilds';
import Loading from '../Loading';
import ServerSelect from './ServerSelect';

export default function Dashboard() {
  const [dashboard, setDashboard] = useDashboardAtomState();

  return (
    <>
      {(dashboard.loading && <Loading />) ||
        (!dashboard.server && <ServerSelect />)}
    </>
  );
}
