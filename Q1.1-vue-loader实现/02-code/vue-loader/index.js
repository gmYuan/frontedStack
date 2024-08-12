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
  // 用于后续的css的scoped==> .title[data-v-id]
  const id = hash(resourcePath);
  // 如果存在type参数，就会根据类型执行 selectBlock
  if (queryMap.get("type")) {
    return select.selectBlock(loaderCtx, queryMap, descriptor, id);
  }

  // 第1次执行vue-loader的命中逻辑
  // S1 通过compiler.parse分类别 获取.vue文件的 template/script/style内容
  let code = [];
  const { script, template } = descriptor;
  // S2.1 把 script内容转化为 带有查询参数标识的【文件导入】
  if (script) {
    const query = `?vue&type=script&id=${id}`;
    const requestPath = stringifyReqPath(loaderCtx, resourcePath + query);
    code.push(`import script from ${requestPath}`);
  }
  // S2.2 把 template内容转化为 带有查询参数标识的【文件导入】
  if (template) {
    const query = `?vue&type=template&id=${id}`;
    const requestPath = stringifyReqPath(loaderCtx, resourcePath + query);
    code.push(`import {render} from ${requestPath}`);
    code.push(`script.render = render`);
  }

  code.push(`export default script`);
  console.log("code----------", code.join("\n"));
  return code.join("\n");
}

loader.VueLoaderPlugin = VueLoaderPlugin;

module.exports = loader;
