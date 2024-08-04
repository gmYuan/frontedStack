
实现流程/步骤：


具体实现代码，参见[P1.2-mini-vue-loader](todo)



1 webpack.config.js里配置 .vue文件的module.rules + new vueLoaderPlugin()

2 npm scripts?==> webpack.config.js==> new vueLoaderPlugin()==>

3 vlp.apply(compiler)==> 
  - a: 从 webpack配置文件的所有rules里，克隆+增强 不是vueRule的所有其他rules，即 clonedRules = { resource, resourceQuery, use }

  - b: 创建pitcher的rule规则对象: { loader, resourceQuery }
  - c: 重写覆盖原本的compiler.options.module.rules，返回一个新rules:
      module.rules = [pitcher, ...clonedRules, ...rules]


4.1 npm scripts?==> webpack.config.js==> 入口main.js ==> import xxx.vue==> 命中vue-loader规则, 调用vue-loader ==>
  - a: 转化的结果为: import xxx from 'xxx.vue?vue&type=xxx&lang=xxx' + export default component.exports
  - b: 经过parser.parse处理后，会进入模块的依赖收集, 继续解析 4.1.a导入的依赖


4.2 'xxx.vue?vue&type=xxx&lang=xxx'==> 因为存在查询参数?vue, 命中 vue-loader.pitcher + 符合cloneRules的loaders==> 按调用顺序，会优先调用vue-loader.pitcher.loader(即 pitch函数) ==>
  - a.1: 通过query.type，调用genRequest() ==> 生成内联loaders的字符串
  - a.2: 转化的返回结果为: import xxx from "-!loader1!loader2!xxx.vue?vue&type=xxx&lang=xxx
   - a.3: 由于loader.pitch存在返回值，所以不会再往后调用cloneRules的loaders


4.3 '-!loader1!loader2!xxx.vue?vue&type=xxx&lang=xxx' 内联loader按loader2-loader1-....的顺序，依次处理 xxx.vue文件，所以会 再次调用vue-loader ==>
  - a: 由于存在路径查询参数type, 所以会调用selectBlock==> 分别返回 template/style/script各标签内容




 





















