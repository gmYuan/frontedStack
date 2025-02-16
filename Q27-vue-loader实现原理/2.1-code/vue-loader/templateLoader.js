const SFCCompiler = require("vue/compiler-sfc");

function templateLoader(source) {
  const loaderCtx = this;
  const queryMap = new URLSearchParams(loaderCtx.resourceQuery.slice(1));
  const scopedId = queryMap.get("id");
  // 获取模板render的解析结果，传给后续webpack流程
  const { code } = SFCCompiler.compileTemplate({
    source,
    id: scopedId,
  });
  loaderCtx.callback(null, code);
}

module.exports = templateLoader;