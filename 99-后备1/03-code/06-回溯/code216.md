# LeetCode216- 组合总和 III

1 思维关键词: 
  - 方法1: 回溯法

2 参考文档

[01-参考实现](https://leetcode.cn/problems/combination-sum-iii/solutions/409295/shou-hua-tu-jie-216-zu-he-zong-he-iii-by-xiao_ben_/)


## 代码实现

1 方法1: 回溯法 时间复杂度: O(M * 2^M);  空间复杂度: O(M + k)，其中M = 9

```ts
function combinationSum3(k: number, n: number): number[][] {
  let res = [], path = [];
  backTrack(n, k, res, path, 1);
  return res;
}

function backTrack(target, maxDepth, res, path, depthStart) {
  if (maxDepth === 0) {
    if (target === 0) {
      res.push([...path]);
    }
    return;
  }
  for (let i = depthStart; i <= 9; i++) {
    if (i > target) break;
    path.push(i);
    backTrack(target - i, maxDepth - 1, res, path, i + 1);
    path.pop();
  }
}
```

