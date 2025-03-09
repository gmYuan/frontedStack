const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n = null;
let m = null;
let list = null;
const query = [];

rl.on("line", (line) => {
  const l = line.split(" ").map((i) => Number(i));
  if (n === null) {
    n = l[0];
    m = l[1];
  } else if (list === null) {
    list = l;
  } else {
    query.push(l);
  }
});

rl.on("close", () => {
  const res = prefixSum(list, query);
  console.log(res);
});


// list是输入数组内容， query为[[ l1,r1], [l2,r2] ]的查询数组
function prefixSum(list, query) {
  let res = "";
  // 求 list[l~r]范围内的 前缀和
  // 根据 an数组 , 可以直接构建出sn数组，从而以O(1)时间获取到 sn的值
  let sn = [0];

  // 易错点: 这里需要 <= list.length 而不是 < list.length
  // 因为 i 和 sn的idx 是一一对应的，想让sn的idx 取到list的元素个数
  // 就得让 i 取到 list.length
  // 注意an的idx 比 i 向左偏移一个位置了一个位置，所以是加上 list[i-1]
  // 一个技巧是：所有偏移相关的，都可以理解为是 对应n个位置后的 “分隔线”
  for (let i = 1; i <= list.length; i++) {
    sn[i] = sn[i - 1] + list[i - 1];
  }

  // 依次获取[ l1,r1], [l2,r2]的 sn值
  for (let [l, r] of query) {
    // 这里需要 明确 l1 + l1+1 + ... r1的和 sum[l~r]， 它和 sn[r] & sn[l] 的转化关系
    // 通过 “画数轴”的 方式，就可以很直观得出关系：sum[l~r] = sn[r] - sn[l-1]
    res += `${sn[r] - sn[l - 1]}\n`;
  }

  // 去除最后一个换行符
  return res.slice(0, -1);
}
