const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { DefinePlugin } = require("webpack");

module.exports = (env, argv) => {
  return {
    mode: "development",
    entry: "./app/index.js",
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "index.js",
    },
    devServer: {
      port: argv.port ?? 10080,
      open: true,
      contentBase: path.resolve(__dirname, "./app"),
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new DefinePlugin({
        wssPort: JSON.stringify(process.env.WSS),
      }),
    ],
  };
};
