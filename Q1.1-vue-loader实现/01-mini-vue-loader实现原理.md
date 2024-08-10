
## 一 实现准备

Q1 mini-vue-loader的项目准备工作有哪些

S1 安装依赖和初始化项目

S2 配置webpack.config.js文件

S3 执行打包

这部分内容不具体赘述，具体可参考[Vue Loader实现-珠峰文档-起步部分](http://www.zhufengpeixun.com/strong/html/156.vue-loader.html)



## 二 具体实现


Q1 如何实现mini-vue-loader



S1 通过vue/scompiler-sfc里的parse方法，分别获取到.vue文件的 template/script/style 块内容

S2 分别把 template/script/style内容，转化为 带有查询参数标识的【import文件导入】，并作为loader的结果返回

S3.1 由于loader返回的结果又导入了resource为 `xxx.vue?vue&type=script`, 所以会再次命中到webpack里的module.rules，再次进入 vue-loader里的处理逻辑

S3.2 在 vue-loader的plugin里，代理增强 原有wepack.config.js里的module.rules，在处理.vue文件的规则的最左边，插入pitcherRule
  - pitcherRule的匹配规则，是通过 文件路径查询参数(resourceQuery) 匹配的
  - 由于第一次导入的 .vue不带有?vue，所以不会命中 pitcherRule，只会执行 vue-loader
  - 第一次执行完 vue-loader后，由于再次导入的.vue被拼接了?vue，所以会被命中 [pitcherLoader, vueLoader]，而且会先执行 pitcherLoader.pitch （原因需要知道loader的执行顺序机制）


 





















