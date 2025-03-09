# LeetCode232- 用栈实现队列

## 实现思路

1 思维关键词: 进入栈 & 弹出栈 + 负负得正

2 参考文档

[01 官方实现](https://leetcode.cn/problems/implement-queue-using-stacks/solution/yong-zhan-shi-xian-dui-lie-by-leetcode-s-xnb6/)


## 代码实现

1 方法1: 进入栈 & 弹出栈 + 负负得正   均摊时间复杂度O(1)  空间复杂度：O(n)

```ts
class MyQueue {
  inStack: number[]
  outStack: number[]
  constructor() {
    this.inStack = []
    this.outStack = []
  }

  push(x: number): void {
    this.inStack.push(x)
  }

  pop(): number {
    // 只有在弹出栈为空时才入栈，从而降低均摊复杂度为O(1)
    if (!this.outStack.length) {
      this.in2Out()
    }
    // 易错点1: 要返回出outStack的pop值
    return this.outStack.pop()
  }

  peek(): number {
    if (!this.outStack.length) {
      this.in2Out()
    }
    return this.outStack[this.outStack.length - 1]
  }

  empty(): boolean {
    return !this.inStack.length && !this.outStack.length
  }

  private in2Out() {
    while (this.inStack.length) {
      this.outStack.push(this.inStack.pop())
    }
  }
}
```

