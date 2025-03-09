# LeetCode144- 二叉树的前序遍历

## 实现思路

1 思维关键词: 
  - 方法1: 栈循环 + {command, node}节点法
  - 方法2: DFS==> 前序递归 + innerPre(root, res)
  - 方法3: Morris遍历法==> cur + cur.left + pre构造连接
  

2 参考文档

[01 方法1和方法3参考](https://leetcode.cn/problems/binary-tree-preorder-traversal/solution/leetcodesuan-fa-xiu-lian-dong-hua-yan-shi-xbian-2/)

[02 方法2参考](https://leetcode.cn/problems/binary-tree-preorder-traversal/solution/cer-cha-shu-san-chong-bian-li-qian-zhong-erk2/)


## 代码实现

方法1: 迭代法  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function preorderTraversal(root: TreeNode | null): number[] {
  if (!root) return []
  let stack = [{action: 'go', node: root}], res = []

  while (stack.length) {
    const { action, node } = stack.pop()
    if (!node) continue;

    if (action === 'print') {
      res.push(node.val)
    } else {
      stack.push({ action: 'go', node: node.right })
      stack.push({ action: 'go', node: node.left })
      stack.push({ action: 'print', node: node })
    }
  }
  return res
};
```

方法2: 递归法  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function preorderTraversal(root: TreeNode | null): number[] {
  if (!root) return []
  let res = []
  innerPre(root, res)
  return res
};

function innerPre(node: TreeNode | null, res: number[]) {
  res.push(node.val)
  if (node.left) {
    innerPre(node.left, res)
  }
  if (node.right) {
    innerPre(node.right, res)
  }
}
```

方法3 Morris遍历法   时间复杂度 O(n)  空间复杂度：O(1)

```ts
/**
 *  Morris遍历的实现原理：
 *   S1 一个二叉树节点，在通过DFS时，都会被访问3次：左递开始--> 左归(右递开始) --> 右归
 *   S2 Morris遍历本质: 在每个节点的左递阶段，通过pre.right->cur，来让树结构 链表顺序化

 * Morris遍历的流程：
  左递阶段:
 *   S1 寻找当前节点的前继节点: 当前节点cur==> 找到左节点cur.left ==> pre是左子树的最右节点
 *   S2 构造链表化连接关系 + 更新cur为下一层结构: pre.right = cur 同时 cur = cur.left
 *  
 *   S3 只要cur有左孩子，就一直重复上述2步: 找cur的前继节点pre + 构建链表关系 + 更新cur
 *   通过以上步骤，就确保了 每一层子树的pre.right必然指向了其父节点
 * 
 * 左归(右递开始)阶段:
 *   S4 当cur.left为空时，说明递进到了最下一层左子节点，此时必然可以通过cur.right向上一层找到
 *   其父节点，即 cur = cur.right
 * 
 *   S5 继续重复找cur的前继节点pre，此时pre.right已经连接了cur，表明此时已经不是左递阶段，而
 *   是左归阶段，让cur = cur.right，进入右递开始阶段
 * 
 *   S6 重复以上步骤，进入右子树的左递和左归阶段
 *  */ 

function preorderTraversal(root: TreeNode | null): number[] {
  if (!root) return []
  let res = []
  let pre = null, cur = root
  // 最外层while保证会处理完所有节点
  while (cur) {
    if (!cur.left) {
       // 最下层叶子节点
      res.push(cur.val)
      cur = cur.right
    } else {
      pre = cur.left
      // S1 左递阶段，寻找前继节点，注意pre.right不能等于cur
      while (pre.right && pre.right !== cur) {
        pre = pre.right
      }
      // S2 左递阶段，构造链表结构连接关系 + 更新cur到下一层
      if (!pre.right) {
        res.push(cur.val)
        pre.right = cur
        cur = cur.left
      // S3 左归阶段，断开链表连接 + 更新cur到上一层，开始右递阶段
      } else {
        pre.right = null
        cur = cur.right
      }
    }
  }
  return res 
};
```