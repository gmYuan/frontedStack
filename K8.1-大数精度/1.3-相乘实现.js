const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let a = null;
let b = null;

rl.on("line", (line) => {
  if (a === null) a = line;
  else if (b === null) b = line;
});

rl.on("close", () => {
  const res = bigMul(a, b);
  console.log(res);
});

// 其中num1是大数, num2是小数，且都是正整数
function bigMul(num1, num2) {
  if (num1 == 0 || num2 == 0) return "0";
  const arr1 = String(num1).split("").reverse();
  let res = "";
  let carry = 0;
  for (let i = 0; i < arr1.length || carry; i++) {
    let curVal = (Number(arr1[i]) || 0) * num2 + carry;
    const bit = curVal % 10;
    carry = Math.floor(curVal / 10);
    res = bit + res;
  }
  return res;
}

