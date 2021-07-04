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

  useEffect(() => {
    const areYouSure = (e: any) => {
      if (!dashboard.saved)
        e.returnValue = '변경사항이 저장되지 않을 수 있습니다';
    };

    window.addEventListener('beforeunload', areYouSure);

    return () => {
      window.removeEventListener('beforeunload', areYouSure);
    };
  });

  return (
    <>
      <Head>
        <title>대시보드 :: {dashboard.server?.display_name || ''}</title>
      </Head>
      <DashboardMain />
    </>
  );
}
