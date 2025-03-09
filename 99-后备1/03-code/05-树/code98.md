# LeetCode98- 验证二叉搜索树

1 思维关键词:
  - 方法1: 中序遍历 + 判断是否是升序排列
  - 方法2: dfs + 搜索树性质(min/max判断)
  - 方法3: pre + 中序递归方法
  - 方法4: 3个栈 模拟dfs + min/max
 

2 参考文档

[01 代码参考文档](https://github.com/liuyubobobo/Play-Leetcode/tree/master/0001-0500/0098-Validate-Binary-Search-Tree/java-0098/src)


## 代码实现

1 方法1: 中序遍历 + 判断是否是升序排列  时间复杂度: O(n)  空间复杂度: O(n)

```ts
function isValidBST(root: TreeNode | null): boolean {
  if (!root) return true
  let sorted = []
  inOrder(root, sorted)
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i+1] <= sorted[i]) return false
  }
  return true
};

function inOrder(node, list) {
  if (!node) return;
  inOrder(node.left, list)
  list.push(node.val)
  inOrder(node.right, list)
} 
```

2 方法2 dfs + 搜索树性质(min/max判断)  时间复杂度: O(n)  空间复杂度:O(h)

```ts
function isValidBST(root: TreeNode | null): boolean {
 return dfs(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
};

function dfs(node, min, max) {
  if (!node) return true;
  if (node.val < min || node.val > max) return false;
  // 以下部分是优化剪枝，用于提前判断
  if (node.left && node.left.val >= node.val) return false
  if (node.right && node.right.val <= node.val) return false
  // 返回结果
  return dfs(node.left, min, node.val - 1) && dfs(node.right, node.val + 1, max)
} 
```

3 方法3 pre + 中序递归方法  时间复杂度: O(n)  空间复杂度:O(h)

```ts
let pre = null;

function isValidBST(root: TreeNode | null): boolean {
  return inOrder(root);
};

function inOrder(node) {
  if(!node) return true;
  // 如果向下递归时有不满足性质的情况，就得一路返回false传上去，从而避免结果丢失
  // 中序递归
  if(!inOrder(node.left)) { return false }
  // 如果当前值比 上一个中序递归的节点值小，就不满足搜索树性质
  if(pre && node.val <= pre) { return false}
  // 中序递归，每遇到一个节点就更新 其pre节点
  pre = node.val;
  // 判断右子树是否满足 搜索树性质
  if(!inOrder(node.right)) { return false }
  // 如果整个树都满足性质，则返回真
  return true;
}
```

4 方法4 3个栈 模拟dfs + min/max  时间复杂度: O(n)  空间复杂度:O(h)

```ts
function isValidBST(root: TreeNode | null): boolean {
  if (!root) return true;
  let stack = [], lower = [], upper = []
  stack.push(root)
  lower.push(Number.MIN_SAFE_INTEGER)
  upper.push(Number.MAX_SAFE_INTEGER)
  // 通过3个栈 模拟dfs + min/max
  while (stack.length) {
    const cur = stack.pop(), left = lower.pop(), right = upper.pop()
    if (cur.val <= left || cur.val >= right) return false;
    if (cur.right) {
      // 剪枝优化
      if (cur.val >= cur.right) return false;
      stack.push(cur.right)
      lower.push(cur.val)
      upper.push(right)
    } 
    if (cur.left) {
      // 剪枝优化
      if (cur.val <= cur.left) return false;
      stack.push(cur.left)
      lower.push(left)
      upper.push(cur.val)
    }
  }
  return true
};

```