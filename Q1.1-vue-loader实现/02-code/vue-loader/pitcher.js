const {stringifyReqPath} = require("./utils");
const stylePostLoaderPath = require.resolve('./stylePostLoader');

// pitcherLoader本身就只是透传到下一个loader的（实际上后续也不会执行到它）
// 重要的不是它，而是它上面挂载的pitch钩子
function pitcherLoader(code) {
  return code;
}
const isNotPitcherLoader = (loader) => loader.path !== __filename;
const isCSSLoader = loader => /css-loader/.test(loader.path)

pitcherLoader.pitch = function () {
  // S1 this.loaders返回的数组包含了符合当前文件的所有Loaders，其顺序与配置数组顺序一致 + 排除pitcherLoader本身
  const loaderCtx = this;
  const loaders = loaderCtx.loaders.filter(isNotPitcherLoader);

  // query为 <map>{vue: '', type: 'script'}，用于特殊处理style==> 在特定位置的loader前后，插入一个新的处理loader
  const query = new URLSearchParams(loaderCtx.resourceQuery.slice(1));
  if (query.get("type") === 'style') {
    console.log('isStyle')
    const cssLoaderIdx = loaders.findIndex(isCSSLoader)
    //把 stylePostLoaderPath插入css-loader的右边
    return genProxyModule(
        loaderCtx,
        [...loaders.slice(0, cssLoaderIdx + 1), { request: stylePostLoaderPath }, ...loaders.slice(cssLoaderIdx + 1)]
    )
  }

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
  // loader.request 是loader文件的绝对路径; 兼容插入的stylePostLoader本身是路径的情况
  const loaderAbsolutePaths = loaders.map((loader) => loader.request || loader);
  const resource = loaderCtx.resourcePath + loaderCtx.resourceQuery;
  // 易错点：拼接方法
  // return '-!' + loaderAbsolutePaths.join('') + resource
  return stringifyReqPath(
      loaderCtx,
      "-!" + [...loaderAbsolutePaths, resource].join("!")
  );
}

module.exports = pitcherLoader;
