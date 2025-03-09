# LeetCode200- 岛屿数量

1 思维关键词: 
  - 方法1: dfs-递归实现
  - 方法2: bfs-队列实现
  - 方法3: 并查集 + Set

这是一个图搜索问题。
在这个问题中，我们可以把整个二维网格看成一个图，每个单元格是图的一个节点。
如果两个陆地单元格（值为'1'）上下或者左右相邻，我们就认为它们之间有一条边。

问题中，岛屿被定义为由相邻陆地单元格组成的区域，这可以看作图中的一个连通分量（Connected Component），即一个子图，
这个子图中的任意两个节点都存在一条路径相连。

所以，这个问题可以被抽象为：在给定图中寻找连通分量(子图)的数量。

为了解决这个问题，我们可以使用图的遍历算法，例如深度优先搜索（DFS）或者广度优先搜索（BFS）。
具体做法是：遍历二维网格的每一个单元格，当遇到值为'1'的单元格，且其未被访问过时，我们就从这个单元格出发，
对未访问过的相邻陆地单元格进行搜索，完成一次搜索就可以发现一个岛屿（一个连通分量）。
然后，继续检查剩余单元格，直到所有单元格都被检查完毕，这样我们就找到了所有的岛屿。
此外，我们也需要一个和网格同样大小的二维数组（或者修改原有的网格）来记录每个单元格是否被访问过，以防将同一个岛屿计数多次。

2 参考文档

