const path = require("path");
const StylelintPlugin = require("stylelint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  /*******************************************************************/
  /*****     Not needed because webpack-dev-server is in use     *****/
  /*******************************************************************/
  // watch: true,                                                    *
  // watchOptions: {                                                 *
  //   ignored: [                                                    *
  //     path.posix.resolve(__dirname, "./node_modules"),            *
  //     path.posix.resolve(__dirname, "./vendor"),                  *
  //   ],                                                            *
  // },                                                              *
  /*******************************************************************/

  entry: {
    index: "./src/main/public/Index.tsx",
    MakeCourse: "./src/makeCourse/public/MakeCourse.tsx",
    ContactForm: "./src/contactForm/public/ContactForm.tsx",
    Courses: "./src/courses/public/Courses.tsx",
    CourseChapters: "./src/courseChapters/public/CourseChapters.tsx",
    OwnerAdminPanel: "./src/ownerAdminPanel/public/OwnerAdminPanel.tsx",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
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
      template: "./src/makeCourse/public/MakeCourse.html",
      filename: "MakeCourse.html",
      inject: "body",
      chunks: ["MakeCourse"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/contactForm/public/ContactForm.html",
      filename: "ContactForm.html",
      inject: "body",
      chunks: ["ContactForm"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/courses/public/Courses.html",
      filename: "Courses.html",
      inject: "body",
      chunks: ["Courses"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/courseChapters/public/CourseChapters.html",
      filename: "CourseChapters.html",
      inject: "body",
      chunks: ["CourseChapters"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/ownerAdminPanel/public/OwnerAdminPanel.html",
      filename: "OwnerAdminPanel.html",
      inject: "body",
      chunks: ["OwnerAdminPanel"],
    }),
  ],
};
