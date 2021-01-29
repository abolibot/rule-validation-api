require('dotenv').config();
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: ['npm run run:dev'],
        blocking: false,
        parallel: true
      }
    })
  ],
  watch: true
});
