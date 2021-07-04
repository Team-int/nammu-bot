import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
import useLoadingAtomState from '../../atom/Loading';
import Loading from '../../components/Loading';

export default function loading() {
  const [isLoading] = useLoadingAtomState();
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (!redirect || typeof redirect !== 'string') router.push('/');
    if (!isLoading) router.push(redirect as string);
    setIsVerified(true);
  }, []);

  useEffect(() => {
    if (!isLoading && isVerified) router.push(redirect as string);
  }, [isLoading]);

  return <Loading />;
}
