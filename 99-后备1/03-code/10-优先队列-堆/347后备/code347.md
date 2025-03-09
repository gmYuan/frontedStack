# LeetCode347- 前K个高频元素

## 图示参考

[01 方法1参考](https://www.bilibili.com/video/BV1Mt411371T)

[02 方法2参考](https://leetcode.cn/problems/top-k-frequent-elements/solution/qian-k-ge-gao-pin-yuan-su-zui-xiao-dui-b-au4n/)

[03 关于最小堆的性质](https://zhuanlan.zhihu.com/p/341418979)



## 代码实现

方法1: 桶排序  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function topKFrequent(nums: number[], k: number): number[] {
  let res = []

  // S1 createHash: <ele, freq>
  let eleToFreqMap = new Map()
  for (let ele of nums) {
    let pre = eleToFreqMap.get(ele)
    pre ? eleToFreqMap.set(ele, pre+1) : eleToFreqMap.set(ele, 1)
  }
  // S2 createBucket: <freq/index, ele>
  let freqToEles = []
  eleToFreqMap.forEach((freq, ele) => {
    let pre = freqToEles[freq] 
    // 易错点: 要以freq作为index, eles作为数组成员（即二维数组）
    pre ? freqToEles[freq] = [...pre, ele] : freqToEles[freq] = [ele]
  })
  // S3 traverseBucket: 从后向前(越往后，freq越高) 找到k个ele即可
  for (let i = freqToEles.length-1; i>=0; i--) {
    if (res.length>= k) break
    if (freqToEles[i]) {
      res.push(...freqToEles[i])
    }
  }

  return res
}; 
```

方法2: 优先队列（最小堆） 时间复杂度 O(nlogk)  空间复杂度：O(n)

```ts
function topKFrequent(nums: number[], k: number): number[] {
  let eleToFreqMap = new Map()
  let heap = new MinHeap()
  // S1
  for (let num of nums) {
    eleToFreqMap.set(num, (eleToFreqMap.get(num) || 0) +1)
  }
  // S2
  eleToFreqMap.forEach((freq, ele) => {
    if (heap.size() < k) {
      heap.push({ele, freq})
    // 最小堆内已经有k个成员，且最小头节点的频率 < 当前元素的频率，则出旧的入新的
    } else if (heap.front().freq < freq)  {
      heap.shift()
      heap.push({ele, freq})
    }
  })

  return heap.data.map(unit => unit.ele)
}

type THeapEle = {
    ele: number
    freq: number
}

class MinHeap {
  data: Array<THeapEle>
  constructor() {
    this.data = []
  }

  size() {
    return this.data.length
  }
  front() {
    return this.data[0]
  }
  push(unit: THeapEle) {
    this.data.push(unit)
    this.shiftUp(this.data.length-1)
  }
  shift() {
    // 交换首尾位置+删除新尾（旧头）
    this.swap(0, this.data.length-1)
    this.data.pop()
    // 把新的头节点进行下沉，以保持最小堆的性质
    this.shiftDown(0)
  }

  private shiftUp(index: number) {
    if (index === 0) return
    // 获取父节点索引，比较当前节点值和父节点值,如果更小就要上浮，一直递归到root节点
    const parentIndex = this.getParentIndex(index)
    const parent = this.data[parentIndex]
    if (parent && this.data[index].freq < parent.freq) {
      this.swap(index, parentIndex)
      this.shiftUp(parentIndex) 
    } 
  }

  private shiftDown(index: number) {
    const leftIndex = this.getLeftChildIndex(index)
    const rightIndex = this.getRightChildIndex(index)
    const leftChild = this.data[leftIndex]
    const rightChild = this.data[rightIndex]
    // 当前节点值 > 子节点值时，交换位置保持最小堆性质 + 继续递归下沉下一节子树
    if (leftChild && this.data[index].freq > leftChild.freq) {
      this.swap(index, leftIndex)
      this.shiftDown(leftIndex)
    }
    if (rightChild && this.data[index].freq > rightChild.freq) {
      this.swap(index, rightIndex)
      this.shiftDown(rightIndex)
    }
  }

  private getParentIndex(index: number) {
    // 相当于 Math.floor((i - 1) / 2)
    return (index - 1) >> 1
  }
  private getLeftChildIndex(index: number) {
    return 2 * index + 1
  }
  private getRightChildIndex(index: number) {
    return 2 * index + 2
  }
  private swap(i: number, j: number) {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]]
  }
}
```
