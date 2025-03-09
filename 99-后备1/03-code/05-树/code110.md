# LeetCode110- 平衡二叉树

1 思维关键词: 
  - 方法1: 后序递归法: inner(node): depth | -1 + 后序比较子树高度差
	- 方法2: 迭代法 待补充


2 参考文档

[01 方法1参考](https://leetcode.cn/problems/balanced-binary-tree/solutions/8737/balanced-binary-tree-di-gui-fang-fa-by-jin40789108/)

[02 方法2参考](/)


## 代码实现

1 方法1: 后序递归法: inner(node): depth | -1 + 后序比较子树高度差  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function isBalanced(root: TreeNode | null): boolean {
  if (!root) return true
  return inner(root) > 0
};

// 递归函数含义：以node为根节点的二叉树: 其左右子树不是平衡的则 返回-1; 左右子树是平衡的，返回其子树高度
function inner(node: TreeNode | null): number {
	// 空节点被认为平衡的，所以返回其子树高度，即0
	if (!node) return 0
	const leftDepth = inner(node.left)
	if (leftDepth === -1 ) return -1
	const rightDepth = inner(node.right)
	if (rightDepth === -1) return -1
	return Math.abs(leftDepth - rightDepth) <= 1 ? Math.max(leftDepth, rightDepth) + 1 : -1
}
```