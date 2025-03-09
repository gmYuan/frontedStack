/**
 * 二分搜索树
 * 功能：实现二分搜索数结构的 增删改查
 *
 * S1 构建节点基本结构：key+value +left+right + 初始化根节点root
 *
 * S2 insert(node, key, value)：通过比较key，来确定新增节点 在node的左分支/右分支
 * S3 search(key) / contains(key)：基本思路同insert
 *
 * S4 深度优先遍历：前序/中序/后序遍历-- 递归实现
 * S5 广度优先/层序遍历：队列 + 依次出队&处理当前节点
 *
 * S6 获取最值节点的key：递归找到最左分支节/最右分支节点
 * S7 删除最值节点：递归找到最左分支节/最右分支节点 + 使用其右子节点/左子节点
 * S8 删除节点：获取后继节点s + 分别设置s.left和s.right + 删除目标节点
 *
 **/

class TNode {
  data: number | undefined;
  left: TNode;
  right: TNode;
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class BST {
  root: TNode | null;
  size: number;
  constructor() {
    this.root = null;
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  // 向二分搜索树中添加元素
  // 因为使用时只会传入data值，所以需要用addNodeImp来内部创建 二分搜索树的节点结构
  addNode(data) {
    this.root = this.addNodeImp(this.root, data);
  }

  // 向 以node为根的二分搜索树中 插入元素
  // 返回插入新节点后 二分搜索树的根
  addNodeImp(node, data) {
    if (node == null) {
      this.size++;
      return new node(data);
    }
    // 当前值小于node节点值，加入为 左孩子节点
    if (data < node.data) {
      node.left = this.addNodeImp(node.left, data);
    } else if (data > node.data) {
      node.right = this.addNodeImp(node.right, data);
    }
    return node;
  }

  // 检测树中是否存在data值
  contains(data) {
    this.containsImp(this.root, data);
  }

  // 检测 以node为根的二分搜索树中 是否存在data值, 递归算法
  containsImp(node, data) {
    if (node == null) return false;
    if (node.data === data) return true;
    if (data < node.data) {
      return this.containsImp(node.left, data);
    } else {
      return this.containsImp(node.right, data);
    }
  }

  // 前序遍历，递归实现: 先处理节点A，再分别处理其左右子节点
  preOrder() {
    this.preOrderImp(this.root);
  }

  preOrderImp(node) {
    if (node == null) return;
    console.log("前序遍历的元素是", node.data);
    this.preOrderImp(node.left);
    this.preOrderImp(node.right);
  }

  // 中序遍历，递归实现: 先处理节点A的左子节点，再处理节点A，最后处理节点A的右子节点
  // 中序遍历的特点: 其输出结果是 从小到大排序的
  inOrder() {
    this.inOrderImp(this.root);
  }

  inOrderImp(node) {
    if (node == null) return;
    this.inOrderImp(node.left);
    console.log("中序遍历的元素是", node.data);
    this.inOrderImp(node.right);
  }

  // 后序遍历，递归实现: 先处理节点A的左子节点，再处理节点A的右子节点，最后处理节点A
  postOrder() {
    this.postOrderImp(this.root);
  }

  postOrderImp(node) {
    if (node == null) return;
    this.postOrderImp(node.left);
    this.postOrderImp(node.right);
    console.log("后序遍历的元素是", node.data);
  }

  // 前序遍历非递归实现: 利用栈 + 循环判断栈非空
  preOrderNR() {
    let stack = [];
    stack.push(this.root);
    while (stack.length) {
      const curNode = stack.pop();
      // 前序处理当前节点
      console.log("当前节点是", curNode.data);
      // 先右节点 后左节点，因为栈是后进先出
      if (curNode.right) stack.push(curNode.right);
      if (curNode.left) stack.push(curNode.left);
    }
  }

  // 层序遍历
  levelOrder() {
    if (!this.root) return;
    let queue = [];
    queue.push(this.root);
    while (queue.length) {
      const curNode = queue.shift();
      // 处理当前节点
      console.log("当前节点是", curNode.data);
      if (curNode.left) queue.push(curNode.left);
      if (curNode.right) queue.push(curNode.right);
    }
  }

  // 获取 BST最小值节点对应的 data/val
  getMinVal() {
    if (this.size === 0) throw new Error("BST is empty");
    const minVal = this.getMinNode(this.root)?.data;
    return minVal;
  }
  // 获取 BST最小值节点
  getMinNode(node) {
    // 根据BST的定义，最小值一定是在树的最左侧节点
    if (!node.left) return node;
    return this.getMinNode(node.left);
  }

  // 获取 BST最大值节点对应的 data/val
  getMaxVal() {
    if (this.size === 0) throw new Error("BST is empty");
    const maxVal = this.getMaxNode(this.root)?.data;
    return maxVal;
  }
  // 获取 BST最大值节点
  getMaxNode(node) {
    // 根据BST的定义，最大值一定是在树的最右侧节点
    if (!node.right) return node;
    return this.getMaxNode(node.right);
  }

  // 删除最小值节点
  removeMinNode() {
    if (!this.root) return;
    const res = this.getMinVal();
    // 易错点3: 返回的新头节点要连接到 BST根节点中
    this.root = this.removeMinImp(this.root);
    return res;
  }
  // 递归实现 删除最小值节点, 返回删除后的 新头节点
  removeMinImp(node) {
    if (!node.left) {
      const retRight = node.right;
      // 易错点1: 找到最小节点后，让它的右节点 保存返回并置空
      node.right = null;
      // 易错点2: 只有找到最小节点后，才减少size，而不能每次递归都减少size
      this.size--;
      // 返回右子节点
      return retRight;
    }
    node.left = this.removeMinImp(node.left);
    return node;
  }

  // 删除最大值节点
  removeMax() {
    if (!this.root) return;
    const res = this.getMaxVal();
    this.root = this.removeMaxImp(this.root);
    return res;
  }

  // 递归实现 删除最大值节点, 返回删除后的 新头节点
  removeMaxImp(node) {
    if (!node.right) {
      const retLeft = node.left;
      node.left = null;
      this.size--;
      return retLeft;
    }
    node.right = this.removeMaxImp(node.right);
    return node;
  }

  // 删除节点值等于val的第一个节点
  remove(val) {
    if (!this.root) return null;
    this.root = this.removeImp(this.root, val);
  }

  // 删除以node为根的BST中, 值为val的第一个节点
  // 返回删除后的新的头节点
  removeImp(node, val) {
    if (!node) return null;
    if (node.data === val) {
      // 只有右子树的情况
      if (!node.left) {
        const rightNode = node.right;
        node.right = null;
        this.size--;
        return rightNode;
      } else if (!node.right) {
        // 只有左子树的情况
        const leftNode = node.left;
        node.left = null;
        this.size--;
        return leftNode;
      } else {
        // 左右子树都存在的情况: 寻找后继/前驱 节点
        const successor = this.getMinNode(node.right);
        successor.left = node.left;
        successor.right = this.removeMinImp(node.right);
        // 易错点2: 这里不需要多余的this.size--，因为在removeMinImp里已经减过了
        node.left = node.right = null;
        return successor;
      }
    } else if (node.data > val) {
      // 易错点1: 需要注意要把 子树头节点连接给 父节点
      node.left = this.removeImp(node.left, val);
      return node;
    } else if (node.data < val) {
      node.right = this.removeImp(node.right, val);
      return node;
    }
  }
}

// 实例
const bst = new BST();
const nums = [5, 3, 6, 8, 4, 2];
for (const num of nums) {
  bst.addNode(num);
}
//    5
//   / \
//   3  6
//  / \  \
//  2  4   8

bst.preOrder(); // 5 3 2 4 6 8
