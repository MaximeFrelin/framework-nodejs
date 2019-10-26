const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

const SERVER_PATH = path.join(__dirname, "server");
const SERVER_PATH_INDEX = path.join(SERVER_PATH, "index.js");
const DIST_OUTPUT = path.join(__dirname, "dist", "server");

module.exports = {
  entry: {
    server: SERVER_PATH_INDEX
  },
  output: {
    path: DIST_OUTPUT,
    publicPath: "/..",
    filename: "[name].js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    port: 9000,
    host: `localhost`,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  target: "node",
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false // and __filename return blank or /
  },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [".js"],
    modules: ["src", "node_modules"]
  }
};
