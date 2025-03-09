# LeetCode15- 三数之和

## 实现思路

1 思维关键词: 数组排序 + 头尾指针

## 参考文档

[01 直接参考实现](https://leetcode.cn/problems/3sum/solution/pai-xu-shuang-zhi-zhen-zhu-xing-jie-shi-python3-by/)


## 代码实现

方法1: arr.sort()+头尾指针  时间复杂度: O(n^2)  空间复杂度: O(1)

```ts
function threeSum(nums: number[]): number[][] {
  let res = [];
  // S1 首先进行排序，使其成为有序数组
  nums.sort((a, b) => a - b);
  const len = nums.length;
  // 优化点1: 当长度少于3个，肯定无对应解
  if (len < 3) return res

  // S2 遍历数组，并设置 i + 双指针[front, tail]
  for (let i = 0; i < len; i++) {
    // 优化点2: 当长度少于3个，肯定无对应解
    if (nums[i] > 0) return res;
    // S3 易错点1: 当数组有序+当前成员值等于 之前处理过的元素成员时，直接跳过
    // 这样才能避免res里有重复结果
    if (i > 0 && nums[i] === nums[i-1]) continue;
    // S4 设置双指针
    let front = i + 1, tail = len - 1;
    while (front < tail) {
      // 易错点2:  由于会更新front/tail指针，所以每次结果都需要重新计算
      let total = nums[i] + nums[front] + nums[tail];
      // S5 当和等于0时，要跳过排序后的左右重复元素，以避免res里有重复结果
      if (total === 0) {
        while (nums[front] === nums[front + 1]) {
          front++;
        }
        while (nums[tail] === nums[tail - 1]) {
          tail--;
        }
        res.push([nums[i], nums[front], nums[tail]]);
        //易错点3: 存入值后要继续更新头尾指针，因为此时后面可能还有其他组合结果
        front++;
        tail--;
      // S6 当和不等于0时，根据差值决定是增大最小值/ 减小最大值
      } else if (total < 0) {
        front++;
      } else if (total > 0) {
        tail--;
      }
    }
  }
  return res;
}
```
