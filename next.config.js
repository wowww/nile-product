const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const path = require('path');
const withSvgr = require('next-plugin-svgr');
const withTM = require('next-transpile-modules')(['gsap']);
const { i18n } = require('./next-i18next.config');
const stailwc = require("stailwc/install");

/**
 * @type {import('next').NextConfig}
 */
const nextPlugins = [
  withPWA,
  {
    pwa: {
      dest: 'public',
      register: true,
      skipWaiting: true,
      disable: process.env.NODE_ENV === 'development',
      buildExcludes: [/middleware-manifest.json$/],
    },
  },
  [withSvgr, {}],
  [withTM, {}],
];

const nextConfig = {
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true,
    swcPlugins: [stailwc()],
  },
  compiler: {
    emotion: true,
    removeConsole: true,
  },
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nile.blob.core.windows.net',
      },
    ],
  },
  plugins: [
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        'autoprefixer': {
          'flexbox': 'no-2009',
        },
        'stage': 3,
        'features': {
          'custom-properties': false,
        },
      },
    ],
    [
      '@fullhuman/postcss-purgecss',
      {
        content: [
          './pages/**/*.{js,jsx,ts,tsx}',
          './components/**/*.{js,jsx,ts,tsx}',
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: ['html', 'body'],
      },
    ],
  ],
  env: {
    ENV_WEMIX_MICROSCOPE_API: 'https://microscopeapi.test.wemix.com',
  },
  webpack5: true,
  webpack: (config, { isServer }) => {
    if(!isServer) {
      config.resolve.fallback = { fs: false };
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  i18n,
};

module.exports = withPlugins(nextPlugins, { nextConfig, i18n });
