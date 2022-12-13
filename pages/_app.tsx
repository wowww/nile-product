import React, { StrictMode, useCallback, useEffect } from 'react';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Footer, Header } from '@components';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { HelmetProvider } from 'react-helmet-async'; /* 22.10.04 수정: 라이브러리 교체 */
import 'tailwindcss/tailwind.css';
import '@styles/global.css';
import '@scss/common.scss';
import Script from 'next/script';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { useRouter } from 'next/router';
import { useAtomValue } from 'jotai';
import { nileWalletMetaAtom, nileWalletPersistenceAtom } from '@/state/nileWalletAtom';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

// @ts-ignore: Unreachable code error
BigInt.prototype.toJSON = function() {
  return this.toString();
};

if (process.env.NODE_ENV === 'production') {
  console.log = () => {
  };
  console.table = () => {
  };
}

const Application = ({ Component, pageProps }: AppProps) => {
  const { asPath, replace } = useRouter();
  const nileWallet = useAtomValue(nileWalletPersistenceAtom);
  const resetWindowScrollPosition = useCallback(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    window.onbeforeunload = () => {
      resetWindowScrollPosition();
    };
  }, [resetWindowScrollPosition]);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (asPath.includes('/mypage')) {
        if (!nileWallet) {
          replace('/');
        }
      }
    }
  }, [asPath, nileWallet]);

  return (

    <StrictMode>
      <HelmetProvider>
        <Head>
          <title>NILE</title>
          <meta name="description" content="DAO & LIFE platform based on the WEMIX3.0 mainnet" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta property="og:url" content="https://www.nile.io" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={`NILE`} />
          <meta property="og:description" content="DAO & LIFE platform" />
          <meta property="og:image" content="https://nft-meta-dev.azureedge.net/og-tags/NILE_OGTag.png" />
          <meta property="og:article:author" content="WEMADE" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        </Head>
        <Header />
        {/*<div className="flex items-center justify-center px-5" style={{*/}
        {/*  height: '100vh',*/}
        {/*}}>*/}
        {/*  <div className="flex flex-col items-center justify-center my-8 lwux-6 md:mx-12">*/}
        {/*    <Image src={WillBeBack} height={240} width={300} className="w-full md:max-w-36" />*/}
        {/*    <p className="items-center align-center text-center text-2xl md:text-4xl"*/}
        {/*       style={{ textAlign: 'center', marginTop: '30px', fontFamily: 'Times', fontStyle: 'bold' }}>We'll be back in no*/}
        {/*      time!</p>*/}
        {/*    <p className="items-center text-center text-sm md:text-lg" style={{ fontFamily: 'Roboto' }}>Nile is currently undergoing maintenance*/}
        {/*      at this time.</p>*/}
        {/*    <p className="items-center text-center text-sm md:text-lg mt-6" style={{ marginTop: '32px' }}>- The NILE team -</p>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <Component {...pageProps} />
        <Footer />
      </HelmetProvider>
    </StrictMode>
  );
};

export default appWithTranslation(Application);
