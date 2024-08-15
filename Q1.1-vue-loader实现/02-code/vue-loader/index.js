const compiler = require("vue/compiler-sfc");
const hash = require("hash-sum");
const VueLoaderPlugin = require("./plugin");
const { stringifyReqPath } = require("./utils");
const select = require("./select");

function loader(source) {
  let loaderCtx = this;
  const { resourcePath, resourceQuery, context } = loaderCtx;
  const { descriptor } = compiler.parse(source);
  // console.log("111-----", resourcePath);
  // console.log("222-----", resourceQuery);
  // console.log("333-----", context);
  // 111----- /Users/xxx/Q1.1-vue-loader实现/02-code/src/App.vue
  // 222-----
  // 333----- /Users/xxx/Q1.1-vue-loader实现/02-code/src

  // 第2次执行vue-loader的命中逻辑
  const queryMap = new URLSearchParams(resourceQuery.slice(1));
  // 如果存在type参数，就会根据类型执行 selectBlock
  if (queryMap.get("type")) {
    return select.selectBlock(loaderCtx, queryMap, descriptor, id);
  }

  // 第1次执行vue-loader的命中逻辑
  // S1 通过compiler.parse分类别 获取.vue文件的 template/script/style内容
  let code = [];
  const { script, template,styles } = descriptor;

  // 用于css的scoped==> .title[data-v-id]
  const id = hash(resourcePath);
  const hasScoped = styles.some((style) => style.scoped);

  // S2.1 把 script内容转化为 带有查询参数标识的【文件导入】
  if (script) {
    const query = `?vue&type=script&id=${id}&lang=js`;
    const requestPath = stringifyReqPath(loaderCtx, resourcePath + query);
    code.push(`import script from ${requestPath}`);
  }
  // S2.2 把 template内容转化为 带有查询参数标识的【文件导入】
  if (template) {
    // scoped的实现需要在 template上挂载 data-v-id属性，所以这里需要加上标识
    const scopedQuery = hasScoped ? '&scoped=true' : ''
    const query = `?vue&type=template&id=${id}${scopedQuery}&lang=js`;
    const requestPath = stringifyReqPath(loaderCtx, resourcePath + query);
    code.push(`import {render} from ${requestPath}`);
    code.push(`script.render = render`);
  }

  // S2.3 把 style内容【逐个】转化为 带有查询参数标识的【文件导入】
  if (styles.length > 0) {
    styles.forEach((style, idx) => {
      // scoped的实现需要在 css上挂载 .xxx[data-v-id]属性选择器，所以这里需要加上标识
      const scopedQuery = style.scoped ? '&scoped=true' : ''
      const query = `?vue&type=style&index=${idx}&id=${id}${scopedQuery}&lang=css`;
      const requestPath = stringifyReqPath(loaderCtx, resourcePath + query)
      code.push(`import ${requestPath}`);
    })
  }

  // 把scopedId挂载到导出的script上
  if (hasScoped) {
    code.push(`script.__scopeId = "data-v-${id}"`)
  }

  // 拼接出 第一轮的返回内容
  code.push(`export default script`);
  console.log("code----------", code.join("\n"));
  return code.join("\n");
}

loader.VueLoaderPlugin = VueLoaderPlugin;

module.exports = loader;
