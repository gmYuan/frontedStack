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
  const [q, r] = bigDiv(a, b);
  console.log(q);
  console.log(r);
});

// num1是正整数大数，num2是正整数 较小的数
function bigDiv(num1, num2) {
  if (num1 == 0) return ["0", 0];
  // 其实除法不需要 从低位-->高位，这里为了和其他操作保持统一就也反转位数了
  const arr1 = String(num1).split("").reverse();
  num2 = Number(num2);
  let q = [], r = 0;
  // 除法特殊地方: 从高位-->低位处理
  for (let i = arr1.length - 1; i >= 0; i--) {
    const curVal = Number(arr1[i]) + r * 10;
    q.push(Math.floor(curVal / num2));
    r = curVal % num2;
  }
  // 去除商的前置0，比如 011 ÷ 5, 此时商为 02，需要去除前置0
  while (q.length > 1 && q[0] === 0) q.shift();
  return [q.join(""), r];
}
