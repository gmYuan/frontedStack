Q1 require.resolve是什么方法，有什么作用

A:

1 require.resolve 是 Node.js 中的一个方法，用于解析并返回指定模块的绝对路径

2 它与 `require` 有些相似，但 `require.resolve` 只做路径解析，而不会加载模块的内容

3 常见使用场景
  - 路径解析：当你想知道一个模块在文件系统中的确切位置时

  - 自定义加载器或工具：在 Webpack 或其他构建工具中，可能需要将模块路径 显式地传递给工具，而不是 直接加载模块内容

  - 动态加载：在需要动态决定加载哪个模块时，可以先通过 `require.resolve` 获取路径，再基于路径进行操作

4 示例

```js
// require.resolve的使用示例
const pitcherRule = {
  loader: require.resolve("./pitcher.js"),
  resourceQuery: (query) => {
    if (!query) return false;
    let parsed = new URLSearchParams(query.slice(1));
    return parsed.get("vue") !== null;
  },
};
```


## 二 阅读文档

[01 node的路径解析require.resolve](https://juejin.cn/post/6844904055806885895)








