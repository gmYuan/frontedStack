# LeetCode230- 二叉搜索树中第K小的元素

1 思维关键词:
  - 方法1: 中序递归
  

2 参考文档

[01 参考文档](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/solutions/100614/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by--48/)

[02 官方文档实现](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/solutions/1050055/er-cha-sou-suo-shu-zhong-di-kxiao-de-yua-8o07/)


## 代码实现

1 方法1: 中序递归  时间复杂度: O(logn+k)/O(n+k)  空间复杂度: O(logn)/O(n)

```ts
let num = 0, res = -1

function kthSmallest(root: TreeNode | null, k: number): number {
  // leetcode中此题必须要重新赋值，否则会有问题
  num = 0
  inOrder(root, k)
  return res
};

function inOrder(node, k) {
  if (node === null) return;
  inOrder(node.left, k);
  // 中序递归的默认排序是升序排列的
  if (++num === k) res = node.val;
  inOrder(node.right, k);
}
```

