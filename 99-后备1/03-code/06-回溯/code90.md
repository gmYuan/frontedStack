# LeetCode90- 子集II

1 思维关键词: 
  - 方法1: 回溯法
  - 方法2: 二进制去重法

2 参考文档

[01-方法1参考实现](https://leetcode.cn/problems/subsets-ii/solutions/690866/90-zi-ji-iiche-di-li-jie-zi-ji-wen-ti-ru-djmf/)

[02-方法2参考实现](https://leetcode.cn/problems/subsets-ii/solutions/10090/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by-19/)


## 代码实现

1 方法1: 回溯法  时间复杂度: O(n * 2^n);  空间复杂度: O(n)

```ts
function subsetsWithDup(nums: number[]): number[][] {
  let res = [], path = [];
  nums.sort((a, b) => a - b);
  backTrack(nums, res, path, 0);
  return res;
};

function backTrack(arr, res, path, start) {
  res.push([...path]);
  for (let i = start; i < arr.length; i++) {
    // 易错点1: 是 i > start而不是 i > 0; i > start才说明是同层的相同元素
    if (i > start && arr[i - 1] === arr[i]) {
      continue;
    }
    path.push(arr[i]);
    // 易错点2: 递归是沿着横向遍历下去的，所以是以i为基准，而不是depthStart
    backTrack(arr, res, path, i + 1);
    path.pop();
  }
}
```


2 方法2: 二进制去重法  时间复杂度: O(n * 2^n);  空间复杂度: O(n)

```ts
function subsetsWithDup(nums: number[]): number[][] {
  let res: Map<string, Array<number>> = new Map();
  const n = nums.length;
  nums.sort((a, b) => a - b);
  for (let state = 0; state < 1 << n; state++) {
    const path = [];
    for (let i = 0; i < n; i++) {
      if (state & (1 << i)) {
        path.push(nums[i]);
      }
    }
    const key = path.join("");
    if (!res.has(key)) {
      res.set(key, path);
    }
  }
  return Array.from(res.values());
};
```