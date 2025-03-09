class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class arrTobinaryTree {
  constructor(arr) {
    // 构建和原数组相同的树节点列表
    const treeNodeList = arr.length > 0 ? [] : null;

    // 把输入数值数组，先转化为二叉树节点列表
    for (let i = 0; i < arr.length; i++) {
      let node = null;
      if (arr[i] !== null) {
        node = new TreeNode(arr[i]);
      }
      treeNodeList.push(node);
      if (i == 0) {
        this.root = node;
      }
    }
    // 遍历一遍，根据规则左右孩子赋值就可以了
    for (let i = 0; i * 2 + 1 < arr.length; i++) {
      const node = treeNodeList[i];
      if (node) {
        // 线性存储转连式存储关键逻辑
        node.left = treeNodeList[2 * i + 1];
        //  再次判断下 不忽略任何一个节点
        if (i * 2 + 2 < arr.length) node.right = treeNodeList[2 * i + 2];
      }
    }
    return this.root;
  }
}

// 实现代码
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




// 调用入口
const arr = [5,3,6,2,4,null,null,1]
const root = new arrTobinaryTree(arr);
// 功能代码
const res = lowestCommonAncestor(root, 3);
console.log(res);