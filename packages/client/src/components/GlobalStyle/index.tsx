import { Global, css } from '@emotion/react';

export default function GlobalStyle() {
  return <Global styles={globalStyleCSS} />;
}

const globalStyleCSS = css`
  body {
    padding: 0;
    margin: 0;
    border: none;
    background: #121212;
  }
`;
