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
```