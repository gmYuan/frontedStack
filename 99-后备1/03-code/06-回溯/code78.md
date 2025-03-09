# LeetCode78- 子集

1 思维关键词: 
  - 方法1: 二进制子集枚举
  - 方法2: 回溯法

2 参考文档

[01-参考实现](https://leetcode.cn/problems/subsets/solutions/420294/zi-ji-by-leetcode-solution/)


## 代码实现

1 方法1 二进制子集枚举 时间复杂度: O(n * 2^n);  空间复杂度: O(n)

```ts
function subsets(nums: number[]): number[][] {
  const res = [];
  const n = nums.length;
  for (let state = 0; state < (1 << n); state++) {
    res.push(getPath(nums, state))
  }
  return res;
};

function getPath(arr, state) {
  let path = [], idx = 0
  while (state) {
    if (state & 1) {
      path.push(arr[idx])
    }
    state>>=1
    idx++
  }
  return path
}
```


2 方法2: 回溯法 时间复杂度: O(n * 2^n);  空间复杂度: O(n)

```ts
function subsets(nums: number[]): number[][] {
  let res = [], path = []
  backTrack(nums, res, path, 0)
  return res
};

function backTrack(arr, res, path, depthStart) {
  res.push([...path])
  for (let i = depthStart; i < arr.length; i++) {
    path.push(arr[i])
    backTrack(arr, res, path, i+1)
    path.pop()
  }
}
```


