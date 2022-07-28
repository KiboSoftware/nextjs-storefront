const path = require('path')
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  webpackFinal: async (config) => {
    // config.resolve.modules.push(path.resolve(__dirname, '../'));
    ;[].push.apply(config.resolve.plugins, [
      new TsconfigPathsPlugin({ extensions: config.resolve.extensions }),
    ])
    console.log(config.module.rules[12])
    config.resolve.alias['@emotion/styled'] = resolve('../node_modules/@emotion/styled')
    config.resolve.alias = {
      ...config.resolve.alias,
      'next-i18next': 'react-i18next',
    }
    return config
  },
  stories: ['../components/**/*.stories.mdx', '../components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-material-ui5',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    'storybook-addon-next-router',
  ],
  framework: '@storybook/react',
}
