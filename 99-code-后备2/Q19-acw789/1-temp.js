// 789 数的范围
// 给定一个按照升序排列的长度为 n 的整数数组，以及 q 个查询。
// 对于每个查询，返回一个元素 k 的起始位置和终止位置（位置从 0开始计数）。
// 如果数组中不存在该元素，则返回 -1 -1

// 输入样例：
// 6 3
// 1 2 2 3 3 4
// 3
// 4
// 5
// 输出样例：
// 3 4
// 5 5
// -1 -1

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputArr = [];
let n, m;
let q = [];

rl.on("line", function (line) {
  inputArr.push(line.trim());

  // 第一行输入 n 和 m
  if (inputArr.length === 1) {
    [n, m] = inputArr[0].split(" ").map(Number);
  }
  // 第二行输入数组
  else if (inputArr.length === 2) {
    q = inputArr[1].split(" ").map(Number);
  }
  // 处理每个查询
  else if (inputArr.length === 2 + m) {
    // 处理所有查询
    for (let i = 2; i < inputArr.length; i++) {
      const x = Number(inputArr[i]);
      console.log(findRange(q, x));
    }
    rl.close();
  }
});

function findRange(nums, x) {
  const len = nums.length;
  // 查找左边界: >=x的最小值，就必然是 等于x的最左侧位置
  let l = 0, r = len - 1;
  // 获取 >=x 的最小值
  while (l < r) {
    let mid = (l + r) >> 1;
    const midVal = nums[mid];
    // 如果 midVal < x，说明 [l, mid]都<x，不是我们所需要的，所以左区间向右扩增
    if (midVal < x) l = mid + 1;
    // 如果 midVal >= x，说明 [mid, r]都>=x，而 我们要找的是最小的>=x的位置， 所以 右区间需要收缩
    else r = mid;
  }
  // 如果没找到目标值，说明nums中必然没有x，直接返回 -1 即可
  if (nums[l] !== x) return "-1 -1";
  // 记录左边界
  const resL = l;

  // 查找右边界: <=x的最大值，就必然是 等于x的最右侧位置
  l = 0, r = len - 1;
  while (l < r) {
    // 易错点: 这里需要 +1, 是因为在相邻数位置情况下，如果还是向下取整，l会一直赋值为mid，陷入死循环
    let mid = (l + r + 1) >> 1;
    const midVal = nums[mid];
    // 如果arr[mid] <= x，说明 [l, mid]都<=x，而 我们要找的是最大的<=x的位置， 所以 左区间需要扩增
    if (midVal <= x) l = mid;
    // 如果 arr[mid] > x，说明 [mid, r]都>x，不是我们所需要的， 所以 右区间需要收缩
    else r = mid - 1;
  }

  // 返回结果
  return `${resL} ${l}`;
}
