const { stringifyRequest } = require('./utils');
const stylePostLoaderPath = require.resolve('./stylePostLoader');
const pitcher = code => code;
const isNotPitcher = loader => loader.path !== __filename;
const isCSSLoader = loader => /css-loader/.test(loader.path)
const pitch = function () {
  const loaderContext = this;
  //loaders=[pitcher,vue-loader] 过滤掉自己这个loader,loaders已经包含了从配置文件中获取的loader
  const loaders = loaderContext.loaders.filter(isNotPitcher);
  //query=vue&type=script
  const query = new URLSearchParams(loaderContext.resourceQuery.slice(1));
  if (query.get('type') === 'style') {
    const cssLoaderIndex = loaders.findIndex(isCSSLoader);
    //把stylePostLoaderPath插入css-loader的右边
    return genProxyModule(
      [...loaders.slice(0, cssLoaderIndex + 1), { request: stylePostLoaderPath }, ...loaders.slice(cssLoaderIndex + 1)],
      loaderContext
    );
  }
  return genProxyModule(loaders, loaderContext, query.get('type') !== 'template');
}
function genProxyModule(loaders, loaderContext, exportDefault = true) {
  const request = genRequest(loaders, loaderContext);
  //script style都是默认导出 template批量导出
  return exportDefault ? `export {default} from ${request}` : `export * from ${request}`;
}
function genRequest(loaders, loaderContext) {
  //loader.request 是loader文件的绝对路径 [C:\aproject\vueloader20220828\vue-loader\index.js]
  const loaderStrings = loaders.map(loader => loader.request || loader);
  //要加载的资源的绝对路径 C:\aproject\vueloader20220828\src\App.vue?vue&type=script
  const resource = loaderContext.resourcePath + loaderContext.resourceQuery;
  //在前面加上关键字，是为了忽略配置文件中的loader,
  return stringifyRequest(loaderContext,
    '-!' + [...loaderStrings, resource].join('!')
  );
}
pitcher.pitch = pitch;
module.exports = pitcher;