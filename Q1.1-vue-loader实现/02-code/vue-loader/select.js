const SFCCompiler = require("vue/compiler-sfc");

function selectBlock(loaderCtx, queryMap, descriptor, scopedId) {
  // 处理script段，用于返回出 最后的打包结果
  if (queryMap.get("type") === "script") {
    const scriptObj = SFCCompiler.compileScript(descriptor, {
      id: scopedId,
    });
    loaderCtx.callback(null, scriptObj.content);
    return;
  }

  // 处理template段，用于传递内容给 后续templateLoader等loader
  if (queryMap.get("type") === "template") {
    const templateObj = descriptor.template;
    loaderCtx.callback(null, templateObj.content);
    return;
  }

  // 处理style段，用于传递内容给 后续克隆的cssLoader、styleLoader等loader
  if (queryMap.get("type") === "style") {
    const styleObj = descriptor.styles[Number(queryMap.get('index'))];
    loaderCtx.callback(null, styleObj.content);
    return;
  }
}

exports.selectBlock = selectBlock;
