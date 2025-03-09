// 27. 两数之和
// 给定一个整数数组 nums 和一个整数目标值 target，
// 请你在该数组中找出 和为目标值target 的那两个整数，并返回它们的数组下标

// 你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。
// 你可以按任意顺序返回答案。
// 只会存在一个有效答案

// 示例 1：
// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1]

// 示例 3：
// 输入：nums = [3,3], target = 6
// 输出：[0,1]

function twoSum(nums, target) {
  // 存储之前出现过的元素，key为数字值，value为数字值所在的索引
  let record = new Map();
  for (let i = 0; i < nums.length; i++) {
    record.set(nums[i], i);
  }
  for (let v1 of nums) {
    const v2 = target - v1
    if (record.has(v2)) {
      reutrn [record.get(v1), record.get(v2)]
    }
  }
  return [];
}
