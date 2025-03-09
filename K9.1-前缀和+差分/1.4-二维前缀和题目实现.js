const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n = null;
let m = null;
let q = null;
const grid = [];
const query = [];

rl.on("line", (line) => {
  const l = line.split(" ").map((i) => Number(i));
  if (n === null) {
    n = l[0];
    m = l[1];
    q = l[2];
  } else if (grid.length < n) {
    grid.push(l);
  } else {
    query.push(l);
  }
});

rl.on("close", () => {
  const res = querySum(n, m, q, grid, query);
  console.log(res.join("\n"));
});


// n: 表示网格的行数; m: 表示网格的列数; q: 表示查询的次数
// grid: 这是一个n × m的 二维数组
// query: 这是一个二维数组, 每行包含 4 个数字
function querySum(n, m, q, grid, query) {
  const sum = initSum(grid)
}


function initSum(grid) {
  let res = [[0]]

}
