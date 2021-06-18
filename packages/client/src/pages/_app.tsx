import React from 'react';
import GlobalStyle from '../components/GlobalStyle';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <React.Fragment>
        <GlobalStyle />
        <Component {...pageProps} />
      </React.Fragment>
    </RecoilRoot>
  );
}

export default MyApp;
