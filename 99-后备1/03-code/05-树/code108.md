# LeetCode108-将有序数组转换为二叉搜索树

1 思维关键词:
  - 方法1: mid查找 + 递归
  

2 参考文档

[01 官方参考文档](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/solutions/312607/jiang-you-xu-shu-zu-zhuan-huan-wei-er-cha-sou-s-33/)


## 代码实现

1 方法1: mid查找 + 递归   时间复杂度: O(logn)  空间复杂度: O(h)

```ts
function sortedArrayToBST(nums: number[]): TreeNode | null {
  if(!nums.length) return null
  return helper(nums, 0, nums.length-1)   
};

function helper(nums, left, right) {
  if (left > right) return null
  let mid = left + ((right - left) >> 1)
  const root = new TreeNode(nums[mid])
  root.left = helper(nums, left, mid-1)
  root.right = helper(nums, mid + 1, right)
  return root
}
```

