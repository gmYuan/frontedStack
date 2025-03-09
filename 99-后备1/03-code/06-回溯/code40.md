# LeetCode40- 组合总和II

1 思维关键词: 
  - 方法1: 回溯法

2 参考文档

[01-参考实现](https://leetcode.cn/problems/combination-sum-ii/solutions/2363941/40-zu-he-zong-he-iihui-su-qing-xi-tu-jie-7y8s/)



## 代码实现

1 方法1: 回溯法 时间复杂度: 近似于O(n * 2^n);  空间复杂度: O(target)

```ts
/**
 * 0             1          2    2    5
 * 1         2,  2, 5
 * 2        2,5
 * 3        5,/
 */

function combinationSum(candidates: number[], target: number): number[][] {
  const res = [], depthRes = [];
  // 需要进行排序
  candidates.sort((a, b) => a - b);
  backTrack(candidates, target, res, depthRes, 0);
  return res;
};

function backTrack(arr, target, res, depthRes, deepStart) {
  if (target === 0) {
    res.push([...depthRes]);
    return;
  }
  // 剪枝1：从 deepStart开始遍历，避免生成重复子集 + 重复选择同一元素
  for (let i = deepStart; i < arr.length; i++) {
    // 剪枝2：若子集和 超过target ，则直接结束循环
    // 因为数组已排序，后边元素更大，子集和一定超过 target
    const newTarget = target - arr[i];
    if (newTarget  < 0) {
      break;
    }
    // 剪枝3: 如果该元素与左边元素相等，说明该搜索分支重复，直接跳过
    if (i > deepStart && arr[i] === arr[i - 1]) {
      continue;
    }
    depthRes.push(arr[i]);
    // 需要注意下一层开始的元素是i+1,从而过滤掉当前的重复元素
    backTrack(arr, newTarget, res, depthRes, i + 1);
    depthRes.pop();
  }
}
```

