# LeetCode47- 全排列 II

1 思维关键词: 
  - 方法1: 回溯法  时间复杂度: O(n * n!)

2 参考文档

[01-参考实现](https://github.com/liuyubobobo/Play-Leetcode/blob/master/0001-0500/0047-Permutations-II/cpp-0047/main.cpp)

3 思路解析：
  全排列 就是把所有可能的组合列出来
  排序能够帮助我们在创建组合时检查重复项
  回溯的三个关键步骤是 选择，处理结果，撤销选择

实现步骤：
 S1 初始化变量:
   - 结果二维数组res
   - path数组: 存放每一次递归中的单个路径结果
   - 布尔数组: 标记 每个元素是否已被使用过
 
 S2 执行回溯算法:
   S2.1 对输入的数组，进行排序：为了将重复的元素相邻，用于后续排除 同深度层的重复元素
   S2.2 backtrack的宏观语义是：处理[0/1/2/...n-1,n-1]位的nums，获取它的全排列，其中每一位就是一层深度==> 位数和层挂钩
   S2.3 关键技巧是，used[i]既能标识了已处理的的位数元素，还标识了当前重复值是非同一层(为true)还是 同一层(为false)

            1(√[1]==> x,[])                                                           1(x)     2
               ↓ ↑(超出循环)        
    1(x)    1(√[1,1]==> x,[1])          2(√[1,2]==> x,[1])
               ↓↑(超出循环)                 ↓  ↑(超出循环)   
  1(x) 1(x)  2(√[1,1,2]==> x,[1,1])      1(x) 1(√[1,2,1]==> x,[1,2])   2(x)
               ↓          ↑(递归中止)              ↓↑(递归中止)      
            [1,1,2]                            [1,2,1]
 

## 代码实现

1 方法1: 回溯法 时间复杂度: O(n * n!);  空间复杂度: O(n^2)

```ts
function permuteUnique(nums) {
  if (!nums.length) return []
  const res = [];
  const used = new Array(nums.length).fill(false);
  // 关键点1: 排序,用于后续排除 同深度层的重复元素
  nums.sort((a, b) => a - b); 
   // 执行回溯
  backtrack([]);
  // 返回结果
  return res; 

  // 处理[0/1/2/...n-1,n-1]位的nums，获取它的全排列
  function backtrack(path){
    if (path.length == nums.length) {
      // 易错点1: 引用类型值，在回溯时 需要进行浅拷贝
      res.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      // 剪枝条件: 该位置元素被使用过，或者 当前值和前一个元素值相同并且前一个值没被使用过(说明是 处于同层深度的后一位重复元素)
      if (used[i] || (i > 0 && nums[i] == nums[i - 1] && !used[i - 1])) {
        continue; 
      }
      // 做选择 + 标记已做选择
      // 关键点2: used[i]既能标识了已处理的的位数元素，还标识了当前重复值是非同一层还是 同一层
      path.push(nums[i]); 
      used[i] = true; 
      // 进入下一层决策树
      backtrack(path); 
      // 撤销选择 + 标记未做选择
      path.pop(); 
      used[i] = false;
    }
  };
}
```

