# LeetCode236- 二叉树的最近公共祖先

1 思维关键词:
  - 方法1: 2次dfs + 回溯
  - 方法2: 单次dfs
  - 方法3: dfs + 累计mid值
  

2 参考文档

[01 直接参考文档](https://github.com/liuyubobobo/Play-Leetcode/tree/master/0001-0500/0236-Lowest-Common-Ancestor-of-a-Binary-Tree/cpp-0236)


## 代码实现

1 方法1: dfs + 回溯  时间复杂度: O(3n)  空间复杂度:  O(2n)

```ts
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  let path1 = [], path2 = [],res = null
  dfs(root, p, path1)
  dfs(root, q, path2)
  // 获取到目标节点路径后，由于是二叉树，所以可以按序查找父节点
  for (let i = 0; i < path1.length && i < path2.length; i++) {
    // 易错点，由于是查找最近公共祖先，所以需要一直遍历到结束，以保存最新结果
    if (path1[i] === path2[i]) res = path1[i];
    // 剪枝操作：如果前序节点有不相等的，那么肯定不是相同路径直接结束即可
    else break;
  }
  return res
};

// 通过深度递归 + 回溯，获取到目标节点的查找路径
function dfs(node, target, path) {
  if (!node) return false
  path.push(node)
  // 表示查找到了目标节点，可以返回不用继续向下递归了
  if (node === target) return true
  // 如果递归结果为真，说明目标节点在左/右子树下，一路向上返回即可
  if (dfs(node.left, target, path)) return true;
  if (dfs(node.right, target, path)) return true;
  // 到这里说明左右子树返回结果为假，从保存路径里 剔除当前节点(回溯) + 继续向上返回false即可
  path.pop()
  return false
}
```

方法2 单次dfs  时间复杂度: O(n)  空间复杂度:  O(n)

```ts
function lowestCommonAncestor(root, p, q) {
  if (!root) return null
  // 当找到p或者q后, 剩下的节点必然不可能是公共祖先节点
  // 所以可以向上返回,进入 归阶段了
  if (root === p || root === q) return root
  // 其实就是通过dfs，尝试在左/右子树中 查找p/q
  const left = lowestCommonAncestor(root.left, p, q)
  const right = lowestCommonAncestor(root.right, p, q)
  // 说明p、q分别在左右子树2侧(非同侧)
  // 由于递归阶段的归 是自底向上的，所以此时root必然就是他们的最短公共祖先
  if (left && right) {
    return root
  }
  // 到此说明p/q必然在同侧，由于我们一遇到p/q中在上层的那个就返回了
  // 所以此时left/right 必然就是同侧节点中在上面的那一个
  if (left) return left
  if (right) return right
  // 到此说明未查到p/q中的某个值，不存在其公共祖先，返回null即可
  return null
};
```

方法3 dfs + 累计mid值   时间复杂度: O(n)  空间复杂度:  O(n)

```ts
let ret = null
function lowestCommonAncestor(root, p, q) {
  // 在leetcode中需要显式定义值，否则会存在问题
  ret = null
  dfs(root, p, q)
  return ret  
}
// dfs: 在root中寻找p和q, 如果包含则返回1, 否则返回0
// root是p或者q; root的左子树包含p或q;  root的右子树包含p或q==> 三个条件有两个满足, 则ret=root
function dfs(root, p, q) {
  if (!root) return 0;
  let mid = 0
  // 当遇到p/q值，就记录一下遇到了1次
  if (root === p || root === q) mid = 1;
  let left = dfs(root.left, p, q)
  let right = dfs(root.right, p, q)
  // 只有>=2次，就可以认为找到了p&&q，因为题目保证了节点值每个都不相同
  // 易错点: 由于是自底向上"归"的，所以继续下第一个ret值即可，否则就是最远祖先节点了
  if (mid + left + right >= 2 && !ret) {
    ret = root
  }
  return mid + left + right
}
```