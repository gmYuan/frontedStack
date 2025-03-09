# LeetCode71- 简化路径

## 实现思路

1 思维关键词: split('/')后分类讨论 + 栈

2 参考文档

[01 方法1官方实现](https://leetcode.cn/problems/simplify-path/solution/jian-hua-lu-jing-by-leetcode-solution-aucq/)


## 代码实现

方法1: split + 栈  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function simplifyPath(path: string): string {
  // paths的成员类型可能有4种情况：字符数字/空字符/../.
  let paths = path.split('/') 
  let stack = []
  for (let str of paths) {
    // ..表示返回上一层目录，即去除当前所在的栈尾元素
    if (str === '..') { 
      stack.pop()
    } else if (str && str !== '.') {
      // 空字符和.字符的情况，都是无意义的要忽略，其他情况表示合法路径要入栈 
      stack.push(str)
    }
  }
  return '/' + stack.join('/')
};
```