[01.1-方法1-参考实现](https://github.com/liuyubobobo/Play-Leetcode/blob/master/0001-0500/0200-Number-of-Islands/java-0200/src/Solution.java)

[01.2-方法1-图示](https://leetcode.cn/problems/number-of-islands/solutions/211211/dao-yu-lei-wen-ti-de-tong-yong-jie-fa-dfs-bian-li-/)


[02-方法2-参考实现](https://github.com/liuyubobobo/Play-Leetcode/blob/master/0001-0500/0200-Number-of-Islands/java-0200/src/Solution3.java)

[03-并查集-参考实现](https://github.com/liuyubobobo/Play-Leetcode/blob/master/0001-0500/0200-Number-of-Islands/java-0200/src/Solution4.java)

[03-2-并查集数据结构](https://segmentfault.com/a/1190000022952886)


## 代码实现

1 方法1: dfs-递归实现  时间复杂度: O(m*n);  空间复杂度: O(m*n)

```ts
let m = 0, n = 0
let visited = [[]]
let pos = [[-1, 0], [0,1], [1, 0], [0, -1]]

function numIslands(grid: string[][]): number {
  if (!grid || !grid.length || !grid[0].length) return 0;
  // 变量定义
  let res = 0
  m = grid.length, n = grid[0].length
  visited = Array.from({length: m}).map(() => Array(n).fill(false))
  // 循环 + dfs
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 只有遇到没访问过+是岛屿的节点，才会去尝试 寻找其上下左右相邻的节点
      if (!visited[i][j] && grid[i][j] === '1') {
        dfs(grid, i, j)
        res++
      }
    }
  }
  return res 
};

function dfs(grid, x, y) {
  // 递归中止条件：该节点超出边界 || 该节点被访问过 || 该节点不是岛屿
  if (!inArea(x, y) || visited[x][y] || grid[x][y] !== "1") return;
  // 本轮行为: 标记岛屿被访问 && 寻找其可以连接成边的 节点
  visited[x][y] = true;
  for (let nextPos = 0; nextPos < 4; nextPos++) {
    let newX = x + pos[nextPos][0];
    let newY = y + pos[nextPos][1];
    dfs(grid, newX, newY)
  }
}

function inArea(x, y) {
  return x >= 0 && x < m && y >= 0 && y < n
}
```

2 方法2 bfs  时间复杂度: O(m*n);  空间复杂度: O(m*n)

```ts
/**
DFS（深度优先遍历）
  - DFS的主要思想是“深入”搜索，
    也就是说，只要当前路径还可继续，就尽可能往前走，直到走不通了，
    再回退到上一个节点，然后再选择另一个未访问过的节点继续搜索
  - DFS更像是在迷宫中寻找出路，我们持续向前走，直到无法继续，然后回头再找新的路径

BFS（广度优先遍历
  - 相比于DFS的深入，BFS的主要思想是“扩展”搜索，
    也就是说，每次搜索都尽可能访问当前节点的所有邻居，直到所有节点都被遍历过
  - BFS更像是在遍历一颗树，我们按照层级，从上到下，从左到右一层层的进行遍历
  
最本质的区别
  - DFS和BFS的最本质区别在于遍历的顺序，
    DFS是尽快深入，然后回溯；
    BFS则是尽可能广地遍历所有邻居
  - 因此，DFS的路径更加“深”，适合找所有路径，或者在路径很深的情况下找答案；
    BFS的路径更加“广”，适合寻找最短路径，或者在答案离根近的情况下快速找到答案。
*/

let m = 0, n = 0
let visited = [[]]
let pos = [[-1, 0], [0,1], [1, 0], [0, -1]]

function numIslands(grid: string[][]): number {
  if (!grid || !grid.length || !grid[0].length) return 0;
  m = grid.length, n = grid[0].length
  visited = Array.from({length: m}).map(() => Array(n).fill(false))
  let res = 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j] && grid[i][j] === '1') {
        bfs(grid, i, j)
        res++
      }
    }
  }
  return res
};

function bfs(grid, x, y) {
  visited[x][y] = true;
  let queue = [{ x, y }];
  while (queue.length) {
    const curNode = queue.shift();
    for (let nextPos = 0; nextPos < 4; nextPos++) {
      const newX = curNode.x + pos[nextPos][0];
      const newY = curNode.y + pos[nextPos][1];
      if (
        inArea(newX, newY) &&
        !visited[newX][newY] &&
        grid[newX][newY] === "1"
      ) {
        // 易错点: bfs需要入队前手动标记已访问过
        visited[newX][newY] = true
        queue.push({ x: newX, y: newY });
      }
    }
  }
}

function inArea(x, y) {
  return x >= 0 && x < m && y >= 0 && y < n
}
```

3 方法3 并查集 + Set  时间复杂度: O(m*n);  空间复杂度: O(m*n)

```ts
/**

将一个(i, j)的二维坐标 转化为一维坐标 的过程
假设我们有一个m行 n列的二维数组，我们需要将二维坐标(i, j)转化为一维的索引: 

S1 对于行的编号i（假设从0开始），它代表了我们已经过了多少个完整的“行”
每一个行有n个元素（列的数量）所以，我们已经过了i*n个元素

S2 我们又在当前的行i之中走过了j列，那么总共就走过了i*n + j个元素

S3 因此，二维坐标(i, j)就对应着一维的索引i*n + j
*/

let m = 0, n = 0;
let pos = [ [-1, 0], [0, 1], [1, 0], [0, -1] ];

// 并查集类
class UnionFind {
  constructor(num) {
    this.parent = [...Array(num).keys()];
    this.rank = Array(num).fill(1);
  }
  // 寻找所属树的根节点
  find(p) {
    // 查询时顺带进行 进行路径压缩，以减少树的高度
    while (p !== this.parent[p]) {
      this.parent[p] = this.parent[this.parent[p]];
      p = this.parent[p];
    }
    return p;
  }
  // 判断2个节点是否属于同一个集合(树)内
  isConnected(p, q) {
    return this.find(p) === this.find(q);
  }
  // 把2个节点合并到同一个集合(树)内
  unionEle(p, q) {
    const pRoot = this.find(p);
    const qRoot = this.find(q);
    if (pRoot === qRoot) return;
    if (this.rank[pRoot] < this.rank[qRoot]) {
      this.parent[pRoot] = qRoot;
    }
    if (this.rank[qRoot] < this.rank[pRoot]) {
      this.parent[qRoot] = pRoot;
      // rank[pRoot] === rank[qRoot]
    } else {
      this.parent[pRoot] = qRoot;
      this.rank[qRoot] += 1;
    }
  }
}

// 判断是否在合法边界内
function inArea(x, y) {
  return x >= 0 && x < m && y >= 0 && y < n;
}

// 主函数
function numIslands(grid: string[][]): number {
  if (!grid || !grid.length || !grid[0].length) return 0;
  (m = grid.length), (n = grid[0].length);
  const uf = new UnionFind(m * n);
  // 把相邻岛屿合并成1个集合内
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 易错点1: 用continue而非break，break会跳过剩下的一整行
      if (grid[i][j] !== "1") continue;
      for (let nextPos = 0; nextPos < 4; nextPos++) {
        let newX = i + pos[nextPos][0];
        let newY = j + pos[nextPos][1];
        if (inArea(newX, newY) && grid[newX][newY] === "1") {
          // 难点: 二维数组坐标 转化为一维数组索引
          uf.unionEle(i * n + j, newX * n + newY);
        }
      }
    }
  }
  // 通过Set收集一共有多少个集合(树),就等价于有多少个岛屿
  let islands = new Set();
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] !== "1") continue;
      islands.add(uf.find(i * n + j));
    }
  }
  return islands.size
};

```