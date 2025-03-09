# LeetCode225- 用队列实现栈

## 实现思路

1 思维关键词:
  - 2个队列: 队列 & 临时队列 + 队首即依次后进入的元素
  - 1个队列: 队列 + 循环插入

2 参考文档

[01 官方实现](https://leetcode.cn/problems/implement-stack-using-queues/solution/yong-dui-lie-shi-xian-zhan-by-leetcode-solution/)


## 代码实现

1 方法1: 队列 & 临时队列 + 队首即依次后进入的元素  时间复杂度O(n)  空间复杂度：O(n)

```ts
class MyStack {
	queue: number[]
	temp: number[]
  constructor() {
		this.queue = []
		this.temp = []
	}

	/** 目标: 1,2,3 ==> 3,2,1
		  步骤:  temp    queue
			 S1     1        /
			 S2     2      /, 1
			 S3     3      2,1
	*/
  push(x: number): void {
		this.temp.push(x)
		while (this.queue.length) {
			this.temp.push(this.queue.shift())
		}
		[this.queue, this.temp] = [this.temp, this.queue]
	}

  pop(): number {
		return this.queue.shift()
	}

  top(): number {
		return this.queue[0]
	}

  empty(): boolean {
		return this.queue.length === 0
	}
}
```

2 方法2: 队列 & 循环插入  时间复杂度O(n)  空间复杂度：O(n)

```ts
class MyStack {
	queue: number[]
  constructor() {
		this.queue = []
	}

	/** 目标: 1,2,3 ==> 3,2,1
		  步骤:  preN     queue
			 S1     0        1
			 S2     1       2, 1
			 S3     2       3, 2,1
	*/
  push(x: number): void {
		let preN = this.queue.length
		// 加入新元素后，preN此时正好指向最后一个成员
		this.queue.push(x)
		while (preN) {
			this.queue.push(this.queue.shift())
			preN--
		}
	}

  pop(): number {
		return this.queue.shift()
	}

  top(): number {
		return this.queue[0]
	}

  empty(): boolean {
		return this.queue.length === 0
	}
}

```
