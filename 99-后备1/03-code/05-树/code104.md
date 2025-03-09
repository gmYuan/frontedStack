# LeetCode104- 二叉树的最大深度

1 思维关键词: 
  - 方法1: 递归法: DFS
  - 方法2: 迭代法: queue + {depth, node}结构

2 参考文档

[01 官方实现](https://leetcode.cn/problems/maximum-depth-of-binary-tree/solutions/349250/er-cha-shu-de-zui-da-shen-du-by-leetcode-solution/)


## 代码实现

方法1: 递归法-DFS   时间复杂度 O(n)  空间复杂度：O(h)

```ts
// 获取以root为根节点的二叉树最大深度
function maxDepth(root: TreeNode | null): number {
  if (!root) return 0
  const leftRes = maxDepth(root.left)
  const rightRes = maxDepth(root.right)
  return Math.max(leftRes, rightRes)
};
```

方法2: 迭代法- queue + {depth, node}结构   时间复杂度 O(n)  空间复杂度：O(n)

```ts
function maxDepth(root: TreeNode | null): number {
 if (!root) return 0
  let queue = [ {depth: 1, node: root} ], res = 1
  while(queue.length) {
    const { depth, node } = queue.shift()
    res = Math.max(res, depth)
    if (node.left) {
      queue.push( {depth: depth + 1, node: node.left} )
    }
    if (node.right) {
      queue.push( {depth: depth + 1, node: node.right} )
    }
  }
  return res
}

```