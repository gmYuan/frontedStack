# LeetCode235- 二叉搜索树的最近公共祖先

1 思维关键词: 
  - 方法1: 二叉搜索树性质

2 参考文档

[01-官方参考实现](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/solutions/428633/er-cha-sou-suo-shu-de-zui-jin-gong-gong-zu-xian-26/)


## 代码实现

1 方法1: 二叉搜索树性质-递归实现  时间复杂度: O(n);  空间复杂度: O(1)

```ts

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  if (!root) return null
  if (p.val < root.val && q.val < root.val) return lowestCommonAncestor(root.left, p, q);
  if (p.val > root.val && q.val > root.val) return lowestCommonAncestor(root.right, p, q);
  // 此时，要么 p.val/q.val === root.val，要么p.val和q.val在root根节点的两侧
  // 根据二分搜索树的性质，此时root节点就是p和q的最近祖先节点
  return root
};

```

2 方法2: 二叉搜索树性质-迭代实现  时间复杂度: O(n);  空间复杂度: O(1)

```ts
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  if (!root) return null
  let cur = root
  while (cur) {
    if (p.val < cur.val && q.val < cur.val) cur = cur.left;
    else if (p.val > cur.val && q.val > cur.val) cur = cur.right;
    else return cur
  }
};
```

