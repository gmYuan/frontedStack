const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

const bootstrap = path.resolve(__dirname, "node_modules/bootstrap/dist/css/bootstrap.css");

// 定义自定义loader路径
const loadersPath = path.resolve(__dirname, "loaders");

// 日志美化
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

// 错误通知
const notifier = require("node-notifier");
const icon = path.join(__dirname, "icon.jpg");

// 速度分析
const SpeedMeasureWebpack5Plugin = require("speed-measure-webpack5-plugin");
const smw = new SpeedMeasureWebpack5Plugin();

// 文件体积监控
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = smw.wrap({
  mode: "none",
  devtool: "source-map",
  // context: 设置项目的根目录，所有相对路径都会基于这个目录来解析
  // process.cwd(): 返回脚本运行的 工作目录的绝对路径
  //  注意，它返回的是 命令执行时的目录，而不是文件所在的目录
  context: process.cwd(),

  resolve: {
    // 指定文件的扩展名, 找不到会报错
    extensions: [".js", ".jsx", ".json"],
    // 指定查找别名
    alias: {
      bootstrap,
    },
    // 指定查找目录
    modules: ["node_modules"],
    mainFields: ["browser", "module", "main"],
    mainFiles: ["index"],
  },

  // 配置 外部依赖 的声明
  externals: {
    jquery: "Jquery",
    lodash: "Lodash",
  },

  // 配置 自定义loader 的查找规则
  resolveLoader: {
    modules: [loadersPath, "node_modules"],
  },


  entry: {
    main: "./src/index.js",
  },

  output: {
    // 返回 当前文件所在的目录 的绝对路径
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },

  //oneOf只可能匹配数组中的某一个，找到一个之后就不再继续查找剩下的loader
  module: {
    // 配置 无依赖的类库 的递归解析
    // noParse: /title.js/,

    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            include: path.resolve(__dirname, "src"),
            use: [
              {
                loader: "babel-loader",
                options: {
                  presets: [
                    "@babel/preset-env",
                  ],
                },
              },
            ],
          },
          {
            test: /\.css$/,
            use: [ "logger-loader", "style-loader", "css-loader"],
          },
          {
            test: /\.less$/,
            use: ["style-loader", "css-loader", "less-loader"],
          },
        ],
      },
    ],
  },

  plugins: [
    new htmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),

    new FriendlyErrorsWebpackPlugin({
      // everity：错误的严重程度;  errors：错误信息
      onErrors: (severity, errors) => {
        const error = errors[0];
        notifier.notify({
          title: "Webpack编译失败",
          message: severity + ": " + error.name,
          // subtitle: 出错的文件名（如果有的话）
          subtitle: error.file || "",
          icon,
        });
      },
    }),

    new BundleAnalyzerPlugin({
      analyzerMode: "disabled",
      generateStatsFile: true,
    }),
  ],
});
