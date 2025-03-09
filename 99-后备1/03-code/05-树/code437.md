# LeetCode437- 路径总和III

1 思维关键词: 
  - 方法1: 双重递归
  - 方法2: 前缀和 + 回溯

2 参考文档

[01-方法1参考实现](https://leetcode.cn/problems/path-sum-iii/solutions/10031/liang-chong-fang-fa-jian-dan-yi-dong-ban-ben-by-a3/)

[02-方法2参考实现](https://leetcode.cn/problems/path-sum-iii/solutions/1021776/tong-ge-lai-shua-ti-la-qian-zhui-he-tu-j-trcq/)


## 代码实现

1 方法1:双重递归  时间复杂度: O(N^2);  空间复杂度: O(N)

```ts
function pathSum(root: TreeNode | null, targetSum: number): number {
  if (!root) return 0
  // 求出以node为根节点的路径条数后，再分别以node.left/node.right 求路径条数
  return findPath(root, targetSum) + 
    pathSum(root.left, targetSum) + pathSum(root.right, targetSum)
};

function findPath(node, target) {
  if (!node) return 0
  target-= node.val
  // 以node为根节点的路径条数，需要遍历完所有结果，直到叶子节点
  return (target === 0 ? 1 : 0) + findPath(node.left, target) + findPath(node.right, target) 
}
```

2 方法2 前缀和 + 回溯  时间复杂度: O(N);  空间复杂度: O(N)

```ts
let target = 0, map = new Map()
function pathSum(root, targetSum) {
  target = targetSum;
  // 默认情况下，当curPix === target时，则默认存在一条路径
  map.set(0,1);
  return dfs(root, 0);
};

function dfs(node, curSum) {
  if(!node) return 0;
  // 前缀和定义: 从根节点到本节点间的 节点值之和
  curSum += node.val
  // 前缀和性质: 只要 每存在一个pixX，满足 curPix - pixX = target，
  // 那么pixX的个数, 就是路径和 === target的 路径个数，此时pixX的值为 curPix-target
  let res = map.get(curSum - target) || 0
  // key是当前节点的前缀和, val是可以得到当前前缀和值的 路径条数
  map.set(curSum, (map.get(curSum) || 0) + 1)
  let left = dfs(node.left, curSum)
  let right = dfs(node.right, curSum)
  // 回溯阶段: 去除以该node节点为根节点的 前缀和记录数量
  map.set(curSum, map.get(curSum)-1);
  // 返回该节点+该节点左右子节点 各自满足条件的  路径和数量
  return res+left+right
}
```

