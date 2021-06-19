import React, { useCallback } from 'react';
import { css } from '@emotion/react';
import client from '../../lib/client/server';
import useUserAtomState from '../../atom/User';
import { useRouter } from 'next/router';

export default function DashboardButton() {
  const [userState] = useUserAtomState();
  const router = useRouter();

  const onClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (userState.logged_in) {
        return router.push('/dashboard');
      }

      try {
        const url = `${process.env.SERVER_API_URL}/api/v1/auth`;

        window.location.replace(url);
      } catch (err) {
        console.log(err);
      }
    },
    [userState],
  );

  return (
    <button onClick={onClick} css={dashboardButtonStyleCSS}>
      대시보드
    </button>
  );
}

const dashboardButtonStyleCSS = css`
  padding: 14px 39px;
  background: white;
  border-radius: 25px;
  font-weight: bold;
  outline: none;
  border: none;
  margin-left: 25px;
  cursor: pointer;
`;
