/**
 *  2-3Tree
 *  解决目标：不平衡的二分搜索树 ==> 绝对的平衡二叉树(任意一个节点，其左右子树的高度差 都满足 <= 0)
 *
 *  实现原理：
 *    R1 合：2-3树加入新元素时，不会加入到空节点中，而是加入到 其父节点（该父节点是一个 非空叶子节点），
 *               形成一个 3节点/临时4节点；
 *    R2 拆： 当一个节点形成了 临时4节点时，就要拆分成一个由 3个2节点 组成的二分搜索树； 
 *    
 *    R3 上合：拆成的二分搜索树 不满足绝对平衡时，其根节点会向上合并到其父节点 P，形成一个 3节点/临时4节点
 *    R4 拆：当P形成了 临时4节点时，又会继续 下拆，循环 合-拆过程.....
 * 
 *    即 一个节点会一直合并元素，直到形成 临时4节点 + 每次拆，都会洗牌该节点，形成一个 2节点的二叉树
 * 
 *   ![2-3树原理1](https://gitee.com/ygming/blog-img/raw/master/img/2-3%E6%A0%91%E5%8E%9F%E7%90%861.jpeg)
 *   ![2-3树原理2](https://gitee.com/ygming/blog-img/raw/master/img/2-3%E6%A0%91%E5%8E%9F%E7%90%862.jpeg)
 * 
 * 
 * 红黑树
 * 
 * 解决目标：保持黑节点是绝对平衡的/保持“黑平衡”的  二分搜索树
 * 
 * 特点：
 *   F1:  根节点/叶子节点空节点  必然是黑节点
 *   F2: 红节点的孩子节点，必然是黑色的（因为无论它的孩子节点是 2/3节点，表示方法中  直接连接的都是 黑节点）
 *   F3: 任意一个节点到叶子节点，经历的黑节点 个数必然是一样的
 * 
 * 实现原理：
 *   R1 红节点表示和黑节点是 同一节点内的一个元素，相当于 3节点/临时4节点
 *   R2 定义 实现的红黑树是向左倾斜的，即 红节点都是位于 黑节点的左分支中
 * 
 *  ![红黑树 与 2-3树 等价关系](https://gitee.com/ygming/blog-img/raw/master/img/RBTree-1.jpeg)
 *  ![红黑树 实现流程](https://gitee.com/ygming/blog-img/raw/master/img/RBTree-2.jpeg)
 *  ![红黑树子过程- 左旋转](https://gitee.com/ygming/blog-img/raw/master/img/RBTree-3.jpeg)   
 *  ![红黑树子过程- 右旋转](https://gitee.com/ygming/blog-img/raw/master/img/RBTree-4.jpeg)
 * 
 *   
 *  实现流程：
 *    S1  默认添加元素为红节点 + 保持根节点为 黑节点： 默认是红节点的原因是，会有上合的情况，此时需要用红节点表示
 *    S2 保持3节点为向左倾斜： 当 红节点元素值 > 黑节点值时，为了避免红节点 向右倾斜，所以 需要进行左旋操作
 *   
 *   	S3 处理临时4节点的过程
 *      情况A-颜色翻转：当 left < mid < right + 新增的是right时，只要让left/right为变为黑色，mid变成红色（因为mid可能会上合，left/right要被下拆）
 *      情况B-右旋转 + 颜色翻转： 当 left < mid < right + 新增是的left时，需要先进行一次右旋转转化为 情况A，再进行 颜色翻转
 *      情况C- 左旋转 + 右旋转 + 颜色翻转：当 left < mid + right + 新增的是mid时，需要先左旋转（局部右倾斜了） 转化为情况B....
 *
 */


class node {
  key: any;
  value: any;
  left: node;
  right: node;
  color: boolean;
  // 静态属性
  static RED = true;
  static BLACK = false;

  constructor(key = null, value = null, left = null, right = null) {
    this.key = key;
    this.value = value;
    this.left = left;
    this.right = right;
    this.color = node.RED;
  }
}

class RBTree {
  root: node;
  size: number;

  // 静态属性
  static RED = true;
  static BLACK = false;

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

	// 判断节点是否为红树
	private isRed(node: node) {
		if (!node) return RBTree.BLACK
		return node.color
	}

	// 对节点node进行左旋转，返回 旋转后的新的根节点x
  //   node                             x
  //   /   \     左旋转               /  \
  //  T1   x   --------->  node   T3
  //       / \                     /   \
  //      T2 T3                T1   T2
  private leftRotate(node: node){
		let x = node.right
		// 旋转
		node.right = x.left
		x.left = node
		// 更改颜色
		x.color = node.color
		node.color = RBTree.RED
		return x
	}

	// 对节点node进行右旋转，返回 旋转后的新的根节点x
	//     node                        x
  //     /   \     右旋转         /  \
  //    x    T2   ------->   y   node
  //   / \                         /  \
  //  y  T1                     T1  T2
  private  rightRotate(node: node){
		let x = node.left
		// 右旋转
		node.left = x.right
		x.right = node

		x.color = node.color
		node.color = RBTree.RED
		return x
	}

	// 颜色翻转
	private flipColors(node: node){
		node.color = RBTree.RED
		node.left.color = RBTree.BLACK
		node.right.color = RBTree.BLACK
  }


  //S1 保持根节点 是黑节点
  add(key, value) {
    this.root = this.innerAdd(this.root, key, value)
		this.root.color = RBTree.BLACK

  }
  //  返回插入新节点后 红黑树的根
  innerAdd(node2: node, key: any, value: any) {
    if (node2 == null) {
      this.size++;
			// 默认插入红节点
      return new node(key, value);
    }

    if (key < node2.key) {
      node2.left = this.innerAdd(node2.left, key, value);
    } else if (key > node2.key) {
      node2.right = this.innerAdd(node2.right, key, value);
    } else {
      node2.value = value;
    }

		// 进行红黑树平衡处理
		//S2&S3-C  当左孩子节点为黑树 + 右孩子节点为红树(left < mid < right + 新增的为right)，说明是右倾斜，进行左旋操作
		if ( this.isRed(node2.right) &&  !this.isRed(node2.left) ) {
			node2 = this.leftRotate(node2)
		}
		// S3-B left < mid < right + 新增的为left，需要进行右旋转，转变为情况S3-A
		if ( this.isRed(node2.left) && this.isRed(node2.left.left) ) {
      node2 = this.rightRotate(node2)
		}
		// S3-A情况
    if ( this.isRed(node2.left) && this.isRed(node2.right) ) {
      this.flipColors(node2)
		}
    return node2
  }


  // 返回以node2为根节点的二分搜索树中，key所在的节点
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

}


