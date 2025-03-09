# LeetCode454- 四数相加 II

## 实现思路

1 思维关键词: Map

## 参考文档

[01 for循环性能分析](https://leetcode.cn/problems/4sum-ii/solution/ha-xi-biao-1xing-dai-ma-5xie-fa-chao-100fu-yuan-yi/)

## 代码实现

1 方法1: map  时间复杂度: O(n^2);  空间复杂度(n^2)

```ts
function fourSumCount(nums1: number[], nums2: number[], nums3: number[], nums4: number[]): number {
  let res = 0
  let recoed = new Map()
  for (let item3 of nums3) {
    for (let item4 of nums4) {
      const total = item3 + item4
      recoed.set(total, (recoed.get(total) || 0) + 1)
    }
  }
  for (let item1 of nums1) {
    for (let item2 of nums2) {
      const total = item1 + item2
      if (recoed.has(0-total)) {
        res += recoed.get(0-total)
      }
    }
  }
  return res
};
```
