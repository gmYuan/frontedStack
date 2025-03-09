function mergeSort(nums) {
  innerSort(nums, 0, nums.length - 1)
  return nums
};

// 排序 arr里 [l,r]范围内的成员
function innerSort(arr, l, r) {
  // 递归终止条件：拆分到了每组只有1个元素
  if (l >= r) return;
  const mid = (l + r) >> 1;
  // 合并左子区间
  innerSort(arr, l, mid);
  // 合并右子区间
  innerSort(arr, mid + 1, r);

  // 对左右有序区间 进行合并
  // 优化点1: 只有在arr[mid]的值 > arr[mid+1]值的时候，才需要进行merge排序操作
  // 因为对于2个有序区间而言，如果mid值已经小于mid+1了，那么他们整个区间就已经是有序的了
  // 这样优化后，对完全有序的数组，归并排序的复杂度是 0(n)的
  if (arr[mid] > arr[mid+1]) {
    mergePart(arr, l, mid, r);
  }
}


// 自底向上实现
function mergeSort2(nums) {
  let len = nums.length;
  // 按 2*size的规模 划分车厢 an和bn
  for (let size = 1; size < len; size *= 2) {
    // 两两合并 被划分的车厢[anStart, anEnd], [bnStart, bnEnd]:
    // [aStart, aEnd]和[bStart, bEnd]， 即[l, mid] 和 [mid+1 , r]的值分别是：
    // [i, i+size-1], [i+size, Math.min(i+size + size-1, len-1) ]

    // 易错点1: mid的值是 i+size-1，而不是i+size, 是因为size是从1而不是从索引0开始的，
    //   可以通过 举例size=1/size=2具体理解

    // 易错点2: r的值是 Math.min(i+size+size-1, len-1)，而不是i+size+size
    //  - 是i+size+size-1，而不是i+size+size的原因，本质上和 易错点1是一样的，同样
    //    可以通过举例size=1/size=2理解

    //  - 要考虑根据size划分车厢后，最后一部分车厢b 的总数是有可能少于size的，也就是说，此时
    //    最后一个节点的索引值是len-1, 而不一定是 i+size+size-1

    // 易错点3: i的更新条件是 i+=2*size，而不是i++
    //  - 这里i的含义其实表示的是，每一对即将合并的车厢[an,bn]的 anStart索引
    //    由于每队合并车厢的 bnEnd索引是 i+2*size-1
    //    所以，下一对车厢的 a'n+1 位置索引i的值就应该是 i+=2*size

    // 易错点4: 车厢的配对中止条件是bnStart值小于len，否则说明没有bn车厢需要被合并
    for (let i = 0; i + size < len; i += 2 * size) {
      // 优化点1: 只有aEnd值 > bStart值时，才需要对a,b车厢进行排序处理
      if (nums[i + size - 1] > nums[i + size]) {
        mergePart(nums, i, i + size - 1, Math.min(i + 2 * size - 1, len - 1));
      }
    }
  }
  return nums;
}

// 排序[l, mid] 和 [mid+1, r] 2个数组，返回排好序的合并后的 1个数组
function mergePart(arr, l, mid, r) {
  // 拷贝一份原数组，因为后续原数组内容会被更改
  const copy = [...arr];
  // 双指针处理
  let rdx = l,
    i = l,
    j = mid + 1;
  while (i <= mid && j <= r) {
    if (copy[i] <= copy[j]) arr[rdx++] = copy[i++];
    else arr[rdx++] = copy[j++];
  }
  // 处理左右侧还剩下的有序内容，直接赋值即可
  while (i <= mid) arr[rdx++] = copy[i++];
  while (j <= r) arr[rdx++] = copy[j++];
}



const temp = [10, 4, 3, 8, 7];
let ex = mergeSort(temp);
console.log(ex);





