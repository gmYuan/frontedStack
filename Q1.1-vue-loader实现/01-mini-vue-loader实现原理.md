
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
  - 实际上，plugin的逻辑在插件初始化就会被执行，所以pitcherRule在解析.vue文件之前，就已经被加入到了 .vue的解析规则里了

  - 但是 pitcherRule的匹配规则，是通过 文件路径查询参数(resourceQuery) 匹配的，第一次解析时 导入的.vue文件 不带有?vue，所以不会命中 pitcherRule，只会执行 vue-loader

  - 在第一次执行完 vue-loader后，由于再次导入的.vue文件 被拼接了?vue，所以会被命中 [pitcherLoader, vueLoader]，而且会先执行 pitcherLoader.pitch （利用了loader的执行顺序机制）


S4 在pitcherLoader.pitch里
  - 会获取到 解析.vue文件的 所有Loaders，排除掉pitcherLoader本身从而防止死循环执行
  - 会把所有 解析LoadersPath + resource，拼接为【行内loader资源加载路径】，并通过export导出，作为loader的结果返回
  - 行内loader会中止执行 后续的pre和 normal类型loader，从而避免冗余死循环执行配置文件的loaders
  - 执行【行内loader资源加载路径】时，会第2次执行 `vue-loader`
 





















