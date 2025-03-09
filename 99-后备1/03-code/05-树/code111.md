# LeetCode111- 二叉树的最小深度

1 思维关键词: 
  - 方法1: 递归法: DFS
  - 方法2: 迭代法: queue + {node, depth}节点结构

2 参考文档

[01 方法1参考实现](https://leetcode.cn/problems/minimum-depth-of-binary-tree/solutions/11486/li-jie-zhe-dao-ti-de-jie-shu-tiao-jian-by-user7208/)

[02 方法2参考实现](https://leetcode.cn/problems/minimum-depth-of-binary-tree/solutions/382646/er-cha-shu-de-zui-xiao-shen-du-by-leetcode-solutio/)


## 代码实现

方法1.1: 间接递归法-DFS   时间复杂度 O(n)  空间复杂度：O(h)

```ts
function minDepth(root: TreeNode | null): number {
  if (!root) return 0
  return innerMin(root, 1)
};

// 寻找以node为根节点的 树的最短路径
function innerMin(node: TreeNode, depth: number) {
  if (!node.left && !node.right) return depth
  let leftMin = 100001, rightMin = 100001
  if (node.left) {
    leftMin = innerMin(node.left, depth + 1)
  }
  if (node.right) {
    rightMin = innerMin(node.right, depth + 1)
  }
  return Math.min(leftMin, rightMin)
}

```

方法1.2: 直接递归法-DFS   时间复杂度 O(n)  空间复杂度：O(h)

```ts
// 寻找以root为根节点的 树的最短路径
function minDepth(root: TreeNode | null): number {
  // 不存在节点的情况，高度为0
  if(!root) return 0;

  //计算左右子树的高度
  const leftMin = minDepth(root.left);
  const rightMin = minDepth(root.right);
  // 说明有一边为空，也就没有叶子节点
  if (leftMin === 0 || rightMin === 0) {
    return leftMin + rightMin + 1
  } else {
    // 左右都都不为空时，返回较小的树高度 + 自己的本身节点
    return Math.min(leftMin, rightMin) + 1;
  }
};
```


方法2: 迭代法- queue + {node, depth}节点结构  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function minDepth(root: TreeNode | null): number {
  if (!root) return 0
  let queue = [{node: root, depth: 1}]
  while (queue.length) {
    const { node, depth } = queue.shift()
    if (!node.left && !node.right) {
      return depth
    } 
    if (node.left) {
      queue.push( {node: node.left, depth: depth + 1})
    } 
    if (node.right) {
      queue.push( {node: node.right, depth: depth + 1})
    }
  }
};
```