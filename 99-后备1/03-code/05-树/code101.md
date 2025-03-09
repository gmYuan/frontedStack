# LeetCode101- 对称二叉树


1 思维关键词: 
  - 方法1.1: 间接递归法==> 反转右子树 + 判断左右子树 是否相等
  - 方法1.2: 直接递归法==> isMirror(a, b)

  - 方法2: 迭代法==> queue + (a.left,b.right) && (a.right,b.left)

2 参考文档

[01 方法1.1参考实现](https://github.com/liuyubobobo/Play-Leetcode/blob/master/0001-0500/0101-Symmetric-Tree/py-0101/Solution1.py)

[02 方法1.2参考实现](https://leetcode.cn/problems/symmetric-tree/solutions/6694/hua-jie-suan-fa-101-dui-cheng-er-cha-shu-by-guanpe/)

[03 方法2参考实现](https://leetcode.cn/problems/symmetric-tree/solutions/268109/dui-cheng-er-cha-shu-by-leetcode-solution/)


## 代码实现

方法1.1: 递归法1- reverse() + isEquel()   时间复杂度 O(n)  空间复杂度：O(n)

```ts
function isSymmetric(root: TreeNode | null): boolean {
  // 空子树被认为是 对称的
  if (!root) return true
  // 反转 以root为根节点的 右子树内部的 左右子树	
  reverse(root.right)
  // 判断 以root为根节点的 左右子树是否相等
	return isEquel(root.left, root.right)
};

// 反转 以node为根节点的 左右子树	
function reverse(node: TreeNode| null) {
	if (!node) return
  // 交换左右节点的位置
	[node.left, node.right] = [node.right, node.left]
  // 再分别反转 左右子树的节点
	reverse(node.left)
	reverse(node.right)
}

// 判断以left、right为 根节点的左右子树 是否相等
function isEquel(left: TreeNode| null, right: TreeNode| null) {
  // 如果都不存在，则认为相等
	if (!left && !right) return true
  // 如果只有一个子树存在，肯定不相同
	if (!left || !right) return false
  // 节点的值不相等，也不相同
	if (left.val !== right.val) return false
  // 在比较 left的左子树 + right的左子树  &&  left的右子树 + right的右子树 
	return isEquel(left.left, right.left) && isEquel(left.right, right.right)
}
```

方法1.2: 直接递归法: isMirror(left, right)   时间复杂度 O(n)  空间复杂度：O(n)

```ts
function isSymmetric(root: TreeNode | null): boolean {
	if (!root) return true
	// 判断左右子树是否对称
	return isMirror(root.left, root.right)
};

// 判断 分别以left, right为根节点的2个二叉树，他们是否是 对称的
function isMirror(left: TreeNode | null, right: TreeNode | null) {
	// 同时为空节点，那么是对称的
	if (!left && !right) return true
	// 只有1个为空节点，那么肯定不对称
	if (!left || !right) return false
	// 当前节点值不相等，那么肯定不对称
	if (left.val !== right.val) return false
	// 轴对称，即 a的左子树 === b的右子树  && a的右子树 === b的左子树
	// 当前节点是对称的，那么继续向下看 a的左子树+b的右子树 && a的右子树+b的左子树 是否相等
	return isMirror(left.left, right.right) && isMirror(left.right, right.left)
}
```


方法2: 迭代法: queue + (a.left,b.right) && (a.right,b.left)  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function isSymmetric(root: TreeNode | null): boolean {
	if (!root) return true
	const queue = [root, root]
	while (queue.length) {
		const a = queue.shift(), b = queue.shift()
		if (!a && !b) continue;
		if (!a || !b) return false;
		if (a.val !== b.val) return false;
		// 由于后续要1次取出2个头节点，所以先推入a树的左节点 + b树的右节点
		queue.push(a.left)
		queue.push(b.right)
		// 再推入a树的右节点 + b树的左节点
		queue.push(b.right)
		queue.push(a.left)
	}
	// 所有节点处理结束
	return true
};
```