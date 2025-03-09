# LeetCode341- 扁平化嵌套列表迭代器

## 实现思路

1 思维关键词: 

1 递归法: for循环 + 深度递归

2 迭代法: 栈 + 循环出入栈

3 方法3: 生成器方法

2 参考文档

[01 官方参考实现](https://leetcode.cn/problems/flatten-nested-list-iterator/solution/bian-ping-hua-qian-tao-lie-biao-die-dai-ipjzq/)

[02 生成器方法参考实现](https://leetcode.cn/problems/flatten-nested-list-iterator/solution/shi-yong-javascript-sheng-cheng-qi-han-shu-di-gui-/)

## 代码实现

1 方法1: 深度递归法  时间复杂度O(n)  空间复杂度：O(n)

```ts
class NestedIterator {
	list: number[]
	constructor(nestedList: NestedInteger[]) {
	  this.list = []
	  this.dfs(nestedList)
  }

  hasNext(): boolean {
	  return this.list.length > 0
  }

  next(): number {
	  return this.list.shift()
  }

  private dfs(nestedList: NestedInteger[]) {
    // 遍历所有嵌套数组成员，递归对嵌套类型进行处理
    for (const curInfo of nestedList) {
      if (curInfo.isInteger()) {
        this.list.push( curInfo.getInteger())
      } else {
        this.dfs(curInfo.getList());
      }
    }
  }
}
```

方法2: 栈 + 循环出入栈  均摊时间复杂度O(1)  空间复杂度：O(n)

```ts
class NestedIterator {
 	stack: NestedInteger[]
	constructor(nestedList: NestedInteger[]) {
	  this.stack = nestedList
  }

  hasNext(): boolean {
		while (this.stack.length) {
			const curInfo = this.stack[0]
			if (curInfo.isInteger()) {
				return true
			} else {
				// 易错点1: 把当前嵌套数组出栈，同时把它的内部成员拍平一层后 入栈
				const list = curInfo.getList()
        this.stack.shift()
				this.stack.unshift(...list)
			}
		}
  }

  next(): number {
		return this.stack.shift().getInteger()
  }
}
```

方法3: 生成器函数 + 递归调用法

```ts
class NestedIterator {
	constructor(nestedList: NestedInteger[]) {
		// 通过生成器函数 递归遍历嵌套数组
		const gen = function *(arr) {
			for (let nest of arr) {
				if (nest.isInteger()) {
					yield nest.getInteger()
				} else {
					yield *gen(nest.getList())
				}
			}
		}
		this.iter = gen(nestedList)
		//调用迭代器的next方法，返回 {value: val, done: true/false}
    this.curInfo = this.iter.next()
  }

  hasNext(): boolean {
		return !this.curInfo.done
  }

  next(): number {
		const ret = this.curInfo.value
		this.curInfo = this.iter.next()
		return ret
  }
}

```