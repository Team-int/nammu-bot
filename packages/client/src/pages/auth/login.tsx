import React from 'react';
import { useEffect } from 'react';
import useUserAtomState from '../../atom/User';
import client from '../../lib/client/server';
import { css, keyframes } from '@emotion/react';
import Icon from '../../static/icons/index';

export default function Login() {
  const [, setUserState] = useUserAtomState();

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

  return (
    <div css={loginStyleCSS}>
      <div>
        <div id="icon">
          <Icon name="Wheel" />
        </div>
        <h1>LOADING</h1>
        <p>나무라는 이름은 그냥 밥먹다가 생각했어요</p>
      </div>
    </div>
  );
}

const loginWheelAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }

`;

const loginStyleCSS = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  & > div {
    display: flex;
    flex-direction: column;
    color: white;
    align-items: center;
    & > div[id='icon'] {
      animation: ${loginWheelAnimation} infinite linear 1s;
    }
    & > h1 {
      margin: 0;
      padding: 0;
      font-size: 2.25rem;
      font-family: 'Roboto';
      font-style: italic;
      font-weight: 900;
    }
    & > p {
      padding: 0;
      margin: 1rem 0 0 0;
    }
  }
`;
