# LeetCode145- 二叉树的后序遍历


1 思维关键词: 
  - 方法1: 栈循环 + {action, node}节点法 / visited记录法
  - 方法2: DFS==> 后序递归 + innerPost(root, res)
  - 方法3: Morris遍历法==> 后续遍历过于复杂，了解即可
  
2 参考文档:

[01 方法1参考](https://leetcode.cn/problems/binary-tree-inorder-traversal/solution/yan-se-biao-ji-fa-yi-chong-tong-yong-qie-jian-ming/)

[02 方法2参考](https://leetcode.cn/problems/binary-tree-postorder-traversal/solution/a-li-mian-shi-ti-zhi-yong-zhan-qu-zuo-er-cha-shu-d/)

[03 Morris方法图解](https://leetcode.cn/problems/binary-tree-postorder-traversal/solutions/33827/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by--34/)


## 代码实现

方法1.1: 迭代-action模拟递归法  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function postorderTraversal(root: TreeNode | null): number[] {
  if (!root) return []
  let res = [], stack = [ {action: 'go', node: root}]
  while (stack.length) {
    const { action, node } = stack.pop()
    if (!node) continue;
    if (action === 'print') {
      res.push(node.val)
    } else {
      stack.push( { action: 'print', node: node})
      stack.push( { action: 'go', node: node.right})
      stack.push( { action: 'go', node: node.left})
    }
  }
  return res
}
```

方法1.2: 迭代法- visited标记法  时间复杂度 O(n)  空间复杂度: O(n)

```ts
function postorderTraversal(root: TreeNode | null): number[] {
  if (!root) return []
  let visited = new Set()
  let res = [], stack = [root]
  while (stack.length) {
    let cur = stack.pop()
    if (!cur) continue
    if (!visited.has(cur)) {
      stack.push(cur, cur.right, cur.left)
      visited.add(cur)
    } else {
      res.push(cur.val)
    }
  }
  return res
};
```

方法2: 递归法  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function postorderTraversal(root: TreeNode | null): number[] {
  let res = []
  innerPost(res, root)
  return res
};

function innerPost(res: number[], node: TreeNode | null) {
  if (!node) return 
  innerPost(res, node.left)
  innerPost(res, node.right)
  res.push(node.val)
}
```
