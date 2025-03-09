# LeetCode217- 存在重复元素

## 实现思路

1 思维关键词: Set

[01 思路参考](/)

## 代码实现

1 方法1: Set  时间复杂度: O(n);  空间复杂度(n)

```ts
//方法: set   时间复杂度 O(n)；空间复杂度 O(n)
function containsDuplicate(nums: number[]): boolean {
  let numMap = new Set();
  for (let num1 of nums) {
    if (numMap.has(num1)) return true;
    numMap.add(num1);
  }
  return false;
}
```
