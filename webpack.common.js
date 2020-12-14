const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    filename: "lilac.bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: ["babel-loader"],
      },
      {
        test: /\.(sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          }
        ],
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/i,
        use: ["url-loader"],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "public", to: "." }
      ],
    }),
    new Dotenv()
  ],
};