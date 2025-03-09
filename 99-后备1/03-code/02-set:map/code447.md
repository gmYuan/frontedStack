# LeetCode447- 回旋镖的数量

## 实现思路

1 思维关键词: map; 距离平方和公式

2 参考文档：

[01 原因分析](https://leetcode.cn/problems/number-of-boomerangs/solution/447hui-xuan-biao-de-shu-liang-ha-xi-biao-javascrip/)

## 代码实现

```ts
//方法: Map   时间复杂度 O(n^2)； 空间复杂度 O(n)
function numberOfBoomerangs(points) {
  let res = 0;
  for (let p1 of points) {
    let record = new Map();
    for (let p2 of points) {
      let disVal = Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2)
      if (disVal === 0) continue;
      record.set(disVal, (record.get(disVal) || 0) + 1);
    }
    for (let value of record.values()) {
      if (value >= 2) {
        res += value * (value - 1);
      }
    }
  }
  return res;
}
```
