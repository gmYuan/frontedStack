# LeetCode257- 二叉树的所有路径

1 思维关键词: 
  - 方法1: DFS + 回溯

2 参考文档

[01 参考实现](https://leetcode.cn/problems/binary-tree-paths/solutions/1366444/acm-xuia-by-rocky0429-2-ul6r/)


## 代码实现

1 方法1: DFS + 回溯  时间复杂度: O(N);  空间复杂度: O(N)

```ts
function binaryTreePaths(root: TreeNode | null): string[] {
  if (!root) return []
  const res = []
  dfs(root, [], res)
  return res
};

function dfs(node, tres, res) {
  tres.push(`${node.val}`)
  if (!node.left && !node.right) {
    res.push(tres.join('->'))
  } else {
    if (node.left) dfs(node.left, tres, res);
    if (node.right) dfs(node.right, tres, res);
  }
  tres.pop()
}
```


