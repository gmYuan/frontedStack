// 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
// 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
// 你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。

// 输入: [3,2,1,5,6,4], k = 2
// 输出: 5

function findKthLargest(nums, k) {
  // 升序后的第k大的元素，对应的idx是 nums.length - k
  return quickFind(nums, 0, nums.length - 1, nums.length - k);
}

function quickFind(arr, l, r, tdx) {
  // 易错点1：说明此时只有1个成员，那么必然应该返回这个值
  if (l >= r) return arr[l];
  const p = partition(arr, l, r);
  if (p === tdx) return arr[p];
  if (tdx < p) {
    return quickFind(arr, l, p - 1, tdx);
  } else {
    return quickFind(arr, p + 1, r, tdx);
  }
}

function partition(arr, l, r) {
  // [0, 1) ==> [0, r-l+1) ==> [l, r+1)
  const rdx = Math.floor(Math.random() * (r + 1 - l) + l);
  swap(arr, l, rdx);
  const x = arr[l];
  // 拆分成左右区间，使得[l+1, lt)都<=x; (gt, r]都>=x
  let lt = l + 1, gt = r;
  while (lt <= gt) {
    while (arr[lt] < x) lt++;
    while (arr[gt] > x) gt--;
    if (lt >= gt) break;
    swap(arr, lt++, gt--);
  }
  // 正确放置x的位置，正确放置后会保证[l, lt-1]都<=x, [lt, r]都 >=x
  swap(arr, l, lt - 1);
  // 易错点2：返回的是 lt-1, 而不是lt
  return lt - 1;
}


function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}