
## 一 实现准备

Q1 mini-vue-loader的项目准备工作有哪些

S1 安装依赖和初始化项目

S2 配置webpack.config.js文件

S3 执行打包

这部分内容不具体赘述，具体可参考[Vue Loader实现-珠峰文档-起步部分](http://www.zhufengpeixun.com/strong/html/156.vue-loader.html)



## 二 具体实现


Q1 如何实现mini-vue-loader



S1 通过vue/scompiler-sfc里的parse方法，分别获取到.vue文件的 template/script/style 块内容

S2 分别把 template/script/style内容，转化为 带有查询参数标识的【文件导入】

S3



 





















