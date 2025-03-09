# LeetCode94- 二叉树的中序遍历


1 思维关键词: 
  - 方法1: 栈循环 + {action, node}节点法 / visited记录法
  - 方法2: DFS==> 中序递归 + inorder(root, res)
  - 方法4: Morris遍历法==> cur + cur.left + pre构造连接
  

2 参考文档

[01 方法1参考](https://leetcode.cn/problems/binary-tree-inorder-traversal/solution/yan-se-biao-ji-fa-yi-chong-tong-yong-qie-jian-ming/)

[02 方法2/3参考](https://leetcode.cn/problems/binary-tree-inorder-traversal/solution/dong-hua-yan-shi-94-er-cha-shu-de-zhong-xu-bian-li/)

[03 方法4参考](https://leetcode.cn/problems/binary-tree-inorder-traversal/solution/er-cha-shu-de-zhong-xu-bian-li-by-leetcode-solutio/)

## 代码实现

方法1.1: 迭代-action模拟递归法  时间复杂度 O(n)  空间复杂度：O(n)

```ts
type actionType = {type: 'go' | 'print', node: TreeNode | null}

function inorderTraversal(root: TreeNode | null): number[] {
  if (!root) return []
  let stack = [ { action: 'go', node: root } ], res = []
  while (stack.length) {
    const { action, node } = stack.pop()
    if (!node) continue;

    if (action === 'print') {
      res.push(node.val)
    } else {
      stack.push({ action: 'go', node: node.right })
      stack.push({ action: 'print', node: node })
      stack.push({ action: 'go', node: node.left })
    }
  }
  return res
};
```

方法1.2: 方法1的代码简化版本，思路是一样的
```ts
function inorderTraversal(root: TreeNode | null): number[] {
  if (!root) return []
  let stack = [root], res = []
  let visited = []

  while (stack.length) {
    let cur = stack.pop()
    if (!cur) continue;
    if (!visited.includes(cur)) {
      stack.push(cur.right, cur, cur.left)
      visited.push(cur)
    } else {
      res.push(cur.val)
    }
  }
  return res
};
```

方法2: 递归实现  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function inorderTraversal(root: TreeNode | null): number[] {
  let res = []
  inorder(root, res)
  return res
};

function inorder(node: TreeNode | null, res: number[]) {
  if (!node) return
  inorder(node.left, res)
  res.push(node.val)
  inorder(node.right, res)
}
```

方法3: 迭代实现- 经典实现方式   时间复杂度 O(n)  空间复杂度：O(n)
```ts
function inorderTraversal(root: TreeNode | null): number[] {
  let res = [], stack:TreeNode[] = []
  while (root || stack.length) {
    if(root) {
      stack.push(root);
			root = root.left;
		} else {
      let cur = stack.pop();
			res.push(cur.val);
			root = cur.right;
		}
  }
  return res
};
```


方法4: 迭代实现- Morris遍历  时间复杂度 O(n)  空间复杂度：O(1)
```ts
// Morris遍历的实现原理
// 一个二叉树节点，在通过DFS时，都会被访问3次：左递开始--> 左归(右递开始) --> 右归
// Morris遍历本质: 在每个节点的左递阶段，通过pre.right->cur，来让树结构 链表顺序化

function inorderTraversal(root: TreeNode | null): number[] {
  if (!root) return []
  let res = []
  let pre = null, cur = root
  while (cur) {
    if (!cur.left) {
      // 左归阶段
      res.push(cur.val)
      cur = cur.right
    } else {
      // 找到前驱节点
      pre = cur.left
      while (pre.right && pre.right !== cur) {
        pre = pre.right
      }
      // 其前驱节点不存在右子节点时，说明处于左递阶段
      // 创建连接关系 + 移动到下一层进行关系创建
      if (!pre.right) {
        pre.right = cur
        cur = cur.left
      } else {
        // 其前驱节点存在右子节点时，说明处于左归(右递开始)阶段
        // 断开连接关系 + 回到上一层父节点
        res.push(cur.val)
        pre.right = null
        cur = cur.right
      }
    }
  }
  return res
};
```
