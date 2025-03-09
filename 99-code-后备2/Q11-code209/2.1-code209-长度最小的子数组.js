
// 我们的目标是: 找到一个 [l, r)的子数组，使其 区间和 >= t
// 区间和sum[l, r)可以表示为 sum[r] - sum[l]

// 也就是说，在具体 for...i 循环过程中，对于当前所在的右端点i：
// 我们需要找到一个起始位置 x，使得 [x, i) 的区间和 >= t
// [x, i) 的区间和 可以表示为 sum[i] - sum[x]

// 所以目标就是：sum[i] - sum[x] >= t
// 并且为了让区间长度尽可能小，x就需要尽可能大


// 所以，我们只需要找到一个x，使得 sum[x] <= sum[i] - t(记作d)
// 也就是找到 sum[x] <= d 的 x的最大值



function minSubArrayLen(t: number, nums: number[]): number {
  let n = nums.length, ans = n + 10;
  const sum = new Array(n + 10).fill(0);
  // 前缀和sum[i]表示 [0, i)的和， 所以是从1开始
  for (let i = 1; i <= n; i++) sum[i] = sum[i - 1] + nums[i - 1];
  // 遍历每个右端点i
  for (let i = 1; i <= n; i++) {
      // 我们要找到 sum[i] - sum[x] >= t时，x的最大值，因为 x越大, [x, i)的区间长度就越小
      // 也就是说要找到 sum[x] <= sum[i] - t(记作d) 时，x的最大值
      const d = sum[i] - t;
      let l = 0, r = i; 
      // 这段二分循环，求的是从[0, i)中，满足sum[x] <= d的 最大下标x
      while (l < r) {
          // 每次都 获取从[0, i)中的中间位置
          const mid = l + r + 1 >> 1;
           // 如果sum[mid] <= d 说明sum[mid]值在目标区间内，要取mid的右半侧
           // 反之，sum[mid] > d 说明sum[mid]值 在目标值右侧，要取mid的左半侧
          if (sum[mid] <= d) l = mid;    
          else r = mid - 1;
      }
      // 如果sum[x] <= d，说明sum[x]在目标区间内，更新ans
      if (sum[r] <= d) ans = Math.min(ans, i - r);
  }
  return ans == n + 10 ? 0 : ans;
}；