/**
 * 排序- 选择排序
 *   解决问题：内容排序
 *   实现原理：初始当前值为最小值 + 比较遍历值和最小值，更新最小值下标 + 交换位置 + 初始值后移
 *   动画演示：https://visualgo.net/zh/sorting
 *
 * 排序- 插入排序
 *   步骤：
 *     S1 记录 当前要排序的元素  value
 *     S2 记录 当前要排序的元素索引位置j， j会不断更新，从而让value插入到正确的位置
 *     S3 比较之前所有元素的值b 和 value，b>value时  从前向后复制，否则则立刻停止循环
             如果不立刻停止，那么循环会一直执行到j=0，插入的位置就固定是0
 *     S4 把排序位置放到 a < value < b的 正确位置上
 *
 * 排序- 冒泡排序
 *   步骤：
 *    S1 记录已排序的元素区间[m,k]中的m，默认为0 ==> sortedBeginIndex = 0
      S2 执行循环，每次都设置sortedBeginIndex为0 (默认每次循环时，数组都是排好序的)
      S3 执行循环，两两比较 ==> 交换位置 + 更新sortedBeginIndex，一轮结束后最大值在最后1位
      S4 以此类推，开始第n轮比较，排除 最后m位以排序元素 ==> n= sortedBeginIndex
      S5 当不存在未排序元素时==> noSortIndex = 0，说明排序完成
 */


// 选择排序
class selectionSort {
  arr: any[]
  constructor(arr) {
    this.arr = arr
  }

  sort() {
    for (let i = 0; i < this.arr.length; i++) {
      let minIndex = i
      for (let j = i + 1; j < this.arr.length; j++) {
        //S1 寻找最小的index + 更新
        if (this.arr[j] < this.arr[minIndex] ) {
          minIndex = j
        }
      }
      //S2 交换位置
      this.swap(i, minIndex)
    }
  }

  swap(i, j) {
    const temp = this.arr[i]
    this.arr[i] = this.arr[j]
    this.arr[j] = temp
  }
}


// 插入排序
class insertSort {
  arr: any[]
  constructor(arr) {
    this.arr = arr
  }

  sort() {
    const n = this.arr.length
    for (let i = 0; i< n; i++) {
      // S1 记录 要排序的 value
      const comValue = this.arr[i]
      //S2 记录 要比较/更新的 索引，从而让value插入到正确的位置
      let j = i

      //写法1
      // for (; j > 0; j--) {
      //   if (this.arr[j-1] > comValue) {
      //     this.arr[j] = this.arr[j-1]
      //   } else {
      //     break
      //   }
      // }
      // this.arr[j] = comValue

      //写法2
      //S3 比较之前元素b 和 value，b>value时则  从前向后复制，否则则立刻停止
      // 如果不立刻停止，那么循环会一直执行到j=0，插入的位置就固定是0
      for (; j>0 && this.arr[j-1] > comValue; j--) {
        this.arr[j] = this.arr[j-1]
      }
      //S4 把排序位置放到 a < value < b的 正确位置上
      this.arr[j] = comValue
    }
  }
}


class bubbleSort{
  arr: any[]
  constructor(arr) {
    this.arr = arr
  }

  sort() {
    let n = this.arr.length
    let sortedBeginIndex = 0
    do {
      sortedBeginIndex = 0
      for (let i = 1; i < n; i++) {
        if (this.arr[i-1] > this.arr[i]) {
          this.swap(i-1, i)
          sortedBeginIndex = i
        }
      }
      n = sortedBeginIndex
    } while (sortedBeginIndex > 0)
  }

  swap(i, j) {
    const temp = this.arr[i]
    this.arr[i] = this.arr[j]
    this.arr[j] = temp
  }
}


const temp = [10, 4, 3, 8]
// const temp = [10,4, 3]
let ex = new bubbleSort(temp)
ex.sort()
console.log(ex)
