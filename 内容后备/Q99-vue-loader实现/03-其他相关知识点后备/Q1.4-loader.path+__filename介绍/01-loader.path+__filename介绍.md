Q1 介绍下面这行代码里 loader.path 和 __filename的作用

```js
const isNotPitcherLoader = loader => loader.path !== __filename
```


A:


1 loader.path: 返回 当前loader文件的绝对路径，通常指向该loader源文件

2 __filename: 是 Node.js 模块系统中提供的一个全局变量，它表示 当前模块文件的绝对路径。每个模块文件都有自己的 __filename，该变量在【模块加载时】自动生成








