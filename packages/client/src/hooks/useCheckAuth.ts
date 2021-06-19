import React, { useEffect, useState } from 'react';
import useUserAtomState from '../atom/User';
import client from '../lib/client/server';
import UserStorage from '../lib/userStorage';

const useCheckAuth = () => {
  const [result, setResult] = useState(false);
  const [user, setUserState] = useUserAtomState();

  const auth = async () => {
    const user_id = UserStorage.get();

    if (!user_id) return setResult(false);

    try {
      const response = await client.get('/api/v1/@me', {});

      console.log(1);
      if (response.status !== 200) {
        return setResult(false);
      }

      if (response.data.data.id !== user_id) {
        return setResult(false);
      }

      const { data } = response;

      setUserState({ logged_in: true, data: data.data });

      return setResult(true);
    } catch (err) {
      return setResult(false);
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return { auth, result };
};

export default useCheckAuth;
