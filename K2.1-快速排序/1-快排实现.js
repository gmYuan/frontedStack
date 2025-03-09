function sortArray(nums: number[]): number[] {
  quickSort(nums, 0, nums.length - 1);
  return nums
};


function quickSort(arr, l, r) {
  if (l >= r) return;
  const [lq, gt] = partition(arr, l, r);
  quickSort(arr, l, lq-1);
  quickSort(arr, gt, r);
}

// 划分3个子区间，使 arr[l, lq)都<x, arr[lq, gt-1]都==x, arr[gt, r]都>x
// 返回lq和gt的 数组索引
function partition(arr, l, r) {
  let rdx = Math.floor(Math.random() * (r - l + 1)) + l;
  swap(arr, l, rdx);
  // 获取基准值
  let x = arr[l]
  // 从l+1开始处理，在循环中保证 [l+1, lt]都<x, [lt+1, i)都===x, [gt, r]都>x
  let lt = l, gt = r + 1, i = l + 1
  // 易错点1: 当i和gt相遇时就表示数组所有成员都被处理划分了，此时就该停止
  while (i < gt) {
    if (arr[i] === x) {
      // 默认开始时i为l+1,相等时直接i++，依旧满足[lt+1, i)都===x
      i++
    } else if (arr[i] < x ) {
      // 这里先把lt前移，从而保证[l+1, lt]都<x，注意此时[lt+1, i)都===x仍然成立
      // lt+1和i交换位置后，由于lt+1一定是等于val的，所以交换位置后的arr[i]也是等于x的
      // 已经是正确位置了，所以i直接后移处理下一个元素即可
      swap(arr, i++, ++lt)
    } else {
      // 先把gt前移，从而保证[gt, r]都>x
      // 由于此时gt-1位置的元素值和x的大小关系不能确定，所以gt-1和i交换位置后
      // arr[i]的值需要再次和x比较进行处理，所以i不更新，进入下一次循环比较
      swap(arr, i, --gt)
    }
  }

  // 易错点2: 由于是从l+1开始划分数组的，在[l+1,r]范围内划分完毕后
  // 要把x放到 lt位置，从而更新为了 [l, lt-1] < base && [lt, gt-1] === base && [gt, r] > base
  // 也就是说，lt此时正确的含义变成了lq，并满足函数定义性质：
  //   arr[l, lq)都<x, arr[lq, gt-1]都==x, arr[gt, r]都>x
  swap(arr, l, lt)
  return [lt, gt]
}

function swap(arr, l, r) {
  [arr[l], arr[r]] = [arr[r], arr[l]];
}