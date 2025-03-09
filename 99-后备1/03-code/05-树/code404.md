# LeetCode404-  左叶子之和

1 思维关键词: 
  - 方法1: res相加 + 递归相加左右子树的左叶子节点值
  - 方法2: BFS + queue ==> 模拟DFS


2 参考文档

[01 官方实现参考](https://leetcode.cn/problems/sum-of-left-leaves/solutions/419103/zuo-xie-zi-zhi-he-by-leetcode-solution/)


## 代码实现

1 方法1-1: DFS: res相加 + 递归相加左右子树的左叶子节点值   时间复杂度: O(n);  空间复杂度: O(n)

```ts
function sumOfLeftLeaves(root: TreeNode | null): number {
  // 无根节点 或者 无叶子节点，直接返回0
  if (!root || (!root.left && !root.right)) return 0;
	return innerLeftSum(root)
};

function innerLeftSum(node) {
  // 易错点: 基本类型传参是值拷贝，所以需要在每次递归内部都定义res值
	let res = 0
  if (!node || (!node.left && !node.right)) return res;
  // 判断是左叶子节点，才记录它的值
  if (node.left && !node.left.left && !node.left.right) {
    res += node.left.val;
  }
  // 要加上其 左右子树的左叶子节点和
  res += innerLeftSum(node.left);
  res += innerLeftSum(node.right);
  return res;
}
```

2 方法1-2: DFS- 官方实现  时间复杂度: O(n);  空间复杂度: O(n)

```ts
function sumOfLeftLeaves(root: TreeNode | null): number {
  return root ? dfs(root) : 0;
};

function dfs(node) {
  let ans = 0;
  if (node.left) {
    // 对于左子节点: 如果已经是叶子节点，就加上它的值；否则继续向下子树查找
    ans += isLeaf(node.left) ? node.left.val : dfs(node.left)
  }
  if (node.right && !isLeaf(node.right)) {
    // 对于右子节点: 只要右子节点不是叶子节点时，就要继续向下子树查找
    ans += dfs(node.right);
  }
  return ans;
}

// 判断节点是否是 叶子节点
function isLeaf(node) {
  return !node.left && !node.right;
}
```


3 方法2：BFS + queue 模拟DFS  时间复杂度: O(n);  空间复杂度: O(n)
```ts
function sumOfLeftLeaves(root: TreeNode | null): number {
  if (!root) return 0;
  let queue = [root], ans = 0
  while(queue.length) {
    const node = queue.shift()
    if (node.left) {
      if (isLeaf(node.left)) {
        ans += node.left.val
      } else {
        queue.push(node.left)
      }
    }
    if (node.right) {
      // 在右节点情况下，如果是叶子节点直接返回即可；只有是非叶子节点才需要继续看其子节点情况
      if (!isLeaf(node.right)) {
        queue.push(node.right);
      }
    }
  }
  return ans;
};

// 判断节点是否是 叶子节点
function isLeaf(node) {
  return !node.left && !node.right;
}
```