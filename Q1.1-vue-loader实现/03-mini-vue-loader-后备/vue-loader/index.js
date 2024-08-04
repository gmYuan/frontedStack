const compiler = require('vue/compiler-sfc');
const hash = require('hash-sum')
const { stringifyRequest } = require('./utils');
const VueLoaderPlugin = require('./plugin');
const select = require('./select');
function loader(source) {//normal
  //loaderContext就是loader函数执行的时候的this指针，上面有很多方法和属性
  //https://webpack.docschina.org/api/loaders/#the-loader-context
  const loaderContext = this;
  //resourcePath=资源文件的绝对路径。C:\aproject\vueloader20220828\src\App.vue
  //resourceQuery=资源的 query 参数 ?vue&type=script
  const { resourcePath, resourceQuery } = loaderContext;
  //现在写的是为了第三轮的的执行
  const rawQuery = resourceQuery.slice(1);
  const incomingQuery = new URLSearchParams(rawQuery);
  const { descriptor } = compiler.parse(source);
  const id = hash(resourcePath);//后面在实现scoped css的会有用 .title[data-v-id=]
  const hasScoped = descriptor.styles.some(s => s.scoped);
  if (incomingQuery.get('type')) {
    return select.selectBlock(descriptor, id, loaderContext, incomingQuery);
  }
  const code = [];
  const { script } = descriptor;
  //contextify('c:/a/b', 'c:/a/b/c');=> ./c require import用来加载模块
  if (script) {
    const query = `?vue&type=script&id=${id}&lang=js`;
    const request = stringifyRequest(loaderContext, resourcePath + query);
    code.push(`import script from ${request}`);
  }
  if (descriptor.template) {
    const scopedQuery = hasScoped ? `&scoped=true` : ``;
    const query = `?vue&type=template&id=${id}${scopedQuery}&lang=js`;
    const request = stringifyRequest(loaderContext, resourcePath + query);
    code.push(`import {render} from ${request}`);
  }
  if (descriptor.styles.length > 0) {
    descriptor.styles.forEach((style, index) => {
      const scopedQuery = style.scoped ? `&scoped=true` : ``;
      const query = `?vue&type=style&index=${index}&id=${id}${scopedQuery}&lang=css`;
      const request = stringifyRequest(loaderContext, resourcePath + query);
      code.push(`import  ${request}`);
    });
  }
  if (hasScoped) {
    code.push(`script.__scopeId = "data-v-${id}"`);
  }
  code.push(`script.render = render`);
  code.push(`export default script`);
  console.log(code.join('\n'));
  return code.join('\n');
}
loader.VueLoaderPlugin = VueLoaderPlugin;
module.exports = loader;
//import "./App.vue?vue&type=script&index=0&id=df259056"
//import "./App.vue?vue&type=template&index=0&id=df259056"
//import "./App.vue?vue&type=style&index=0&id=df259056"
//import  "./App.vue?vue&type=style&index=1&id=df259056"