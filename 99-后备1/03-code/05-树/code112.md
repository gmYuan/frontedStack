# LeetCode112- 路径总和

1 思维关键词: 
  - 方法1: DFS + 叶子节点定义 + taget转化为减法技巧
  - 方法2: queue + 叶子节点定义


2 参考文档

[01 官方参考实现](https://leetcode.cn/problems/path-sum/solutions/318487/lu-jing-zong-he-by-leetcode-solution/)


## 代码实现

1 方法1: DFS + 叶子节点定义 + taget转化为减法技巧  时间复杂度: O(N);  空间复杂度: O(H)

```ts
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
	if (!root) return false;
  if (!root.left && !root.right && root.val === targetSum) return true;
  // 判断是否有1条完整路径，使得val和 = targetSum
  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val)
};
```


2 方法2: queue + 叶子节点定义  时间复杂度: O(N);  空间复杂度: O(N)

```ts
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (!root) return false
  let queue = [{node: root, total: root.val}]
  while (queue.length) {
    const { node, total } = queue.shift()
    if (!node.left && !node.right && total === targetSum) return true
    if (node.left) {
      queue.push({node: node.left, total: total + node.left.val })
    }
    if (node.right) {
      queue.push({node: node.right, total: total + node.right.val })
    }
  }
  return false
}
```
