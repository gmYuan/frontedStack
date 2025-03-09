# LeetCode103- 二叉树的锯齿形层序遍历

1 思维关键词: 
  - 方法1: BFS + {node,level} 队列法
  - 方法2: DFS: 前序递归 + innerOder(depth, root, res)

2 参考文档

[01 方法参考](https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/solution/bfshe-dfsliang-chong-jie-jue-fang-shi-by-184y/)


## 代码实现

方法1: BFS + {node, depth} 队列法  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function zigzagLevelOrder(root: TreeNode | null): number[][] {
  if (!root) return []
  let queue = [ {node: root, depth: 0} ], res = []
  while (queue.length) {
    const { node, depth } = queue.shift()
    res[depth] = res[depth] || []
    // 当前层是奇数层，就从右到左插入; 否则偶数层就保持从左到右插入
    depth % 2 === 1 ? res[depth].unshift(node.val) : res[depth].push(node.val)
   
    if (node.left) {
      queue.push( {node: node.left, depth: depth + 1});
    } 
    if (node.right) {
      queue.push( {node: node.right, depth: depth + 1})
    }
  } 
  return res
};
```


方法2: 递归法:  时间复杂度 O(n)  空间复杂度：O(h)

```ts
function zigzagLevelOrder(root: TreeNode | null): number[][] {
  if (!root) return []
  let res = []
  innerLevel(0, root, res)
  return res 
};

function innerLevel(depth, node, res) {
  res[depth] = res[depth] || []
  depth % 2 === 0 ? res[depth].push(node.val) : res[depth].unshift(node.val)
  if (node.left) {
    innerLevel(depth + 1, node.left, res)
  }
  if (node.right) {
    innerLevel(depth + 1, node.right, res)
  }
}
```