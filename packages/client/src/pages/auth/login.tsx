import React from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import useUserAtomState, { userAtom } from '../../atom/User';
import client from '../../lib/client/server';
import UserStorage from '../../lib/userStorage';

export default function Login() {
  const [, setUserState] = useRecoilState(userAtom);

  const auth = async () => {
    try {
      const response = await client.get('/api/v1/@me', {});

      const { data } = response;

      setUserState({ logged_in: true, data });

      return true;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    auth().then(() => {
      window.location.replace('/dashboard');
    });
  }, []);

  return <></>;
}
