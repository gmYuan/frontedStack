function bigSub(num1, num2) {
  // 按 低位--> 高位的 顺序传入arr
  let arr1 = String(num1).split("").reverse();
  let arr2 = String(num2).split("").reverse();
  // 让传入的必然是a >= b
  if (compare(arr1, arr2)) {
    return subImp(arr1, arr2);
  } else {
    // 此时说明num1 < num2，需要在结果前加上负数
    return "-" + subImp(arr2, arr1);
  }
}

// 比较arr1和arr2大小，返回是否有 arr1>= arr2
function compare(arr1, arr2) {
  if (arr1.length !== arr2.length) return arr1.length > arr2.length;
  // 易错点1: 需要 倒序从 高位-->低位 比较每一位
  for (let i = arr1.length - 1; i >= 0; i--) {
    if (arr1[i] !== arr2[i]) return arr1[i] > arr2[i];
  }
  // 运行到这一步，说明每一位都相等，则arr1 >= arr2 还是成立的
  return true;
}

// 传入参数会保证 a>=b, 且是按 低位--> 高位的 顺序
function subImp(a, b) {
  let res = [];
  let carry = 0;
  for (let i = 0; i < a.length; i++) {
    let val = Number(a[i]) - (Number(b[i]) || 0) - carry;
    // 重点:  (curVal + 10) % 10 的表达式能 同时处理相减后 正数和负数的情况
    res.push((val + 10) % 10);
    carry = val < 0 ? 1 : 0;
  }
  // 会有存在前导0的情况，比如比如计算 1000 - 999 = 001
  // 易错点2: 需要确保 res.length > 1，不然当结果是0时，会返回空字符串
  while (res[res.length - 1] === 0 && res.length > 1) res.pop();
  return res.reverse().join("");
}


let ex = bigSub(123, 456);
console.log(ex);
