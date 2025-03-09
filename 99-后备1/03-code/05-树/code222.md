# LeetCode222- 完全二叉树的节点个数

1 思维关键词: 
  - 方法1: 满二叉树求和公式 + 完全二叉树左右子树高度性质
  - 方法2: 完全二叉树高度 + 二分查找 + 节点存在性判断
	  - 右子树的最左节点b 和 左子树的最左节点a，必然相差2^(depth-1)==>
      也就是说，换算成二进制表示时, a的次高位必然为0 + b的次高位必然为1==>
	    通过和bits的与运算，获取到次高位的比特位值==> 从而确定是 0:左节点分支/ 1:右节点分支


2 参考文档

[01 方法1参考实现](https://leetcode.cn/problems/count-complete-tree-nodes/solutions/21544/chang-gui-jie-fa-he-ji-bai-100de-javajie-fa-by-xia/)

[02 方法2参考实现](https://leetcode.cn/problems/count-complete-tree-nodes/solutions/495655/wan-quan-er-cha-shu-de-jie-dian-ge-shu-by-leetco-2/)


## 代码实现

1 方法1: 满二叉树求和公式 + 完全二叉树左右子树高度性质  时间复杂度: O(log^2n) 空间复杂度: O(logn)

```ts
function countNodes(root: TreeNode | null): number {
	if (!root) return 0
	const leftDepth = getDepth(root.left)
	const rightDepth = getDepth(root.right)
	if (leftDepth === rightDepth) {
		return (1<<leftDepth) + countNodes(root.right)
	} else {
		// 左子树高度 > 右子树高度，则右子树的 rightDepth-1高度必然是满二叉树
		return (1<<rightDepth) + countNodes(root.left)
	}
};

function getDepth(root: TreeNode | null): number {
	let depth = 0
	while (root) {
		depth += 1
		root = root.left
	}
	return depth
}
```

方法2: 完全二叉树高度 + 二分查找 + 节点存在性判断  时间复杂度: O(log^2n) 空间复杂度: O(1)

```ts
function countNodes(root: TreeNode | null): number {
  if (!root) return 0;
  // S1 获取完全二叉树高度
  let depth = getDepth(root)
  // S2.1 最底层完全二叉树的索引编号(从1开始)，其上下界范围是 [2^depth, 2^(depth+1)-1]
  let low = 1 << depth, high = (1 << (depth + 1)) - 1;
  while (low < high) {
		// S2.2 二分查找获取中值
    const mid = Math.floor((high - low + 1) / 2) + low;
		// S3 查找中值位置对应的节点 是否存在
    if (exists(root, depth, mid)) {
      low = mid;
    } else {
      high = mid - 1;
    }
  }
  return low;
};

function getDepth(node: TreeNode | null):number {
	let depth = 0
	while (node.left) {
    depth++;
    node = node.left;
  }
	return depth
}

function exists(root: TreeNode | null, depth: number, targetVal: number): boolean {
	let node = root;
	// 从次高位开始，每次都右移一位，从而获取targetVal每1位的二进制值
  let bits = 1 << (depth - 1);
  while (node && bits > 0) {
		// 二进制与运算结果为0，则进入左节点分支
    if (!(bits & targetVal)) {
      node = node.left;
    } else {
			// 二进制与运算结果为1，则进入右节点分支
      node = node.right;
    }
    bits >>= 1;
  }
  return node !== null;
}
```