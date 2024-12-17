function stringifyReqPath(loaderCtx, resource) {
  return JSON.stringify(
    loaderCtx.utils.contextify(loaderCtx.context, resource)
  );
}

exports.stringifyReqPath = stringifyReqPath