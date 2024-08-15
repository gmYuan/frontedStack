const SFCCompiler = require("vue/compiler-sfc");
function stylePostLoader(source) {
  const loaderCtx = this;
  const queryMap = new URLSearchParams(loaderCtx.resourceQuery.slice(1));
  const { code } = SFCCompiler.compileStyle({
    source,
    id: `data-v-${queryMap.get("id")}`,
    scoped: !!queryMap.get("scoped")
  });
  loaderCtx.callback(null, code);
}

module.exports = stylePostLoader;