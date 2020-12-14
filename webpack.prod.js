const { merge } = require('webpack-merge');
const TerserPlugin = require("terser-webpack-plugin");
const common = require('./webpack.common.js');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: false })],
  },
  plugins: [
    new ESLintPlugin(),
  ],
});