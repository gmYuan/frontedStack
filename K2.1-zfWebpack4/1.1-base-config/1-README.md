## 1 webpack安装

1.安装 本地webpack
  - yarn init -y
  - yarn add webpack webpack-cli -D


## 2 webpack功能： 打包工具 
  - 可以是 0配置，开箱即用
  - 打包工具 --> 输出后的结果是 JS模块
  - 打包 (支持JS的 模块化写法)

1. webpack的作用
  - 以入口JS文件为起点，找到它所有依赖的模块，进行打包，生成一个JS模块
  - 打包后的JS文件，可以支持模块化语句，而且可以在浏览器环境中运行


## 3 手动配置webpack

1. 默认配置文件: webpack.config.js