# LeetCode199- 二叉树的右视图

1 思维关键词: 
  - 方法1: BFS + {node,level} 队列法
  - 方法2: DFS: 前序递归 + innerOder(root, depth, res)

2 参考文档

[01 方法参考](https://leetcode.cn/problems/binary-tree-right-side-view/solution/jian-dan-bfsdfs-bi-xu-miao-dong-by-sweetiee/)


## 代码实现

方法1: BFS  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function rightSideView(root: TreeNode | null): number[] {
  if (!root) return []
  let queue = [{node: root, depth: 0}], res = []
  while (queue.length) {
    const { node, depth } = queue.shift()
    if (res[depth] == null) {
      res[depth] = node.val
    }
    if (node.right) {
      queue.push( {node: node.right, depth: depth + 1})
    }
    if (node.left) {
      queue.push( {node: node.left, depth: depth + 1})
    }
  }
  return res
};
```

方法2: 递归法:  时间复杂度 O(n)  空间复杂度：O(h)

```ts
function rightSideView(root: TreeNode | null): number[] {
  if (!root) return []
  let res = []
  innerRight(root, 0, res)
  return res
};

function innerRight(node: TreeNode, depth: number, res: number[]) {
  res[depth] = node.val
  // 利用递归读取性质，优先设置为左子节点值，此时如果有右子节点会被覆盖
  if (node.left) {
    innerRight(node.left, depth + 1, res)
  }
  if (node.right) {
    innerRight(node.right, depth + 1, res)
  }
}
```