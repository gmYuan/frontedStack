const compiler = require('vue/compiler-sfc')
const VueLoaderPlugin = require('./plugin')

// 作用：通过parse分类别 获取到.vue文件的 template/script/style内容
//      根据对应类型内容，转化为 带有查询参数标识的 文件导入
// todo


function loader(source) {
  let loaderCtx = this
  const {resourcePath, resourceQuery, context} = loaderCtx
  console.log('111-----', resourcePath)
  console.log('222-----', resourceQuery)
  console.log('333-----', context)

  let code = []
  // S1 通过compiler.parse分类别 获取到.vue文件的 template/script/style内容
  const { descriptor } = compiler.parse(source)
  const { script } = descriptor
  // S2.1 把 script内容转化为 带有查询参数标识的【文件导入】
  if (script) {

  }
}

loader.VueLoaderPlugin = VueLoaderPlugin

module.exports = loader