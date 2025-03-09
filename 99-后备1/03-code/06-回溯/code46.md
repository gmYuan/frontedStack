# LeetCode46- 全排列

1 思维关键词: 
  - 方法1: 回溯

2 参考文档

[01-参考实现](https://github.com/liuyubobobo/Play-Leetcode/blob/master/0001-0500/0046-Permutations/java-0046/src/Solution1.java)



## 代码实现

1 方法1: 回溯  时间复杂度: O(n * n!);  空间复杂度: O(n)

```ts
let used = []

function permute(nums: number[]): number[][] {
  if (!nums|| !nums.length) return [];
  let res = [];  let depthRes = []
  used = new Array(nums.length)
  dfs(nums, 0, depthRes, res)
  return res
};

function dfs(nums, depthIdx, depthRes, res) {
  if (depthIdx === nums.length) {
    res.push([...depthRes])
    return;
  }
  for (let i = 0; i < nums.length; i++) {
    if (!used[i]) {
      used[i] = true
      depthRes.push(nums[i])
      dfs(nums, depthIdx+1, depthRes, res)
      // 执行到此说明进入了回溯阶段，则重置标识位+弹窗递阶段存入的当前成员
      used[i] = false
      depthRes.pop()
    }
  }
}

/** 

                             [1, 2, 3]
depth=0        1(x-√->x)                           2            3
                   |              
depth=1     1(/)  2(x->√->x)             3(x->√->x)
                      |                     |
depth=2   1(/)  2(/)  3(x->√->x)     1(/)  2(x->√->x)  3(/)
                      |                     |
depth=3             [1,2,3]               [1,3,2]
*/
```

