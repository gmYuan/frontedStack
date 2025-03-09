/**
 * maxHeap: 完全二叉树 + 任意父节点的元素值 >= 其 左叶子/右叶子节点 值
 * 
 * 
 * S2 结构表示：  数组: 
 *   getCapacity/getSize/isEmpty
 *   add/addLast/addFirst/get/set/contains/find
 *   remove/removeLast/removeFirst
 *   swap/ resize
 * 
 * 
 * S3 堆方法
 *   getSize/isEmpty
 *   getParentIndex/getLeftIndex/getRightIndex
 *   add：addLast + siftUp(index)：循环更新index值为 parentIndex
 *   findMax: 返回堆顶元素
 *   extractMax：获取返回值 + 合并分支(交换首尾+删除尾部) + siftDown(index): 取较大子节点比较
 * 
 *   replace: 抽取出最大值 + 插入一个新值 ==>  最大值替换操作 + 下沉siftDown
 *   heapify：把任意数组转化为最大堆， 即 从第一个非叶子节点，进行 siftDown
 * 
 * 
 * S4 优先队列：最大堆实现
 */

class arr {
  data: any[]
  size: number
  constructor(cap = 10) {
		// cap支持为数组形式，以进行heapify
		if (Array.isArray(cap)) {
			this.data = new Array(cap.length)
			for (let i = 0; i <cap.length; i++) {
				this.data[i] = cap[i]
			}
			this.size = cap.length
			return 
		}
		this.data = new Array(cap)
    this.size = 0
  }

	isEmpty() {
		return this.size === 0
	}

	getSize() {
		return this.size
	}

	getCapacity() {
		return this.data.length
	}

	add(index, e) {
		// S1 前置判断
		// >size而不是>=size的原因是：可以通过传入size在末尾新增元素
		if (index < 0 || index > this.size) {
			throw new Error('index违法')
		}
		//S2 扩容
		if (this.size === this.data.length) {
			this.resize(this.data.length * 2)
		}
		//S3 从前向后移动
		for (let i = this.size - 1; i >= index; i--) {
			this.data[i + 1] = this.data[i]
		} 
		//S4 入值 + 更新size
		this.data[index] = e
		this.size++
	}

	addLast(e) {
		this.add(this.size, e)
	}

	addFirst(e) {
		this.add(0, e)
	}

	get(index) {
		if (index < 0 || index >= this.size) {
			throw new Error('index违法')
		}
		return this.data[index]
	}

	set(index, e) {
		if (index < 0 || index >= this.size) {
			throw new Error('index违法')
		}
		this.data[index] = e
	}

	contains(e) {
		for (let i = 0; i < this.size; i++) {
			if (this.data[i] === e) {
				return true
			}
		}
		return false
	}

	find(e) {
		for (let i = 0; i < this.size; i++) {
			if (this.data[i] === e) {
				return i
			}
		}
		return -1
	}

	remove(index) {
		//S1 前置判断
		if (index < 0 || index >= this.size) {
			throw new Error('index违法')
		}
		//S2 获取返回值
		const ret = this.data[index]
		// S3 从后向前覆盖
		// i = index + 1的原因是：避免this.data[i-1]的索引值小于0
		for (let i = index + 1; i < this.size; i++) {
			this.data[i-1] = this.data[i]
		}

		//S4 更新size + 去值
		this.size--
		this.data[this.size] = null

		// S5 缩容
		if (this.size === this.data.length / 4 && this.data.length / 2 > 0 ) {
			this.resize(this.data.length / 2)
		}
		return ret
	}

	removeLast() {
		//传入size-1而不是size的原因是：如果传入size，则大于了 数组的最大索引值(size-1)
		this.remove(this.size - 1)
	}
	removeFirst() {
		this.remove(0)
	}

	swap(i, j) {
		if (i < 0 || i >= this.size || j < 0 || j >= this.size) {
			throw new Error('index违法')
		}
		const temp = this.data[i]
		this.data[i] = this.data[j]
		this.data[j] = temp
	}

	resize(cap) {
		let newData = new Array(cap)
		for (let i = 0; i < this.size; i++) {
			newData[i] = this.data[i]
		}
		this.data = newData
	}

}

class maxHeap {
	data: arr
  constructor(cap) {
		// heapify: 从第一个非叶子节点，进行下沉操作
		if ( Array.isArray(cap) ) {
			this.data = [...cap]
			if (cap.length != 1) {
				for (let i = this.getParentIndex(cap.length - 1); i>=0 ; i--) {
					this.siftDown(i)
				}
			}
			return
		}

		this.data = new arr(cap)
	}

	getSize() {
		return this.data.getSize()
	}

	isEmpty() {
		return this.data.isEmpty()
	}

	// 传入子节点index，返回父节点index
	getParentIndex(index) {
		if (index <=0) {
			throw new Error('index违法')
		}
		return (index - 1) / 2
	}
  // 传入父节点index，返回左节点index
	getLeftIndex(index) {
		if (index <= 0 ) {
      throw new Error('index 非法')
    }
		return 2 * index + 1
	}

	getRightIndex(index) {
		if (index <= 0 ) {
      throw new Error('index 非法')
    }
		return 2 * index + 2
	}

	addNode(value) {
		this.data.addLast(value)
		this.siftUp(this.data.getSize() - 1)
	}

	siftUp(index) {
		//S1 循环更新：比较父节点与当前节点大小
		//S2 当父节点 < 当前节点时，则交换位置 + 更新当前index
		while ( index > 0 && this.data.get(this.getParentIndex(index)) < this.data.get(index)) {
			this.data.swap(this.getParentIndex(index), index)
			index = this.getParentIndex(index)
		}
	}

	// 获取最大元素
	findMax() {
		if (this.getSize() === 0) {
			throw new Error('堆为空')
		}
		return this.data.get(0)
	}

	// 提取出最大元素
  extractMax() {
		//S1 获取返回值
		const ret = this.findMax()
		//S2 合并分支(交换首尾+删除尾部) + siftDown
		this.data.swap(0, this.getSize() - 1)
		this.data.removeLast()
		this.siftDown(0)

		return ret
	}

	siftDown(index) {
		// 上浮/下沉是一个 深度比较操作，所以需要循环更新
		while (this.getLeftIndex(index) < this.getSize() ) {
			//S1 获取左右子节点中较大索引值
			// j+1 < size的原因是：可能存在 没有叶子节点/没有右子节点的情况
		  let j = this.getLeftIndex(index)
		  if (j+1 < this.getSize() && this.data.get(j + 1) > this.data.get(j) ) {
			  j++
		  }
			// S2 比较子节点和当前节点值，子节点较小时 则停止，否则交换位置
			if (this.data.get(j) <= this.data.get(index) ) {
				break
			}
			this.data.swap(j, index)
			index = j
		}
	}

	// replace: 替换 + 下沉
	replace(e) {
		const ret = this.findMax()
		//S1 替换 + 下沉
		this.data.set(0, e)
		this.siftUp(0)
		return ret
	}

}

class priorityQueue {
	maxheap: maxHeap
	constructor() {
		this.maxheap = new maxHeap()
	}

	getSize() {
		return this.maxheap.getSize()
	}

	isEmpty() {
		return this.maxheap.isEmpty()
	}

	getFront() {
		return this.maxheap.findMax()
	}

	enqueue(e) {
		this.maxheap.addNode(e)
	}

	dequeue() {
		this.maxheap.extractMax() 
	}


}