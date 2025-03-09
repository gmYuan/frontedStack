# LeetCode100- 相同的树

1 思维关键词: 
  - 方法1 DFS: 终止条件是null空节点
  - 方法2 BFS: queue


2 参考文档

[01 官方实现参考](https://leetcode.cn/problems/same-tree/solutions/363636/xiang-tong-de-shu-by-leetcode-solution/)


## 代码实现

1 方法1: DFS 时间复杂度 O(min⁡(m,n)), m/n分别是两个2叉树的节点数;  空间复杂度 O(min(m,n))

```ts
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (!p && !q) return true
  if (!p || !q) return false
  if (p.val !== q.val) return false
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
};
```

2 方法2: BFS   时间复杂度 O(min⁡(m,n));   空间复杂度 O(min(m,n))

```ts
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  let queue = [p, q]
  while (queue.length) {
	const p = queue.shift(), q = queue.shift()
		if (!p && !q) continue;
		if ((!p || !q) || p.val !== q.val) return false;
		queue.push(p.left)
		queue.push(q.left)
		queue.push(p.right)
		queue.push(q.right)
	}
	return true
};
```
