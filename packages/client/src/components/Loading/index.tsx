import React, { useState, useEffect } from 'react';
import { css, keyframes } from '@emotion/react';
import Icon from '../../static/icons';
import generateMessage from '../../lib/loadingMessages';
import { useMemo } from 'react';

export default function Loading() {
  const message = useMemo(() => generateMessage(), []);

  useEffect(() => {
    console.log('Loading component rendered');
  }, []);

  return (
    <div css={loadingStyleCSS}>
      <div>
        <div id="icon">
          <Icon name="Wheel" />
        </div>
        <h1>LOADING</h1>
        <p>{message}</p>
      </div>
    </div>
  );
}

const loadingWheelAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const loadingStyleCSS = css`
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
      animation: ${loadingWheelAnimation} infinite linear 1s;
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
