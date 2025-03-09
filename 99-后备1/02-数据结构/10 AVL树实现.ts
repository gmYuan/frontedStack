/**
 * AVLTree
 *  解决问题：二分搜索树的 不平衡问题，避免二分搜索树退化成一个链表结构；
 *  解决目标：二分搜索树 转化为 ==> 二分搜索树 + 平衡二叉树(任意一个节点，其左右子树的高度差 都满足 <= 1)
 *
 *  实现原理：
 *   ![高度差/平衡因子](https://gitee.com/ygming/blog-img/raw/master/img/AVL1.jpeg)
 *   ![右旋操作](https://gitee.com/ygming/blog-img/raw/master/img/AVL2.jpeg)
 *
 *  实现流程：
 *     S1 记录每个节点的高度 + 新增节点时，更新每个节点的高度
 *     S2 新增节点时，计算树中每个节点的平衡因子a(节点 左右子树的高度差)，当a >=2时，说明需要 进行优化；
 *          在新增节点 进行计算的原因是，只有在新增时，才会造成 节点左右子树的高度变化
 *
 *     S3 当LL偏移时，进行右旋操作：newParent.right = oldParent + oldParent.left =  oldRight
 *     S4 当LR偏移时，先进行左旋，再进行右旋即可； 剩余RR和RL同理
 * 
 *     NS5 删除节点时，也需要维护树为 平衡二叉树
 *         NS5.1  获取删除了节点后的 待返回的 根节点retNode
 *         NS5.2 更新retNode的 高度 + 计算平衡因子 + 旋转维持平衡状态
 *
 *
 */

class node {
  key: any;
  value: any;
  left: node;
  right: node;
  height: number;
  constructor(key = null, value = null, left = null, right = null) {
    this.key = key;
    this.value = value;
    this.left = left;
    this.right = right;
    this.height = 1;
  }
}

class AVLTree {
  root: node;
  size: number;

  constructor() {
    this.root = null;
    this.size = 0;
  }
  // S1
  getSize() {
    return this.size;
  }
  // S2
  isEmpty() {
    return this.size === 0;
  }

  // 判断该二叉树是否是一棵二分搜索树：中序遍历按升序排列
  private isBST() {
    let keys = [];
    this.inOrder(this.root, keys);
    for (let i = 1; i < keys.length; i++) {
      if (keys[i - 1] > keys[i]) {
        return false;
      }
    }
    return true;
  }

  private inOrder(node, keys) {
    if (node == null) return;
    this.inOrder(node.left, keys);
    keys.push(node.key);
    this.inOrder(node.right, keys);
  }

  // 判断该二叉树是否是一棵平衡二叉树
  private isBalanced() {
    return this.innerIsBalanced(this.root);
  }

  // 判断以Node为根的二叉树是否是一棵平衡二叉树，递归算法
  private innerIsBalanced(node) {
    if (node == null) return true;
    const balFactor = this.getBalanceFactor(node);
    if (Math.abs(balFactor) > 1) return false;

    return this.innerIsBalanced(node.left) && this.innerIsBalanced(node.right);
  }

  // 获得节点node的高度
  private getHeight(node) {
    if (node == null) return 0;
    return node.height;
  }

