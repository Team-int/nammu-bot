import React from 'react';
import { css } from '@emotion/react';

export default function About() {
  return (
    <div css={aboutStyleCSS}>
      <div></div>
    </div>
  );
}

const aboutStyleCSS = css`
  width: 100vw;
  height: 100vh;
  z-index: auto;
`;
