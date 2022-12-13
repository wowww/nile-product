const path = require('path');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/preset-scss',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
    '@storybook/addon-knobs',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'));
    const fileLoaderRule2 = config.module.rules.find((rule) => rule.test && rule.test.test('.scss'));
    fileLoaderRule.exclude = /\.svg$/;
    fileLoaderRule2.exclude = /\.scss$/;

    config.module.rules.push({
      test: /\.svg$/,
      enforce: 'pre',
      loader: require.resolve('@svgr/webpack'),
    });

    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader?url=false', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          '@public': path.resolve(__dirname, '..', 'public'),
          '@': path.resolve(__dirname, '..', 'src'),
          '@components': path.resolve(__dirname, '..', 'src', 'components'),
          '@contracts': path.resolve(__dirname, '..', 'src', 'contract'),
          '@styles': path.resolve(__dirname, '..', 'src', 'styles'),
          '@themes': path.resolve(__dirname, '..', 'src', 'themes'),
          '@utils': path.resolve(__dirname, '..', 'src', 'utils'),
          '@images': path.resolve(__dirname, '../src/assets/images'),
        },
      },
      plugins: [...config.plugins],
    };
  },
};
