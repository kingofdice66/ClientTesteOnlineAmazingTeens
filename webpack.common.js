const path = require("path");
const StylelintPlugin = require("stylelint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  watch: true,
  watchOptions: {
    ignored: [
      path.posix.resolve(__dirname, "./node_modules"),
      path.posix.resolve(__dirname, "./vendor"),
    ],
  },
  entry: {
    index: "./src/main/public/Index.tsx",
    ContactForm: "./src/contactForm/public/ContactForm.tsx",
  },
  output: {
    path: path.resolve(__dirname, "./website/dist"),
    filename: "[name].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(ts)x?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg/,
        type: "asset/inline",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new StylelintPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CleanWebpackPlugin(),
    new ESLintPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/main/public/index.html",
      filename: "index.html",
      inject: "body",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/contactForm/public/ContactForm.html",
      filename: "ContactForm.html",
      inject: "body",
      chunks: ["ContactForm"],
    }),
  ],
};
