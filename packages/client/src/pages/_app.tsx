import React from 'react';
import GlobalStyle from '../components/GlobalStyle';
import { RecoilRoot } from 'recoil';
import Auth from '../components/Auth';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Auth>
        <GlobalStyle />
        <Component {...pageProps} />
      </Auth>
    </RecoilRoot>
  );
}

export default MyApp;
