
// 实现一个大整数 和 一个小整数(默认不为0) 相除功能
function bigNumberDiv(num1, num2) {
  // S1 按高位-->低位 顺序生成每位的 数组，从而把大整数num1 转换为 数组
  const arr1 = String(num1).split("");
  // S2 具体大数相除实现
  const [q, r] = divImp(arr1, num2);
  // S3 由于数组结果是按高位-->低位顺序生成，所以不需要再反转了
  return [q.join(""), r];
}


// 具体实现 按位相除，返回 商q数组 和 余数r
function divImp(arr1, b) {
  let q = [], r = 0;
  // 因为 arr1是按 高位-->低位 的顺序，就是除法所需要的 从高位开始处理
  for (let i = 0; i < arr1.length; i++) {
    // 获取每一位的值
    const val = r * 10 + Number(arr1[i]);
    // 获取每一位处理的 商
    q.push(Math.floor(val / b));
    // 获取每一位处理的 余数
    r = val % b;
  }

  // 如果商数组 q 以 0 开头，则需要去掉前导0
  while (q.length > 0 && q[0] === 0) q.shift();
  // 注意 q是按 高位--> 低位返回的，所以之后不需要再反转了
  return [q, r];
}
