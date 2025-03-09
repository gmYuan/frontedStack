# LeetCode113- 路径总和II

1 思维关键词: 
  - 方法1: DFS + 回溯

2 参考文档

[01 参考实现](https://leetcode.cn/problems/path-sum-ii/solutions/427844/3chong-fang-shi-jie-jue-2chong-ji-bai-liao-100de-2/)


## 代码实现

1 方法1: DFS + 回溯  时间复杂度: O(N);  空间复杂度: O(N)

```ts
function pathSum(root: TreeNode | null, targetSum: number): number[][] {
  if (!root) return []
  let res = [], curPath = []
  dfs(root, targetSum, 0, curPath, res) 
  return res
};

function dfs(node: TreeNode | null, targetSum: number, curSum: number, curPath: number[], res: number[][]) {
  curPath.push(node.val)
  curSum += node.val
  if (curSum === targetSum && !node.left && !node.right) {
    // 易错点1: 在JS中，引用类型传参是共用的
    res.push([...curPath])
  }
  if (node.left) dfs(node.left, targetSum, curSum, curPath, res);
  if (node.right) dfs(node.right, targetSum, curSum, curPath, res);
  // 易错点2: 回溯的时机是遍历到一条路径的叶子节点后
  curPath.pop();
}
```


