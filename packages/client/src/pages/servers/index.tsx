import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import useUserAtomState from '../../atom/User';
import ServerSelect from '../../components/Dashboard/ServerSelect';

export default function Servers() {
  const [user] = useUserAtomState();
  const history = useRouter();

  useEffect(() => {
    if (!user.logged_in) history.push('/');
  }, []);

  return <ServerSelect />;
}
