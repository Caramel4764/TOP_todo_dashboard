const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./js/script.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ],
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./index.html"]
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|gif|jpeg|jpg|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.html$/i,
        use: "html-loader",
      }
    ]
  }
}