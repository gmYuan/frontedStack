/**

参照 BST的实现思路, 实现Map

BSTMap 
  node(key, value, left, right)

  size
    - getSize()
    - isEmpty()

  add(key,value)：node为null时返回新增node + 递归更新 node.left/node.right
  getNode(node, key)： node为null时 返回null + 递归二分查找 node.left/node.right  ==> contains(key)/get/set(key)
  remove(key): node为null时 返回null + 递归查找 node.left/node.right/相等情况 + 相等时区分 单子节点 和 双子节点


**/

export {};

class TNode {
  key: any;
  value: any;
  left: TNode | null;
  right: TNode | null;
  constructor(key = null, value = null, left = null, right = null) {
    this.key = key;
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BSTMap {
  root: TNode | null;
  size: number;
  constructor() {
    this.root = null;
    this.size = 0;
  }

  getSize() {
    return this.size
  }

  isEmpty() {
    return this.size === 0
  }

  // 向 BSTMap 中添加元素
  add(key, value) {
    this.root = this.addImp(this.root, key, value);
  }

  // addImp：递归算法， 向 以node为根的BSTMap中 添加元素
  addImp(node, key, value) {
    // 递归中止条件
    if (node == null) {
      this.size++;
      return new TNode(key, value);
    }
    // 如果key小于node.key，则向左子树添加
    if (key < node.key) {
      node.left = this.addImp(node.left, key, value);
    } else if (key > node.key) {
      node.right = this.addImp(node.right, key, value);
    } else {
      // 如果key相等，则更新value
      node.value = value;
    }
    return node;
  }


  // 返回以node为根节点的二分搜索树中，key所在的节点
  getNode(node: TNode, key: any) {
    if (node == null) return null;
    if (key < node.key) {
      return this.getNode(node.left, key)
    } else if (key > node.key) {
      return this.getNode(node.right, key)
    } else {
      return node
    }
  }

  contains(key) {
    return this.getNode(this.root, key) !== null
  }

  get(key) {
    const curNode = this.getNode(this.root, key)
    return  curNode ? curNode.value : null
  }

  set(key, value) {
    const curNode = this.getNode(this.root, key)
    if (!curNode) {
      throw new Error('key 不存在')
    }
    curNode.value = value
  }

  // 返回以node为根的BST的 最小值所在的节点
  getMin(node: TNode) {
    if (!node || !node.left) return node;
    return this.getMin(node.left)
  }

  // 删除以node为根的BST的 最小节点
  // 返回 删除最小节点后 新的BST的根
  removeMin(node: TNode) {
    if (node == null) return null;
    // 递归中止条件: 找不到左叶子节点，则返回这个节点的右子树头节点
    if (!node.left) {
      const rNode = node.right
      node.right = null
      this.size--
      return rNode
    }
    node.left = this.removeMin(node.left)
    return node
  }

  // 删除以node为根的BST中 key对应的节点
  // 返回 删除节点key 对应的 value
  remove(key) {
    const curNode = this.getNode(this.root, key)
    if (!curNode) return null;

    this.root = this.removeImp(this.root, key)
    return curNode.value
  }
  
  // 删除以node为根的BST中 key对应的节点
  removeImp(node: TNode, key: any) {
    if (!node) return null;

    if (key < node.key) {
      node.left = this.removeImp(node.left, key)
      return node
    } else if (key > node.key) {
      node.right = this.removeImp(node.right, key)
      return node
    } else {
      //相等情况: 讨论是单子节点 还是  双子节点
      if (!node.left) {
        const rNode = node.right
        node.right = null
        this.size--
        return rNode
      } else if (!node.right) {
        const lNode = node.left
        node.left = null
        this.size--
        return lNode
      } else {
        // 双子节点: 找到右子树中的 最小节点 + 用这个节点顶替待删除节点的位置
        // 从而 仍然保持 BST的性质
        const successor = this.getMin(node.right)
        successor.left = node.left
        successor.right = this.removeMin(node.right)
        node.left = node.right = null
        return successor
      }
    }
  }
}
