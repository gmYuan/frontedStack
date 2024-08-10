const SFCCompiler = require("vue/compiler-sfc");

function selectBlock(loaderCtx, queryMap, descriptor, scopedId) {
  if (queryMap.get("type") === "script") {
    const scriptObj = SFCCompiler.compileScript(descriptor, {
      id: scopedId,
    });
    loaderCtx.callback(null, scriptObj.content);
    return;
  }
}

exports.selectBlock = selectBlock;
