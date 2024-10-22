// webpack 是node写出来的 node的写法
let path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // 模式 默认两种 production development
  entry: "./src/index.js", // 打包入口
  output: {
    filename: "bundle.[hash:6].js", // 打包后的文件名
    path: path.resolve(__dirname, "build"), // 路径必须是一个绝对路径
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, "build"),
    },
    port: 3000, // 指定 静态文件服务器的端口
    open: true, // 是否自动打开浏览器
  },

  module: {
    rules: [
      // loader的执行顺序: 从右到左，从下到上
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          "css-loader",
        ],
      },
      {
        test: /\.less$/,
        // less-loader: 将Less编译为CSS
        // css-loader: 解析CSS中的@import和url()
        // style-loader: 将CSS注入到DOM中
        use: [
          {
            loader: "style-loader",
          },
          "css-loader",
          "less-loader",
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      hash: true,
    }),
  ],
};
