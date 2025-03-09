# LeetCode150- 逆波兰表达式求值

## 实现思路

1 思维关键词: map + ~~向下取整 + 栈

2 参考文档

[01 官方实现](https://leetcode.cn/problems/evaluate-reverse-polish-notation/solution/ni-bo-lan-biao-da-shi-qiu-zhi-by-leetcod-wue9/)


## 代码实现

方法1: map + ~~向下取整 + 栈   时间复杂度 O(n)  空间复杂度：O(n)

```ts
function evalRPN(tokens: string[]): number {
   let operate = new Map([
    ["+", (a, b) => b + a],
    ["-", (a, b) => b - a], //易错点1: 后出的为 被减数/被除数
    ["*", (a, b) => b * a],
    // 易错点2: 负数时Math.floor的取整值不对，所以用~~ 向下取整
    ["/", (a, b) => ~~(b / a)], 
  ]);
  let stack = [];
  for (let str of tokens) {
    let fn = operate.get(str)
    // 说明遇到了操作符: 去除栈尾2个数字进行操作，并把结果存入栈尾
    if (fn) {
      let a = stack.pop(), b = stack.pop()
      stack.push(fn(a,b))
    } else {
      // 说明遇到的是数字: 入栈即可
      stack.push(+str)
    }
  }
  return stack[0]
};
```

