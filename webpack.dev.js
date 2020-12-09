const path = require("path");
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "build"),
    port: 9000,
    historyApiFallback: true,
  },
});