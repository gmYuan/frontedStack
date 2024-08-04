const compiler = require('vue/compiler-sfc');
function selectBlock(descriptor, scopedId, loaderContext, query) {
  if (query.get('type') === 'script') {
    //编译 后的JS脚本向后传递
    const script = compiler.compileScript(descriptor, { id: scopedId });
    loaderContext.callback(null, script.content);
    return;
  }
  if (query.get('type') === 'template') {
    const template = descriptor.template;
    loaderContext.callback(null, template.content);
    return;
  }
  if (query.get('type') === 'style') {
    const style = descriptor.styles[Number(query.get('index'))];
    loaderContext.callback(null, style.content);
    return;
  }
}
exports.selectBlock = selectBlock;