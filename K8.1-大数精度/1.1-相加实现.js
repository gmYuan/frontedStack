const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
})
const inputs = []

readline.on("line", (s)=>{
  inputs.push(s)
})

readline.on("close", ()=>{
  const num1 = inputs[0]
  const num2 = inputs[1]
  const res = bigAdd(num1, num2)
  console.log(res);
})


function bigAdd(num1, num2) {
  let res = "";
  let p1 = num1.length - 1, p2 = num2.length - 1, carry = 0;
  while (p1 >= 0 || p2 >= 0) {
    // 易错点: 需要转化为Number类型，防止是字符类型相加
    let sum = (Number(num1[p1--]) || 0) + (Number(num2[p2--]) || 0) + carry;
    let cur = sum % 10;
    carry = Math.floor(sum / 10);
    res = cur + res;
  }
  if (carry) res = carry + res;
  return res;
}
