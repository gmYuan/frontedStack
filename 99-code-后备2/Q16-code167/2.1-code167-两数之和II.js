// code 167. 两数之和 II

// 示例 1：
// 输入：numbers = [2,7,11,15], target = 9
// 输出：[1,2]
// 解释：2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。返回 [1, 2]

function twoSum(numbers, target) {
  let l = 0, r = numbers.length - 1;
  while (l < r) {
    const val = numbers[l] + numbers[r];
    if (val === target) return [l + 1, r + 1];
    val < target ? l++ : r--;
  }
}
