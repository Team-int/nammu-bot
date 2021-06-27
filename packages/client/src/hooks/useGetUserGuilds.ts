import { useState } from 'react';
import useSelectedServerAtomState, { Server } from '../atom/SelectedServer';
import useUserAtomState from '../atom/User';
import client from '../lib/client/server';

const useGetUserGuilds = () => {
  const [user] = useUserAtomState();
  const [selectedServer, setSelectedServer] = useSelectedServerAtomState();

  const getUserGuilds = async () => {
    if (!user.logged_in) return;
    if (selectedServer.name) return;

    try {
      const response = await client.get('/api/v1/@me/guilds', {});

      if (response.status !== 200) return;

      const servers = response.data.guilds as Server[];

      const filteredServer = servers.filter((v) => v.joined);

      setSelectedServer({
        name: filteredServer[0].name,
        servers: filteredServer,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return { getUserGuilds };
};

export default useGetUserGuilds;
