# 记录待学习内容

1 -save 和 —save-dev的区别和使用场景

2 @vue/compiler-sfc的常见API和作用

3 loaderContext的相关API功能了解

4 moule.rules里的 loader: require.resolve('./pitcher.js') 写法
```js
const pitcherRule = {
      loader: require.resolve("./pitcher.js"),
      resourceQuery: (query) => {
        if (!query) return false;
        let parsed = new URLSearchParams(query.slice(1));
        return parsed.get("vue") !== null;
      },
    };
```

5 解释下面代码

```js
// loader.path  ??
// __filename  ??
const isNotPitcherLoader = loader => loader.path !== __filename



// ？？export {default} from xxx
function genProxyModule(loaderCtx, loaders) {
  return `export {default} from ${inLineRequest}`;
}

// ?? loader.request
// ?? "-!" + [...loaderAbsolutePaths, resource].join("!")
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
```


6 解释下面代码

```js
// SFCCompiler.compileScrip??
// loaderCtx.callback??
function selectBlock(loaderCtx, queryMap, descriptor, scopedId) {
  if (queryMap.get("type") === "script") {
    const scriptObj = SFCCompiler.compileScript(descriptor, {
      id: scopedId,
    });
    loaderCtx.callback(null, scriptObj.content);
    return;
  }
}
```

7 解释下面代码
```js

// script.render = render ??
// import ${requestPath} ??

// S2.2 把 template内容转化为 带有查询参数标识的【文件导入】
if (template) {
  const query = `?vue&type=template&id=${id}`;
  const requestPath = stringifyReqPath(loaderCtx, resourcePath + query);
  code.push(`import {render} from ${requestPath}`);
  code.push(`script.render = render`);
}

// S2.3 把 style内容【逐个】转化为 带有查询参数标识的【文件导入】
if (styles.length > 0) {
  styles.forEach((style, idx) => {
    const query = `?vue&type=style&index=${idx}&id=${id}`;
    const requestPath = stringifyReqPath(loaderCtx, resourcePath + query)
    code.push(`import ${requestPath}`);
  })
}
```


8 hash-sum？？

```js
const hash = require("hash-sum");

```

9 正则含义  /css-loader/.test(loader.path)???
 require.resolve('./stylePostLoader') ???
```js
const isCSSLoader = loader => /css-loader/.test(loader.path)

const stylePostLoaderPath = require.resolve('./stylePostLoader');
```

10 导出区别 ??

```js
export * from xxx
export {default} from xxx
```

11 loaders里的 require.resolve('./stylePostLoader'); ？？？