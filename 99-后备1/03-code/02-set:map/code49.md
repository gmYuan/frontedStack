# LeetCode49- 字母异位词分组

## 实现思路

1 思维关键词: Map + 字符排序: 关键是如何选择合适的 key-value

## 参考文档

[01 介绍了计数法](https://leetcode.cn/problems/group-anagrams/solution/kan-wo-yi-ju-hua-ac-zi-mu-yi-wei-ci-fen-yrnis/)

## 代码实现

1 方法1: 字符排序 + map  时间复杂度: O( n * Klog(K) );  空间复杂度(n * k)

```ts
function groupAnagrams(strs: string[]): string[][] {
  let record = new Map()
  for (let curStr of strs) {
    // 错误点，很可能不同字符的和值是相同的，导致该方法结果错误==> 必须精确到字符内容排序后相同/ 使用质数相乘法避免值重复
    const sorted = [...curStr].sort().join('')
    if (record.has(sorted)) {
      let newArr = [...record.get(sorted), curStr]
      record.set(sorted, newArr)
    } else {
      record.set(sorted, [curStr])
    }
  }
  return [...record.values()]
};
```
