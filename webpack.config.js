const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const VIEWS_PATH = path.join(__dirname, "public", "views");
const PUBLIC_PATH = path.join(__dirname, "public");
const PUBLIC_PATH_INDEX = path.join(PUBLIC_PATH, "index.js");
const DIST_OUTPUT = path.join(__dirname, "dist", "public");

//Config des pages de pages
const HWPConfig = new HtmlWebPackPlugin({
  template: VIEWS_PATH + "/loginExample.html",
  filename: "./loginExample.html",
  chunks: "app",
  excludeChunks: ["server"]
});

//Mettre le nom des autres pages ici
const articlesHtmlPlugin = ["cacheExample"];

//On concatène tout
var multiplesFiles = articlesHtmlPlugin.map(entryName => {
  return new HtmlWebPackPlugin({
    template: VIEWS_PATH + `/${entryName}.html`,
    filename: entryName + ".html"
  });
});

module.exports = {
  target: "web",
  mode: "development",
  devtool: "source-map",
  entry: {
    app: PUBLIC_PATH_INDEX
  },
  output: {
    path: DIST_OUTPUT,
    publicPath: "/..",
    filename: `[name].js`
  },
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [{ loader: "html-loader" }]
      }
    ]
  },

  resolve: {
    extensions: [".js"],
    modules: ["public", "node_modules"]
  },
  plugins: [HWPConfig].concat(multiplesFiles)
};
