import React from 'react';
import useDashboardAtomState from '../../atom/Dashboard';
import Loading from '../Loading';
import ServerSelect from './ServerSelect';
import DashboardMain from './DashboardMain';
import useUserAtomState from '../../atom/User';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default React.memo(function Dashboard() {
  const [dashboard] = useDashboardAtomState();
  const [user] = useUserAtomState();
  const logged_in = useMemo(() => user.logged_in, []);
  const history = useRouter();

  const loading = useMemo(() => dashboard.loading, [dashboard.loading]);

  useEffect(() => {
    if (logged_in) return;
    history.push('/');
    return;
  }, []);

  useEffect(() => {
    if (!dashboard.server) history.push('/servers');
    if (dashboard.server) history.push(`/servers/${dashboard.server.id}`);
    if (loading) history.push('/loading');
  }, [dashboard, loading]);

  return <></>;
});
