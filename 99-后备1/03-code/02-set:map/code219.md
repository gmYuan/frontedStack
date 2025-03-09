# LeetCode219- 存在重复元素II

## 实现思路

1 思维关键词: Set + 滑动窗口

2 参考文档: <br/>
[01 直接参考文档](https://leetcode.cn/problems/contains-duplicate-ii/solution/hua-jie-suan-fa-219-cun-zai-zhong-fu-yuan-su-ii-by/)


## 代码实现

方法1: Set+滑动窗口  时间复杂度 O(n); 空间复杂度 O(k)

```ts
//方法1
function containsNearbyDuplicate(nums: number[], k: number): boolean {
  let slideMap = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (slideMap.has(nums[i])) {
      return true;
    }
    slideMap.add(nums[i]);
    // 滑动窗口，保持 slideMap.size() <= k
    if (slideMap.size > k) {
      slideMap.delete(nums[i - k]);
    }
  }
  return false;
}
```
