# LeetCode350- 两个数组的交集 II

## 实现思路

1 思维关键词: Map

## 参考文档

[01 直接参考实现](https://leetcode.cn/problems/intersection-of-two-arrays-ii/solution/liang-ge-shu-zu-de-jiao-ji-ii-by-leetcode-solution/)


## 代码实现

1 方法1: map  时间复杂度: O(m+n);  空间复杂度(m+n)

```js
function intersect(nums1: number[], nums2: number[]): number[] {
  const record = new Map()
  let res = []
  const [shortCopy, longCopy] = nums1.length < nums2.length ? [nums1, nums2] : [nums2, nums1]
  
  for (let item of shortCopy) {
    record.set(item, (record.get(item) || 0) + 1)
  }
  for (let item of longCopy) {
    const pre = record.get(item)
    if (pre > 0) {
      res.push(item)
      record.set(item, pre-1)
    }
  }
  return res
}
```
