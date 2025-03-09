/**
 * segment Tree:  平衡二叉树(叶子节点之间的深度高度差 <= 1)  + 构造成满二叉树
 * 
 * S2 结构表示：  数组
 *   getSize/get
 *   getLeftIndex/getRightIndex
 * 
 * S3 arr的个数为 n = 2^k时，满二叉树的空间大小为2n；n=2^k+1时，空间大小为 (n + n + (n+n) ) = 4n
 * 
 * S4 构造线段树 每个节点内容- buildTree： 构建节点(treeIndex, l, r) + 节点的 操作逻辑(merge)
 * S5 线段树 区间内容查询- query：前置条件判断 + 递归查询(treeIndex, l, r, queryL, queryR)
 *   
 */

class segmentTree {
	data: any[]
	tree: any[]
	merge: (a, b) => {}
  constructor(arr: any[], merger) {
		this.data = [...arr]

		this.tree = new Array(arr.length * 4)
		this.merge = merger
		this.buildingTree(0, 0, this.data.length - 1)
  }

	getSize() {
		return this.data.length
	}

	get(index) {
		if (index < 0 || index >= this.getSize()) {
			throw new Error('index违法')
		}
		return this.data[index]
	}

	getLeftIndex(index) {
		return 2 * index + 1
	}

	getRightIndex(index) {
		return 2 * index + 2
	}

	// 创建treeIndex节点的  元素内容：区间范围内的 操作结果
	buildingTree(treeIndex, left, right) {
		//S1 当区间长度为1时，说明只有一个元素，该节点的内容为 数组中的对应值
		if (left === right) {
			this.tree[treeIndex] = this.data[left]
		}

		//S2 递归设置 其 左/右子节点的 left~mid / mid+1~right区间的 元素内容
		const leftIndex = this.getLeftIndex(treeIndex)
		const rightIndex = this.getRightIndex(treeIndex)
		//使用 left + (right-left)计算的原因是：避免直接使用 left+right时数值过大，造成溢出效果
		const mid = Math.ceil( left + (right - left) / 2 )
		this.buildingTree(leftIndex, left, mid)
		this.buildingTree(rightIndex, mid+1, right)

		//S3 设置节点值 为其子节点值的 操作结果
		this.tree[treeIndex] = this.merge(this.tree[leftIndex], this.tree[rightIndex] )
	}

	// 区间操作结果 查询
	query(queryL, queryR) {
		//S1 前置判断
		if (queryL < 0 || queryL >= this.data.length ||
			queryR < 0 || queryR >= this.data.length ||
			queryL > queryR
		) {
			throw new Error('index违法')
		}

		this.innerQuery(0, 0, this.data.length - 1, queryL, queryR)
	}

  // 内部查询
	innerQuery(treeIndex, left, right, queryL, queryR) {

		//S1 终止条件
		if (left === queryL && right === queryR) {
			return this.tree[treeIndex]
		}

		// S2 分类讨论queryL~querrR分别在 左子树区间/右子树区间/ 跨子树区间情况
		const leftIndex = this.getLeftIndex(treeIndex)
		const rightIndex = this.getRightIndex(treeIndex)
		const mid = Math.floor(left + (right - left) / 2)
		if (queryR <= mid) {
			//全在 左子树情况
			return this.innerQuery(leftIndex, left, mid, queryL, queryR)
		} else if (queryL >= mid + 1) {
			//全在 右子树情况
			return this.innerQuery(rightIndex, mid+1, right, queryL, queryR)
		} else {
			const leftResult = this.innerQuery(leftIndex, left, mid, queryL, mid)
			const rightResult = this.innerQuery(rightIndex, mid + 1, right, mid + 1, queryR)
			return this.merge(leftResult, rightResult);
		}
	}

}