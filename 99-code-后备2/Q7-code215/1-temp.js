// 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
// 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
// 你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。

// 输入: [3,2,1,5,6,4], k = 2
// 输出: 5

function findKthLargest(nums, k) {
  const len = nums.length;
  return quickFind(nums, 0, len - 1, len - k);
}

function quickFind(arr, l, r, tdx) {
  if (l >= r) return arr[l]
  const rdx = Math.floor(Math.random() * (r - l + 1)) + l
  swap(arr, l, rdx)
  let x = arr[l], lt = l - 1, gt = r + 1
  while (lt < gt) {
    while(arr[++lt] < x);
    while(arr[--gt] > x);
    if (lt < gt) swap(arr, lt, gt)
  }
  if (tdx <= gt) return quickFind(arr, l, gt, tdx)
  return quickFind(arr, gt + 1, r, tdx)
}



function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
