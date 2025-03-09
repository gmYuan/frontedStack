# LeetCode107- 二叉树的层序遍历 II


1 思维关键词: 
  - 方法1: 递归法: DFS
  - 方法2: 迭代法: queue + {node, depth}节点结构 + unshift()

2 参考文档

[01 方法1参考实现](https://leetcode.cn/problems/binary-tree-level-order-traversal-ii/solutions/403012/san-chong-shi-xian-tu-jie-107er-cha-shu-de-ceng-ci/)

[02 方法2参考实现](https://leetcode.cn/problems/binary-tree-level-order-traversal-ii/solutions/1539950/jsjie-ti-si-lu-qing-xi-ming-liao-by-inte-vlg9/)


## 代码实现

方法1: 递归法-DFS  时间复杂度 O(n)  空间复杂度：O(h)

```ts
function levelOrderBottom(root: TreeNode | null): number[][] {
  if (!root) return []
  let res = []
  innerOrder(root, 0, res)
  return res.reverse()
};

function innerOrder(node, depth, res) {
  if (!node) return
  innerOrder(node.left, depth+1, res)
  innerOrder(node.right, depth+1, res)
  res[depth] = res[depth] || []
  res[depth].push(node.val)
}
```


方法2: 迭代法- queue + {node, depth}节点结构 + unshift()  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function levelOrderBottom(root: TreeNode | null): number[][] {
  if (!root) return []
  let queue = [{node: root, depth: 0}], res = []
  while (queue.length) {
    const {node, depth} = queue.shift()
    // 利用res的最后特性，从头部倒序插入
    if (depth === res.length) {
      res.unshift([])
    }
    // 当前轮次中，必然是在第一个头部节点插入当前值
    res[0].push(node.val)
    if (node.left) {
      queue.push({node: node.left, depth: depth + 1})
    }
    if (node.right) {
      queue.push({node: node.right, depth: depth + 1})
    }
  }
  return res
}
```