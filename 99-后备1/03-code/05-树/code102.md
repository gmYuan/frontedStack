# LeetCode102- 二叉树的层序遍历

## 实现思路

1 思维关键词: 
  - 方法1: BFS + {node,level} 队列法
  - 方法2: BFS + 同层级循环 + 队列法
  - 方法3: DFS: 前序递归 + innerOder(depth, root, res)


2 参考文档

[01 方法2参考](https://leetcode.cn/problems/binary-tree-level-order-traversal/solution/bfs-de-shi-yong-chang-jing-zong-jie-ceng-xu-bian-l/)

[02 方法3参考](https://leetcode.cn/problems/binary-tree-level-order-traversal/solution/die-dai-di-gui-duo-tu-yan-shi-102er-cha-shu-de-cen/)



## 代码实现

1 方法1: BFS + { node,level } 队列法  时间复杂度: O(n)  空间复杂度: O(n)

```ts
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  let res = []
  let queue = [ {node: root, level: 0} ]
  while (queue.length) {
    const { node, level } = queue.shift()
    res[level] = res[level] || []
    res[level].push(node.val)
    if (node.left) {
      queue.push({ node: node.left, level: level + 1})
    }
    if (node.right) {
      queue.push({ node: node.right, level: level + 1})
    }
  }
  return res
}
```

2 方法2: BFS + 同层级循环 + 队列法  时间复杂度: O(n)  空间复杂度: O(n)

```ts
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return []
  let res = [] 
  let queue = [root]
  while (queue.length) {
    const n = queue.length
    let temp = []
    // 每轮的while循环，都弹出和记录 处于同一层的所有节点
    for (let i = 0; i < n; i++) {
      let cur = queue.shift()
      temp.push(cur.val) 
      if (cur.left) {
        queue.push(cur.left)
      }
      if (cur.right) {
        queue.push(cur.right)
      }
    }
    res.push(temp)
  }
  return res
};
```

3 方法3: 递归法:  时间复杂度 O(n)  空间复杂度：O(h)

```ts
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return []
  let res = []
  innerOrder(0, root, res)
  return res
};

function innerOrder(depth: number, node: TreeNode, res: number[][]) {
  // 前序递归调用: 初始化每一层的内部数组 + 存入当前节点值
  res[depth] = res[depth] || []
  res[depth].push(node.val)

  // 隐式的递归中止条件: 当左右子节点都为空时，就会返回上一层递归调用
  if (node.left) {
    innerOrder(depth + 1, node.left, res)
  }
  if (node.right) {
    innerOrder(depth + 1, node.right, res)
  }
}
```