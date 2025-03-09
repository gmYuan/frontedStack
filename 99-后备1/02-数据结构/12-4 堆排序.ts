/**
 * 堆- 最大堆
 * 定义/特点：完全二叉树 + 任意父节点的元素值 >= 其 左叶子/右叶子节点 值
 *
 * 实现步骤：
 *                       10 (i=0)
 *                   /              \
 *           8(i=1)                 9(i=2)
 *            /   \                 /      \
 *      6(i=3)  7(i=4)       5(i=5)    4(i=6)
 *
 * S1 用数组表示最大堆 [ 10, 8, 9, 6, 7, 5, 4 ]，则
 *     如果pIndex = i (i>=0),  则 leftIndex = 2*i + 1;  rightIndex = 2*i + 2
 *     如果leftIndex/rightIndex = i, 则 pIndex = Math.floor( (i-1)/2 )
 *     同理，最后一个非叶子节点A的索引是：Math.floor( (count-1)/2 )，count表示数组元素个数
 *
 * S2 把一个数组，初始化为最大堆，即Heapify：
 *   S2.1  找到最后一个非叶子节点A，执行siftDown()操作
 *   S2.2 依次向前循环执行即可
 *
 * S3 向最大堆中 添加一个元素 insert(item):
 *   S3.1 直接在数组末尾新增一个元素；
 *   S3.2 siftUp：比较节点A 和 其父节点B，如果 A > B，则交换位置 + 循环更新index值为 parentIndex，从而向上层比较
 *
 *
 * S4 从最大堆中取出堆顶元素  extractMax：
 *   S4.1  获取堆顶值 + 在最后返回；
 *   S4.2 合并分支(交换首尾+删除尾部)
 *   S4.3  siftDown(index): 取较大子节点比较
 *
 *
 * 堆排序 HeapSort实现
 * 方法1: 依次取出堆首元素，放入新数组中 + 返回这个新数组
 * 方法2：swap(0, count-1) ==> 对新的堆顶元素进行sifrDown ==> 重复步骤1 + 不包括已排序的元素
 * 
 * 
 **/

class maxHeap {
  arr: any[];
  count: number;
  capacity: number;
  constructor(capacity) {
		// 如果传入的是一个数组，则通过Heapify来构建一个最大堆
		if (Array.isArray(capacity)) {
			this.heapify(capacity)
		} else if (typeof capacity === 'number') {
			this.arr = new Array[capacity]();
			this.count = 0;
			this.capacity = capacity;
		}
  }
  size() {
    return this.count;
  }
  isEmpty() {
    return this.count === 0;
  }
  // 向堆中插入一个元素
  insert(item) {
    if (this.count >= this.capacity) return;
    this.arr[this.count] = item;
    this.count++;
    this.siftUp(this.count - 1);
  }
  // 取出堆中最大值
  extractMax() {
    const ret = this.arr[0];

    this.swap(0, this.count - 1);
		this.count--

    this.siftDown(0);
    return ret;
  }

  // 节点下沉
  private siftDown(index) {
		while (this.getLeftIndex(index) < this.count) {
			//S1 获取左右子节点中较大索引值
			// leftIndex+1 < count的原因是：可能存在 没有叶子节点/没有右子节点的情况
		  let leftIndex = this.getLeftIndex(index)
			if (leftIndex + 1 < this.count && this.arr[leftIndex] < this.arr[leftIndex + 1] ) {
				leftIndex++
			}
			// S2 比较子节点和当前节点值，子节点较小时 则停止，否则交换位置
			if (this.arr[leftIndex] <= this.arr[index] ) {
					break
			}
			this.swap(index, leftIndex)
			index = leftIndex
		}
	}

  // 节点上浮
  private siftUp(index) {
    while (index > 0 && this.arr[index] > this.arr[this.getPIndex(index)]) {
      this.swap(index, this.getPIndex(index));
      index = this.getPIndex(index);
    }
  }

  // 获取某个节点的 父节点索引
  private getPIndex(index) {
    if (index < 0) {
      throw new Error("getPindex 的 index违法");
    }
    return Math.floor((index - 1) / 2);
  }
  // 交换元素位置
  swap(i, j) {
    [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
  }

  // 获取某个节点下左子节点索引
  getLeftIndex(index) {
    if (index < 0) {
      throw new Error("getLeftIndex 的索引非法");
    }
		return 2*index + 1
  }

	// 把一个数组转化为最大堆
	heapify(arr) {
    let n = arr.length
		this.arr = [...arr]
		this.count = n
		this.capacity = n
		let lastPIndex = this.getPIndex(n-1)
		for (let i = lastPIndex; i >= 0; i-- ) {
			this.siftDown(i)
		}
	}
}

class HeapSort {
	arr: any[]
  count: number
	constructor(arr) {
		this.arr = arr
    this.count = this.arr.length
	}

	sort() {
		const heap = new maxHeap(this.arr)
		let res = []
		let count = this.count
		for (let i = count - 1; i >= 0; i--) {
			const maxValue = heap.extractMax()
			res[i] = maxValue
		}
		this.arr= res
	}

  sort2() {
    let count = this.count
    // heapify过程：count-1是最后一个元素索引D ==> (D-1)/2是获取其父节点索引
    // 即从 第一个非叶子节点 进行下沉操作
    for( let i = (count-1 -1)/2 ; i >= 0 ; i -- ) {
      this.siftDown(count, i)
    }

    // i >0 而不是 i>=0的原因是，还剩最后一个元素时不需要再进行排序
		for (let i = count - 1; i > 0; i--) {
      // 把最大值按序放到最后
      this.swap(0, i)
      // 对新的堆首元素进行siftDown，以保持最大堆的性质 + 排除已排序的元素
      // i 每次都会去处掉已排序的元素
      this.siftDown(i, 0)
    }
  }

  // 交换元素位置
  swap(i, j) {
     [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
  }

  // 节点下沉
  private siftDown(count, index) {
    const curPValue = this.arr[index]

		while (this.getLeftIndex(index) < count) {
			//S1 获取左右子节点中较大索引值
			// leftIndex+1 < count的原因是：可能存在 没有叶子节点/没有右子节点的情况
		  let leftIndex = this.getLeftIndex(index)
			if (leftIndex + 1 < count && this.arr[leftIndex] < this.arr[leftIndex + 1] ) {
				leftIndex++
			}
			// S2 比较子节点和当前节点值，子节点较小时 则停止，否则交换位置
			if (curPValue >= this.arr[leftIndex]) {
					break
			}
      //S3.1 每次循环 遇到比curPValue大的，就更新为新的值，从而替换掉 交换位置的方法
			this.arr[index] = this.arr[leftIndex]
			index = leftIndex
		}
    //S3.2 把被替换掉的curPValue 放到 原堆中最大值的位置，该位置此时就是 index
    this.arr[index] = curPValue
	}

  // 获取某个节点下左子节点索引
  getLeftIndex(index) {
    if (index < 0) {
      throw new Error("getLeftIndex 的索引非法");
    }
    return 2*index + 1
  }

}

const temp = [3, 7, 6, 2, 1, 3]
let ex = new HeapSort(temp)
ex.sort2()
console.log(ex)
