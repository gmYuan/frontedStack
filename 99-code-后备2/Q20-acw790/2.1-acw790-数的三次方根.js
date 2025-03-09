// 给定一个浮点数 n，求它的三次方根。
// 注意，结果保留 6位小数。
// 数据范围 −10000 ≤ n ≤ 10000

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  console.log(cubicRoot(parseFloat(input)));
  rl.close();
});


function cubicRoot(n) {
  let l = -10000, r = 10000
  // 经验取值: 一般取 要求的保留小数位数 + 2
  // 易错点1: 1 ^ 10e-8 写作是 1e-8
  while (r - l > 1e-8) {
    // 易错点2: 不能是 l + r >> 1 取整，因为求的是浮点数
    const mid = (l + r) / 2
    // 易错点3: ^ 在JS里是 异或运算符，可以用 Math.pow
    if (mid * mid * mid <= n) {
      l = mid
    } else {
      // 易错点4: 不能是 r = mid - 1，因为求的是浮点数的立方根
      // 对于连续的实数解，需要通过不断缩小区间来逼近解，
      // 而不能像整数二分那样，可以直接跳过某些值
      r = mid
    }
  }
  // 结果需要保留6位小数
  return l.toFixed(6)
}

