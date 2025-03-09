# LeetCode39- 组合总和

1 思维关键词: 
  - 方法1: 回溯法

2 参考文档

[01-参考实现](https://leetcode.cn/problems/combination-sum/solutions/2363929/39-zu-he-zong-he-hui-su-qing-xi-tu-jie-b-9zx7/)



## 代码实现

1 方法1: 回溯法 时间复杂度: 近似于O(n * 2^n);  空间复杂度: O(target)

```ts
function combinationSum(candidates: number[], target: number): number[][] {
  let res = [], curRes = [];
  candidates.sort((a, b) => a - b);
  dfs(candidates, target, res, curRes, 0);
  return res;
};

function dfs(arr, target, res, curRes, start) {
  if (target === 0) {
    res.push([...curRes]);
    return;
  }
  // 剪枝1：从 start 开始遍历，避免生成重复子集
  for (let i = start; i < arr.length; i++) {
    // 剪枝2：若子集和 超过target ，则直接结束循环
    // 因为数组已排序，后边元素更大，子集和一定超过 target
    if (target - arr[i] < 0) {
      break;
    }
    curRes.push(arr[i]);
    dfs(arr, target - arr[i], res, curRes, i);
    curRes.pop();
  }
}
```

