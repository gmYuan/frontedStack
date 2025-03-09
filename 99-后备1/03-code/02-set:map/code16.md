# LeetCode16-最接近的三数之和

## 实现思路

1 思维关键词: 数组排序 + 头尾指针 + Math.abs()

## 参考文档

[01 直接参考实现](https://leetcode.cn/problems/3sum-closest/solution/dui-shuang-zhi-zhen-fa-jin-xing-yi-dian-you-hua-da/)


## 代码实现

方法1: arr.sort()+头尾指针+Math.abs()  时间复杂度: O(n^2)  空间复杂度: O(1)

```ts
function threeSumClosest(nums: number[], target: number): number {
  // S1 首先进行排序
  nums = nums.sort((a, b) => a - b);
  let res = Number.MAX_VALUE;

  // S2 遍历 + 头尾指针法
  for (let i = 0; i < nums.length; i++) {
    let front = i + 1, tail = nums.length - 1;
    while (front < tail) {
     /** 可选的优化点 */ 
     // 判断最小值: 如果target < 当前最小值 + res比当前min要大，则更新res + 提前跳出循环
     const min = nums[i] + nums[front] + nums[front + 1];
      if (target < min && res > min) {
        res = min;
        break;
      }
      //判断最大值: 如果target > 当前最大值 + res比当前max要大，同上提前跳出循环
      const max = nums[i] + nums[tail] + nums[tail - 1];
      if (target > max && res > max) {
        res = max;
        break;
      }
      /** 可选的优化点 */ 

      // S3.1 记录当前total值 + 记录 当前total/上一次total(res)和 target的距离
      const total = nums[i] + nums[front] + nums[tail];
      const curDis = Math.abs(total - target);
      const preDis = Math.abs(res - target);
      // S3.2 如果total正好等于target,说明找到最接近的值了，直接返回即可
      if (total === target) {
        return target;
      }
      // S3.3 如果本次结果和target的距离小于上次的，就需要记录更新res结果
      if (curDis < preDis) {
        res = total;
      }
      // S3.4 继续更新front和tail指针，从而尝试找更加接近target的total
      if (total < target) {
        front++;
      } else if (total > target) {
        tail--;
      }
    }
  }
  return res;
}
```
