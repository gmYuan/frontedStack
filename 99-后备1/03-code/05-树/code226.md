# LeetCode226- 翻转二叉树

1 思维关键词: 
  - 方法1.1 直接递归法: 终止条件是null空节点
  - 方法1.2 间接递归法: inner(parent, left, child) + 终止条件是叶子节点
  - 方法2 迭代法: queue + 交换左右节点位置


2 参考文档

[01 方法1.2参考](https://leetcode.cn/problems/invert-binary-tree/solutions/415160/fan-zhuan-er-cha-shu-by-leetcode-solution/)

[02 方法2参考](https://github.com/liuyubobobo/Play-Leetcode/blob/master/0001-0500/0226-Invert-Binary-Tree/java-0226/src/Solution2.java)


## 代码实现

1 方法1.1: 直接递归法: 终止条件是null  时间复杂度 O(n)  空间复杂度：O(n)

```ts
// 反转了以root为根节点的左右子树后，返回了该root
function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null
  const newL = invertTree(root.left);
  const newR = invertTree(root.right);
  root.left = newR
  root.right = newL
  return root
};
```

2 方法1.2: 递归法DFS: inner(parent, left, child)  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null
  return inner(root, root.left, root.right)
};

// 分别反转以 left,right为根节点的 2个二叉树的 左右节点后，返回新的头节点 newL, newR
// 最后返回 反转了parent子节点后的 新父节点parent
function inner(parent, left, right) {
	if (!left && !right) return parent
	let newL = null, newR = null
	if (left) {
		newL = inner(left, left.left, left.right)
	}
	if (right) {
		newR = inner(right, right.left, right.right)
	}
	parent.left = newR
	parent.right = newL
	return parent
}
```

3 方法3: 迭代法: queue + 交换左右节点位置  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null
	let queue = [root]
	while (queue.length) {
		let cur = queue.shift()
		let temp = cur.left
		cur.left = cur.right
		cur.right = temp
		if (cur.left) {
			queue.push(cur.left)
		}
		if (cur.right) {
			queue.push(cur.right)
		}
	} 
	return root
};
```
