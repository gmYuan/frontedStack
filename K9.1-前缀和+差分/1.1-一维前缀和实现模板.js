
// 一维数组 前缀和
// 给出一个数组，求出该数组中 任意区间[l, r] 的和
// 其中 r >= l >= 1

function PrefixSum(arr, [l, r]) {
  let sums = [0]
  // 计算前缀和
  // 易错点1: 这里需要 <= list.length 而不是 < list.length
  // 因为i是相对sum开始的，它比list多一个位置(向右偏移一个位置)
  // 而最后求[l,r]的和时，其索引又是相对list的，所以需要 <= list.length
  // 这样才能遍历到 list 的最后一个元素
  for (let i = 1; i <= arr.length; i++) {
    // 注意点1: 用 arr[i-1] 是因为要取到 当前位置对应的原数组中的数
    // sums 数组比 arr 数组多偏移了一个位置（多了个0），所以索引要减1才能对应上
    sums[i] = arr[i - 1] + sums[i - 1]
  }
  // 计算区间和
  return sums[r] - sums[l - 1]
}

// 注意 l 需要 >= 1, 即下标是从 1开始的
console.log(PrefixSum([1,2,3,4,5], [1, 4]))