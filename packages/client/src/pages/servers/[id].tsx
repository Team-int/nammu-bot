import React from 'react';
import DashboardMain from '../../components/Dashboard/DashboardMain';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useDashboardAtomState from '../../atom/Dashboard';
import { useEffect } from 'react';

export default function ServerDashboard() {
  const router = useRouter();
  const [dashboard] = useDashboardAtomState();
  const { id: server_id } = router.query;

  useEffect(() => {
    if (!server_id) router.push('/');
    if (!dashboard.server) router.push('/dashboard');
    if (dashboard.server?.id !== server_id) router.push('/');
  }, []);

  return (
    <>
      <Head>
        <title>대시보드 :: {dashboard.server?.display_name || ''}</title>
      </Head>
      <DashboardMain />
    </>
  );
}
