## 前端工程化- vue-loader相关


Ques列表


1 vue-loader怎么识别&解析vue文件的，它在webpack中的 大致工作流程-- S

2 为什么vue-loader要配合VueLoaderPlugin插件一起使用-- B

3 它怎么处理template标签内的类html语法，转化成render函数-- A

4 它怎么处理css或其他扩展语言的？顺便了解一下scoped属性是怎么作用在当前组件的-- A

5 为什么script标签和css标签内的内容，还能被别的loader处理，那些babel-loader等不是只匹配处理js文件或css文件吗-- A

6.1 webpack的执行流程

6.2 plugin.apply(compiler) + compiler.hooks.compilation.tap + compilation.hooks.normalModuleLoader.tap

6.3 compiler.options.module.rules + new RuleSet(rawRules)

6.4 rawRules.findIndex(createMatcher(`foo.vue`))

6.5 const vueLoaderUseIndex = vueUse.findIndex(u => {
      return /^vue-loader|(\/|\\|@)vue-loader/.test(u.loader)
    })

6.6 const pitcher = {
      loader: require.resolve('./loaders/pitcher'),
      resourceQuery: query => {
        const parsed = qs.parse(query.slice(1))
        return parsed.vue != null
      },
      options: {
        cacheDirectory: vueLoaderUse.options.cacheDirectory,
        cacheIdentifier: vueLoaderUse.options.cacheIdentifier
      }
    

6.7 clonedRules中每个rule的resourceQuery 都有特别的处理

6.8 rule(规则)是 为了匹配某种路径

6.9 clonedRules的格式是 { resource: { test: fn }, resourceQuery: fn, use: [ {loader, options, ident} ] }

--------------------------------------------




--------------------------------------------

实现流程/步骤：

1 webpack.config.js里配置 .vue文件的module.rules + new vueLoaderPlugin()

2 npm scripts?==> webpack.config.js==> new vueLoaderPlugin()==>

3.1 vlp.apply(compiler)==> 
  - a: 遍历 每个normalLoader，设置标识 loaderContext[NS] = true
    - (1) 让 vue-loader知道配合使用的插件 已经被初始化了


  - b.1: 从 webpack配置文件里的 所有rules，获取到vueRule
    - (1) rule(规则)是 为了匹配某种路径，然后执行规则内的loader

  - b.2: 从 vueRule里的 所有uses，获取到vueLoaderUse
  - b.3: 新增属性值 vueLoaderUse.ident = 'vue-loader-options'

  - c: 从 所有rules里，克隆不是vueRule的所有其他rules，即 clonedRules
    - (1) clonedRules的格式是 { resource: { test: fn }, resourceQuery: fn, use: [ {loader, options, ident} ] }，新增了resource和resourceQuery
    - (2) resource会 保存当前 正在匹配的资源路径
    - (3) resourceQuery会解析查询字符串，检查是否是 vue参数开头/存在lang参数，以及资源路径是否匹配
    - (4) 深度递归克隆 rule里嵌套的子规则: rule.rules/rule.oneOf
    - (5) clonedRules的作用，就是为了能够让 【vue中的标签内容，可以被配置的js/css等相关loader 处理】


  - d.1: 创建一个全局的pitcher loader: 设置了loader + resourceQuery + options
  - d.2: 定义一个默认导出
  - d.3: 设置 module.exports.pitch监听方法，会在pitch阶段执行
    - (1) 定义genRequest: 遍历所有的loaders，去重后拼接为内联loaders
    - (2) 根据请求类型query.type，分别处理template/script/style
      - (2.1-1) 处理style: 在css-loader处理后插入style-post-loader，并通过genRequest返回 所有内联loaders导入
      - (2.1-2)style-post-loader: 根据路径参数scoped是否为true，如果是，就会重新修改style样式，给每个选择器加上属性选择器 cssClass[data-v-id]

      - (2.2) 处理template: 通过 template-loader==> vue-template-compiler，生成render函数

      - (2.3) 处理script: 依次内联为 vue-loader/babel-loader/cache-loader

    - (3) 调用genRequest并reurn 导入导出语句
 
  - e: 覆盖原本的 compiler.options.module.rules，返回一个新rules数组:
    - (1) 返回的是 [pitcher, ...clonedRules, ...rules]



3.2 vue-loader==>
  - a: 检查vue-loader-plugin是否 已经正确初始化
  - b: 根据loaderContext上下文获取 当前匹配到资源的相关信息
  - c: 通过@vue/component-compiler-utils里的parse({srouce, compiler, fulename})，获取到descriptor对象= {template:{}, script:{}, styles: []}
  
  - d: 如果资源请求路径的 查询字符串里存在type参数，直接经过selectBlock处理返回
    - d.1: ？？？？


  - f: scoped和热更新逻辑
  - g: 分别处理 descriptor.template/script/styles
  - h: 通过 normalizer函数调用，生成一个component组件对象
  - i: 返回 code变量字符串，最后一句字符串内容是 'export default component.exports'













## 1 todo

<!-- todo 其核心 实现思路是:  -->


Q1: todo

A: </br>




------------------------------------------------------------------------
Q2: todo

A: <br/>

1 todo


# 2 todo

