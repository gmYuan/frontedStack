# LeetCode450- 删除二叉搜索树中的节点

1 思维关键词:
  - 方法1: 递归 + 查找&删除 后继节点
  

2 参考文档

[01 方法1参考文档](https://leetcode.cn/problems/delete-node-in-a-bst/solutions/16157/yong-qian-qu-huo-zhe-hou-ji-jie-dian-zi-shu-dai-ti/)


## 代码实现

1 方法1: 递归 + 查找&删除 后继节点   时间复杂度: O(logn)  空间复杂度: O(h)

```ts
function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  if (!root) return null
  // 查找值小于当前节点值，则进入左子树去查找删除
  if (key < root.val) {
    root.left = deleteNode(root.left, key)
    return root
  // 查找值大于当前节点值，则进入左子树去查找删除
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key)
    return root
  }
  // 此时必然是key === node.val的情况
  if (!root.left) return root.right
  if (!root.right) return root.left
  // 此时该节点必然是 同时存在左右子节点
  // 查找当前节点的后继节点，即当前节点 右子树中的最小值
  let successor = root.right
  while (successor.left) {
    successor = successor.left
  }
  // 用后继节点值覆盖当前节点值
  root.val = successor.val
  // 删除掉当前节点的 右子树中的后继节点
  root.right = delMinNode(root.right)
  return root
};

function delMinNode(root) {
  // 如果节点不存在左节点了，说明已经找到了最左节点，直接返回其右子节点即可
  if (!root.left) return root.right
  root.left = delMinNode(root.left)
  return root
}
```

