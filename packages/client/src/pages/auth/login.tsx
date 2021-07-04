import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useUserAtomState from '../../atom/User';
import client from '../../lib/client/server';
import Loading from '../../components/Loading';
import UserStorage from '../../lib/userStorage';

export default function Login() {
  const [, setUserState] = useUserAtomState();
  const history = useRouter();

  const auth = async () => {
    try {
      const response = await client.get('/api/v1/@me', {});

      const { data } = response;

      setUserState({ logged_in: true, data });

      UserStorage.set(data.data.id);

      return true;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    auth().then(() => {
      history.push('/loading?redirect=/dashboard');
    });
  }, []);

  return <Loading />;
}
