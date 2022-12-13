import React, { Suspense } from 'react';
import { MemoryRouter } from 'react-router';
import { RecoilRoot } from 'recoil';
import { Web3ReactProvider } from '@web3-react/core';
import { addDecorator } from '@storybook/react';
import { ExternalProvider, Web3Provider } from '@ethersproject/providers';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import NextImage from 'next/image';
import '../src/assets/styles/common.scss';
import Image from "next/image";
import {NileCDNLoader} from "../src/utils/image/loader";
// import '@styles/global.css';

const customViewports = {
  Desktop: {
    name: 'Desktop',
    styles: {
      width: '1280px',
      height: '100%',
    },
  },
  Tablet: {
    name: 'Tablet',
    styles: {
      width: '768px',
      height: '100%',
    },
  },
  Mobile: {
    name: 'Mobile',
    styles: {
      width: '375px',
      height: '100%',
    },
  },
};

const OriginalNextImage = NextImage.default;

// nextjs <Image/> 컴포넌트 스토리북에서 읽기
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

const getLibrary = (provider) => {
  return new Web3Provider(provider, 'any');
};

// eslint-disable-next-line global-require
global.Buffer = global.Buffer || require('buffer').Buffer;

addDecorator((story) => {
  return (
    <RecoilRoot>
      <Web3ReactProvider getLibrary={getLibrary}>
        <MemoryRouter initialEntries={['/']}>
          <Suspense fallback="loading">{story()}</Suspense>
        </MemoryRouter>
      </Web3ReactProvider>
    </RecoilRoot>
  );
});

// https://github.com/vercel/next.js/issues/15543#issuecomment-664955766
addDecorator((storyFn) => (
  <RouterContext.Provider
    value={{
      pathname: '/',
      basePath: '',
      push: (url, as) => {
        if (as) linkTo('Routes', as !== '/' ? startCase(as) : 'Index')();
        return Promise.resolve(true);
      },
      replace: (url, as) => {
        if (as) linkTo('Routes', as !== '/' ? startCase(as) : 'Index')();
        return Promise.resolve(true);
      },
      reload: () => {
        return Promise.resolve(true);
      },
      prefetch: () => {
        return Promise.resolve(true);
      },
    }}
  >
    {storyFn()}
  </RouterContext.Provider>
));

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <Image {...props}  loader={NileCDNLoader}/>,
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: { viewports: customViewports, defaultViewport: 'Desktop' },
};
