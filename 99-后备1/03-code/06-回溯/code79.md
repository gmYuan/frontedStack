# LeetCode79- 单词搜索

1 思维关键词: 
  - 方法1: 回溯法

2 参考文档

[01.1-方法1-参考实现](https://github.com/liuyubobobo/Play-Leetcode/blob/master/0001-0500/0079-Word-Search/java-0079/src/Solution.java)

[01.2-方法1-图示](https://leetcode.cn/problems/word-search/solutions/12096/zai-er-wei-ping-mian-shang-shi-yong-hui-su-fa-pyth/)


## 代码实现

1 方法1: 回溯法  时间复杂度: O((m*n)^2);  空间复杂度: O(m*n)

```ts
let m = 0, n = 0;
let visited = [];
let pos = [ [-1, 0], [0, 1], [1, 0], [0, -1] ];

function exist(board: string[][], word: string): boolean {
  if (!board || !word) return false;
  m = board.length;
  n = board[0].length;
  // 易错点: 不要使用array.fill填充引用类型的值，他们的引用地址会是同一个
  visited = Array.from({ length: m }, () => Array(n).fill(false));
  // 遍历 + 递归回溯
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (search(board, word, i, j, 0)) {
        return true;
      }
    }
  }
  return false;
};

function search(board, word, x, y, index) {
  if (index === word.length - 1) {
    return board[x][y] === word[index];
  }

  if (board[x][y] === word[index]) {
    visited[x][y] = true;
    for (let nextPos = 0; nextPos < 4; nextPos++) {
      // 分别尝试获取【上右下左的成员值】 是否和 word[index+1]相等
      let newX = x + pos[nextPos][0];
      let newY = y + pos[nextPos][1];
      // 易错点2: 需要尝试所有4种方向的结果，而不是由 只是其中一个方向的结果决定
      if (
        inArea(newX, newY) &&
        !visited[newX][newY] &&
        search(board, word, newX, newY, index + 1)
      ) {
        return true;
      }
    }
    visited[x][y] = false;
  }
  return false;
}
// 行列坐标点list[x,y]在合法边界内
function inArea(x, y) {
  return x >= 0 && x < m && y >= 0 && y < n;
}
```
