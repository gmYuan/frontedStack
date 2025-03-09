# LeetCode18-四数之和

## 实现思路

1 思维关键词: 数组排序 + 2层循环 + 头尾指针循环 

## 参考文档

[01 直接参考实现](https://leetcode.cn/problems/4sum/solution/shuang-zhi-zhen-jie-fa-can-zhao-san-shu-zhi-he-ge-/)


## 代码实现

方法1: 数组排序+双循环+头尾指针   时间复杂度: O(n^3)  空间复杂度: O(logn)

```ts
function fourSum(nums: number[], target: number): number[][] { 
  let res = [], len = nums.length
  //S1 排序成有序数组
  nums = nums.sort((a,b) => a - b)
  // 第1层循环
  for (let i = 0; i < len-3; i++) {
    //S2 排除nums[i]的重复值
    if (i > 0 && nums[i] === nums[i-1]) continue;
    // 第2层循环
    for (let j = i + 1; j < len-2; j++) {
      // 易错点1: j>i+1，而非j>1，因为j每轮更新都是相对于i来初始化定位的
      //S3 排除nums[j]的重复值
      if (j > i+1 && nums[j] === nums[j-1]) continue;
      // 头尾指针
      let front = j + 1, tail = len-1
      while (front < tail) {
        let total = nums[i] + nums[j] + nums[front] + nums[tail]
        // S4 当和等于target时：存入结果 + 排除nums[front]和nums[tail]的重复值 + 更新指针
        if (total === target) {
          res.push([ nums[i], nums[j], nums[front], nums[tail]])
          while (nums[front] === nums[front+1]) {
            front++
          }
          while (nums[tail] === nums[tail-1]) {
            tail--
          }
          front++
          tail--
        // S4.2 结果小于/大于目标值时，就分别扩大头指针/缩小尾指针
        } else if (total < target) {
          front++
        } else if (total > target) {
          tail--
        }
      }
    }
  }
  return res
};
```