  // 获得节点node的平衡因子
  private getBalanceFactor(node) {
    if (node == null) return 0;
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

	// 对节点y进行右旋操作，返回旋转后新的根节点x
  //        y                                     x
  //       / \                                  /   \
  //      x   T4     向右旋转 (y)        z     y
  //     / \       - - - - - - - ->    / \   / \
  //    z   T3                            T1  T2 T3 T4
  //   / \
  // T1   T2
	private rightRotate(oldParent: node) {
		const newParent = oldParent.left
		const oldRight = newParent.right

		// 向右旋转过程
		newParent.right = oldParent
		oldParent.left = oldRight

		// 更新 涉及更改节点的 Height
		oldParent.height = Math.max( this.getHeight(oldParent.left), this.getHeight(oldParent.right) ) + 1
		newParent.height = Math.max( this.getHeight(newParent.left), this.getHeight(newParent.right) ) + 1
		
		// 返回新的父节点
		return newParent
	} 

	// 对节点y进行左旋操作，返回旋转后新的根节点x
	//    y                                      x
    //  /  \                                /   \
    // T1   x      向左旋转 (y)       y       z
    //     / \   - - - - - - - ->  / \    / \
    //   T2  z                          T1 T2 T3 T4
    //      / \
    //     T3 T4
	private leftRotate(oldParent: node) {
		const newParent = oldParent.right
		const oldLeft = newParent.left
		// 左旋转
		newParent.left = oldParent
		oldParent.right = oldLeft
		// 更新Height
		newParent.height = Math.max( this.getHeight(newParent.left), this.getHeight(newParent.right) ) + 1
		oldParent.height = Math.max( this.getHeight(oldParent.left), this.getHeight(oldParent.right) ) + 1
    // 返回新的根节点
		return newParent
	}



  // S3 node为null时返回新增node + 递归更新 node.left/node.right
  add(key, value) {
    this.root = this.innerAdd(this.root, key, value);
  }
  //  返回node2根节点
  innerAdd(node2: node, key: any, value: any) {
    if (node2 == null) {
      // 不要忘记更新 size值
      this.size++;
      return new node(key, value);
    }

    if (key < node2.key) {
      node2.left = this.innerAdd(node2.left, key, value);
    } else if (key > node2.key) {
      node2.right = this.innerAdd(node2.right, key, value);
    } else {
      node2.value = value;
    }

    //NS1 新增节点时，更新每个节点的高度
    node2.height = Math.max(this.getHeight(node2.left), this.getHeight(node2.right)) + 1;
    //NS2 计算树中每个节点的平衡因子a(节点 左右子树的高度差)
    const balFactor = this.getBalanceFactor(node2);
    //NS3 LL倾斜，进行右旋转
    if (balFactor > 1 && this.getBalanceFactor(node2.left) >= 0) {
      return this.rightRotate(node2)
    }
    // LR倾斜，先进行左旋转，再进行右旋转
    if (balFactor > 1 && this.getBalanceFactor(node2.left) < 0) {
      node2.left = this.leftRotate(node2.left)
      return this.rightRotate(node2)
    }
		// RR倾斜，进行左旋转
		if (balFactor < -1 && this.getBalanceFactor(node2.right) >= 0) {
			return this.leftRotate(node2)
		}
    // RL倾斜，先进行右旋转，再进行左旋转
		if (balFactor < -1 && this.getBalanceFactor(node2.right) < 0) {
      node2.right = this.rightRotate(node2.right)
			return this.leftRotate(node2)
		}

    return node2;
  }

  //S4  返回以node2为根节点的二分搜索树中，key所在的节点
  getNode(node2: node, key: any) {
    if (node2 == null) {
      return;
    }
    if (key < node2.key) {
      // 没有return的话，默认返回值就是undefined
      return this.getNode(node2.left, key);
    } else if (key > node2.key) {
      return this.getNode(node2.right, key);
    } else {
      return node2;
    }
  }

  contains(key) {
    const curNode = this.getNode(this.root, key);
    return !!curNode;
  }

  get(key) {
    const curNode = this.getNode(this.root, key);
    return curNode.value;
  }

  set(key, value) {
    const curNode = this.getNode(this.root, key);
    if (!curNode) {
      throw new Error("key 不存在");
    }
    curNode.value = value;
  }

  //S5 从二分搜索树中删除键为key的节点, 返回值为该节点的值
  remove(key) {
    // S5.1 是否存在待删除节点
    const curNode = this.getNode(this.root, key);
    if (!curNode) {
      return null;
    }

    this.root = this.innerRemove(this.root, key);
    return curNode.value;
  }

  //S5.2 返回删除了目标节点的 根节点
  innerRemove(node2, key): node {
    if (node2 == null) {
      return null;
    }

    let retNode
    if (key < node2.key) {
      node2.left = this.innerRemove(node2.left, key);
      // return node2
      retNode = node2
    } else if (key > node2.key) {
      node2.right = this.innerRemove(node2.right, key);
      // return node2
      retNode = node2
    } else {
      //S5.3 相等情况: 讨论是单子节点 还是  双子节点
      if (node2.left == null) {
        const rightNode = node2.right;
        node2.right = null;
        this.size--;
        // 单子节点直接返回 该子节点即可
        // return rightNode

        retNode = rightNode
      } else if (node2.right == null) {
        const leftNode = node2.left
        node2.left = null
        this.size--
        // return leftNode

        retNode = leftNode
      } else {
        //S5.4  双子节点: 找到右子树中的 最小节点 + 用这个节点顶替待删除节点的位置
        const successor = this.minNode(node2.right)
        successor.left = node2.left
        // successor.right = this.removeMin(node2.right)

        // removeMin的时候没有维护平衡，所以改成使用innerRemove(node, key)
        successor.right = this.innerRemove(node2.right, successor.key)


        node2.left = node2.right = null
        // return successor

        retNode = successor
      }
    }
    // 防止返回的是之前的 叶子节点
    if (retNode == null) return null
    // 更新height
    retNode.height = 1 + Math.max( this.getHeight(retNode.left), this.getHeight(retNode.right) )
    // 计算平衡因子
    const balanceFactor = this.getBalanceFactor(retNode)
    // 平衡维护
    // LL
    if ( balanceFactor > 1 && this.getBalanceFactor(retNode.left) >= 0) {
      return this.rightRotate(retNode)
    }
    // RR
    if (balanceFactor < -1 && this.getBalanceFactor(retNode.right) <= 0) {
      return this.leftRotate(retNode)
    }
    // LR
    if ( balanceFactor > 1 && this.getBalanceFactor(retNode.left) < 0) {
      retNode.left = this.leftRotate(retNode.left)
      return this.rightRotate(retNode)
    }
    // RL
    if (balanceFactor < -1 && this.getBalanceFactor(retNode.right) > 0) {
      retNode.right = this.rightRotate(retNode.right)
      return this.leftRotate(retNode)
    }

    return retNode;
  }

  //S5.5  返回以node3为根的 二分搜索树的最小值  所在的节点
  minNode(node3): node {
    if (node3.left == null) {
      return node3;
    }
    return this.minNode(node3.left);
  }

  //S5.6 删除以node3为根的二分搜索树中的最小节点, 返回删除节点后的 新的二分搜索树的根
  removeMin(node3): node {
    if (node3 == null) return null;
    if (node3.left == null) {
      const rightNode = node3.right;
      node3.right = null;
      this.size--;
      return rightNode;
    }
    node3.left = this.removeMin(node3.left);
    return node3;
  }
}
