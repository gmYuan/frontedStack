const { stringifyReqPath } = require("./utils");

// pitcherLoader本身就只是透传到下一个loader的（实际上后续也不会执行到它）
// 重要的不是它，而是它上面挂载的pitch钩子
function pitcherLoader(code) {
  return code;
}

const isNotPitcherLoader = (loader) => loader.path !== __filename;

pitcherLoader.pitch = function () {
  // S1 获取到 所有.vue相关的loaders + 排除pitcherLoader本身
  const loaderCtx = this;
  const loaders = loaderCtx.loaders.filter(isNotPitcherLoader);

  // query为 <map>{vue: '', type: 'script'}，作用todo
  const query = new URLSearchParams(loaderCtx.resourceQuery.slice(1));

  // S2 返回【export导出 行内loader资源加载路径】
  return genProxyModule(loaderCtx, loaders, query.get("type") !== "template");
};

function genProxyModule(loaderCtx, loaders, exportDefault = true) {
  const inLineRequest = genRequest(loaderCtx, loaders);
  console.log(
    "--------genProxyModule--------",
    `export {default} from ${inLineRequest}`
  );
  return exportDefault
    ? `export {default} from ${inLineRequest}`
    : `export * from ${inLineRequest}`;
}

function genRequest(loaderCtx, loaders) {
  const loaderAbsolutePaths = loaders.map((loader) => loader.request);
  const resource = loaderCtx.resourcePath + loaderCtx.resourceQuery;
  // 易错点：拼接方法
  // return '-!' + loaderAbsolutePaths.join('') + resource
  return stringifyReqPath(
    loaderCtx,
    "-!" + [...loaderAbsolutePaths, resource].join("!")
  );
}

module.exports = pitcherLoader;
