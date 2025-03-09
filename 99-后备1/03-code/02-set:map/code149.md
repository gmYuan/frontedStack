# LeetCode149- 直线上最多的点数

## 实现思路

1 思维关键词: Map + 辗转相除法求最大公约数

## 参考文档

[01 直接参考实现](https://leetcode.cn/problems/max-points-on-a-line/solution/gong-shui-san-xie-liang-chong-mei-ju-zhi-u44s/)

## 代码实现

1 方法1: map  时间复杂度: O(n^2 * logm);  空间复杂度(n)

```ts
function maxPoints(points) {
	let res = 1
	for (const p1 of points) {
		let record = new Map()
    // max含义: 由当前点i发出的直线 所经过的最多点数量
    let max = 0
		for (const p2 of points) {
			const x1 = p1[0], y1 = p1[1]
			const x2 = p2[0], y2 = p2[1]
			const disX = x1 - x2
			const disY = y1 - y2
			// 如果两点相同，直接跳过即可
			if (disX === 0 && disY === 0) continue;
			// 易错点1: 约分后以确保斜率完全相同
			const k = gcd(disX, disY)
			const key = `${disX / k}_${disY / k}`
      // 易错点2: 更新在同一条线上的点的数量
			record.set(key, (record.has(key) ? record.get(key) + 1 : 2 ))
			max = Math.max(max, record.get(key))
		}
    // 内部循环完成后，都更新res值，以获取每轮内外循环的最大值
		res = Math.max(res, max)
	}
	return res
};

// 辗转相除法求最大公约数
function gcd(a: number, b: number): number {
  if (b === 0) return a
  return gcd(b, a % b)
} 
```
