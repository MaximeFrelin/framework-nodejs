const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const fs = require("fs");

const VIEWS_PATH = path.join(__dirname, "public", "views");
const PUBLIC_PATH = path.join(__dirname, "public");
const PUBLIC_PATH_INDEX = path.join(PUBLIC_PATH, "index.js");
const DIST_OUTPUT = path.join(__dirname, "dist", "public");

var entries = {};

entries = createEntries("./public/scripts", entries);

module.exports = {
  target: "web",
  mode: "development",
  devtool: "source-map",
  entry: entries,
  output: {
    path: DIST_OUTPUT,
    publicPath: "/",
    filename: `[name].js`,
    libraryTarget: "var",
    library: "[name]"
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
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },

  resolve: {
    extensions: [".js"],
    modules: ["public", "node_modules"]
  },
  plugins: []
};

function createEntries(dir, entries) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = dir + "/" + file;
    if (fs.lstatSync(fullPath).isDirectory()) {
      createEntries(fullPath, entries);
    } else {
      entries[file.split(".")[0]] = fullPath;
    }
  });

  return entries;
}
