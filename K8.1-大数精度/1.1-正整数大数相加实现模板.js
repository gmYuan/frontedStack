function addLargeNumber(num1, num2) {
  let num1Arr = String(num1).split("").reverse();
  let num2Arr = String(num2).split("").reverse();
  let res = addImp(num1Arr, num2Arr);
  return res.reverse().join("");
}

function addImp(nums1, nums2) {
  let res = [];
  let carry = 0;
  for (let i = 0; i < nums1.length || i < nums2.length; i++) {
    let curVal = (+nums1[i] || 0) + (+nums2[i] || 0) + carry;
    res.push(curVal % 10);
    carry = Math.floor(curVal / 10);
  }
  if (carry) res.push(carry);
  return res;
}

let ex = addLargeNumber(123, 456);
console.log(ex);


// 有一种简化写法是:
function bigAdd(num1, num2) {
  let res = "";
  let p1 = num1.length - 1, p2 = num2.length - 1, carry = 0;
  while (p1 >= 0 || p2 >= 0) {
    // 易错点1: 需要转化为Number类型，防止是字符类型相加
    let sum = (Number(num1[p1--]) || 0) + (Number(num2[p2--]) || 0) + carry;
    let cur = sum % 10;
    carry = Math.floor(sum / 10);
    // 易错点2: 由于是从后向前的，所以当前位的计算结果 要放在最前面
    res = cur + res;
  }
  if (carry) res = carry + res;
  return res;
}