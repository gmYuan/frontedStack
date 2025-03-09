function sortArray(nums) {
  quickSort(nums, 0, nums.length - 1);
  return nums;
}

function quickSort(arr, l, r) {
  if (l >= r) return;
  const [lq, gt] = partition(arr, l, r)
  quickSort(arr, l, lq - 1)
  quickSort(arr, gt, r)
}

function partition(arr, l, r) {
  let rdx = Math.floor(Math.random() * (r - l + 1)) + l
  swap(arr, l , rdx)
  let x = arr[l]
  // 循环不变量: [l+1, lt]<x; [lt+1, i)===x; [gt, r]>x
  let lt = l, gt = r+1, i = l + 1
  while (i < gt) {
    if (arr[i] < x) {
      swap(arr, i++, ++lt)
    } else if (arr[i] === x) {
      i++
    } else {
      swap(arr, i, --gt)
    }
  }
  swap(arr, l, lt)
  return [lt, gt]
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
