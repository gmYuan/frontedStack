/** 

75. 颜色分类

给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，
原地 对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

必须在不使用库内置的 sort 函数的情况下解决这个问题。

 
示例 1：
输入：nums = [2,0,2,1,1,0]
输出：[0,0,1,1,2,2]

示例 2：
输入：nums = [2,0,1]
输出：[0,1,2]
*/


/**
Do not return anything, modify nums in-place instead.
*/
function sortColors(nums) {
  // [0, p0]都等于0；[p0+1, cur)都等于1；[p2, len-1]都等于2
  // [cur, p2) 是 当前待处理的数
  let p0 = -1, p2 = nums.length, cur = 0;
  while (cur < p2) {
    let x = nums[cur];
    if (x === 0) swap(nums, ++p0, cur++);
    if (x === 1) cur++;
    if (x === 2) swap(nums, --p2, cur);
  }
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
