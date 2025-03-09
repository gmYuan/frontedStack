/**
 * 图
 * 
 * 分类：
 *   分为稠密图(邻接矩阵) 和 稀疏图(邻接表)；
 *   稠密图：任意一个点A和 大部分其他点都相连接；
 *   稀疏图：虽然点的个数可能很多，但是 任意一个点只和部分其他点相连；
 * 
 *   以1，2，3 这3个点为例，其中 1和2相连
 *   邻接矩阵：
 *     无向图--  [ [false, true, false],  [true, false, false],  [false, false, false] ]
 *     有向图--  [ [false, true, false],  [false, false, false],  [false, false, false] ]
 * 
 *   邻接表:
 *     无向图--  [ [2],  [1],  [] ]
 *     有向图--  [ [2],  [],  [] ]
 * 
 *   以后情况，都不考虑自环图(1和1自己相连) 和 多边图(1 和 2相连的路径 同时存在多条边)
 * 
 * 功能：
 * S1 构建matrixGraph：
 *    邻接矩阵：new Array(point).fill(0).map(() => new Array(point).fill(false))
 *    邻接表：new Array(point).fill(0).map(() => new Array())
 * S2 addEdge(v, w)：连接 v和w 2个点
 * S3 hasEge(v, w): 判断 v和w是否有相连的边/路径
 * 
 * S4 getAllEdge(v)：返回图中一个顶点的所有邻边
 * 
 * S5 求图的 联通分量：即 有几个 孤立的不相连图 ==> 图的深度优先遍历(dfs)
 * 如下所示邻接表
 * 0   1  2  5  6
 * 1   0
 * 2   0
 * 3   4  5
 * 4   3  5  6
 * 5   0  3  4
 * 6   0  4
 * 则 深度遍历的过程如下：
 *   0 --> 1                                         visited: 0, 1
 *     进入1， 1 --> 0  --> 返回0
 *   0 --> 2                                        visited: 0, 1, 2
 *     进入2， 2 --> 0 --> 返回0
 *   0  --> 5                                       visited: 0, 1, 2, 5
 *     进入5，5 --> 0 --> 3                    visited: 0, 1, 2, 5, 3
 *       进入3，3 --> 4                             visited: 0, 1, 2, 5, 3, 4
 *         进入4，4 --> 3 --> 5-->6             visited: 0, 1, 2, 5, 3, 4, 6
 *           进入6，6 --> 0 --> 4
 *         返回4
 *      返回3，3 --> 5 已有
 *    返回5 --> 5 —> 4已有，返回0
 *   0 --> 6 已有
 *    完成0的遍历，即 完成一个联通变量的查找
 *    进入1的遍历，进行 下一个联通变量的查找
 * 
 * S6 查找 图 v->w的一条路径：  
 *   构造函数：从v开始 深度优先遍历，遍历过程中记录 已遍历的节点 + 节点来源
 *   dfs：记录路径上遇到的节点 + 记录节点来源 ==> 递归执行 dfs
 *   showPath: 查找到v->w的一条路径并打印出来 ==> 每个节点都会记录其来源 + 用栈逆推即可
 *   
 * S7 查找 无权图中 v->w的 一条最短路径：
 *   构造函数：初始化 graph/source/visited/from/ord + 调用bfs
 *   bfs: 利用队列 + 每次出队一个点 ==> 入队相邻点 + 入队后 赋值 visited/from/order
 *   hasPath: 是否被访问过
 *   showpath: 栈 + 循环查找from[p]
 *   getShorestLength: 返回 ord[p]即可 （广度优先遍历可以保证获取到 无权图的最短路径）
 * 
 * ![图的深度优先](https://gitee.com/ygming/blog-img/raw/master/img/graph1.jpeg)
 * ![图的广度优先](https://gitee.com/ygming/blog-img/raw/master/img/graph2.jpeg)
 * 
 **/


// 稠密图- 邻接矩阵
type TMatrixInner = boolean[]
class DenseGraph {
  point: number    // 节点个数
  edge: number    // 边数
  directed: boolean  // 是否为有向图
  // matrixGraph初始化为n*n的布尔矩阵, 每一个g[i][j]均为false, 表示没有任和边
  matrixGraph: TMatrixInner[]

  constructor(point = 0, directed = false) {
    this.point = point
    this.edge = 0
    this.directed = directed
    this.matrixGraph = new Array(point).fill(0).map( () => new Array(point).fill(false) )
  }

  getPointNum() {
    return this.point
  }
  getEdegNum() {
    return this.edge
  }

  addEdge(v: number, w: number) {
    //  前置条件判断
    //  assert v >= 0 && v < point ;
    //  assert w >= 0 && w < point;

    // 如果已经有相连边了，就不需要再连接了
    if (this.hasEdge(v, w)) return

    this.matrixGraph[v][w] = true
    // 如果是无向图，则对应vw也要相连
    if (!this.directed) {
      this.matrixGraph[w][v] = true
    }
    this.edge++
  }

  hasEdge(v: number, w: number) {
    return this.matrixGraph[v][w]
  }

  getAllEdge(v: number)  {
    return this.matrixGraph[v].map( (isConnected, index) => {
      return isConnected ? index : false
    }).filter(item => item !== false)
  }

}

// 稀疏图- 邻接表
type TSparseInner = number[]
class SparseGraph {
  point: number    // 节点个数
  edge: number    // 边数
  directed: boolean  // 是否为有向图
  sparseGraph: TSparseInner[]

  constructor(point = 0, directed = false) {
    this.point = point
    this.edge = 0
    this.directed = directed
    this.sparseGraph = new Array(point).fill(0).map( () => new Array() )
  }

  getPointNum() {
    return this.point
  }
  getEdegNum() {
    return this.edge
  }

  addEdge(v: number, w: number) {
    //  前置条件判断
    //  assert v >= 0 && v < point ;
    //  assert w >= 0 && w < point;
    this.sparseGraph[v].push(w)

    // 不考虑自环图的情况
    if ( v !== w && !this.directed) {
      this.sparseGraph[w].push(v)
    }

    this.edge++
  }

  hasEdge(v: number, w: number) {
    // assert v >= 0 && v < n ;
    // assert w >= 0 && w < n ;
    return this.sparseGraph[v].includes(w)
  }

  getAllEdge(v: number)  {
    return this.sparseGraph[v]
  }

}

// 查找图的联通变量
class component {
  graph: any                       // 图的引用
  visited:  boolean[]            // 记录dfs的过程中节点是否被访问
  unionCount: number         // 记录联通分量个数
  id:  number[]                   // 每个节点所对应的联通分量标记

  constructor(graph) {
    this.graph = graph
    this.unionCount = 0
    this.visited = new Array(this.graph.getPointNum()).fill(false)
    this.id = new Array(this.graph.getPointNum()).fill(-1)
    this.autoUpdateUnionCount()
  }

  autoUpdateUnionCount() {
    for(let i = 0 ;  i < this.graph.getPointNum() ;  i ++) {
      //默认 visited的索引值 就等于 图里的每个节点值
      if(!this.visited[i] ){
        this.dfs(i)
        this.unionCount++
      }
    }
  }

  // 图的深度优先遍历
  dfs(point) {
    this.visited[point] = true
    this.id[point] = this.unionCount

    const adjList = this.graph.getAllEdge(point)
    adjList.forEach( point2 => {
      if (!this.visited[point2]) {
        this.dfs(point2)
      }
    })
  }

  // 返回图的联通分量个数
  getUnionCount(){
    return this.unionCount
  }

  // 查询点v和点w是否联通
  isConnected(v: number ,  w : number){
    return this.id[v] === this.id[w]
  }

}

// 查找 图 v->w的一条路径
class path {
  source: any        // 起始的 查找点
  graph: any         //  图的实例
  visited: any[]      // 记录dfs的过程中节点是否被访问   
  from: any[]        // 记录路径, from[i]值  表示查找的路径上i的  上一个节点
  constructor(graph, sourcePoint) {
    this.graph = graph
    this.source = sourcePoint
    this.visited = new Array(this.graph.getPointNum()).fill(false)
    this.from = new Array(this.graph.getPointNum()).fill(-1)

    // 默认从souce开始深度优先 寻路算法
    this.dfs(this.source)
  }

  // 图的深度优先遍历
  dfs(v) {
    this.visited[v] = true
    // 调用图的接口， 获取所有v的 邻接节点
    this.graph.getAllEdge(v).forEach(point => {
      // 更新访问 + 记录访问之前的 来源点
      if ( !this.visited[point] ) {
        this.from[point] = v
        this.dfs(point)
      }
    })
  }

  // 查询从s点到w点是否有路径
  hasPath(w: number){
    return this.visited[w]
  }

  // 查询从s点到w点的路径, 并显示出来
  showPath(w: number){
    // assert hasPath(w) 
    const stack = []
    let point = w
    // 不等于-1时，说明其被访问过且有来源
    while (point !== -1 ) {
      stack.push(point)
      point = this.from[point]
    }
    // 栈倒序就是 路径查找顺序
    const resPath = [...stack.reverse()].join('->')
    return resPath
  }
}


class ShortestPath {
  graph: any                // 图的引用
  source: number         // 起始点
  visited:  boolean[]     // 记录bfs的过程中节点  是否被访问
  from:  number[]        // 记录路径, from[i]  表示  查找的路径上i的  上一个节点
  ord: number[]          // 记录路径中节点的次序。ord[i]表示  i节点在路径中的次序

  constructor(graph, source){
    this.graph = graph
    this.source = source

    this.visited = new Array(this.graph.getPointNum()).fill(false)
    this.from = new Array(this.graph.getPointNum()).fill(-1)
    this.ord = new Array(this.graph.getPointNum()).fill(-1)
    this.bfs(source)
    this.ord[source] = 0
  }

  // 无向图最短路径算法, 从s开始广度优先遍历整张图
  bfs(v) {
    let que = []
    que.push(v)
    this.visited[v] = true

    while (que.length) {
      // 出队第一个元素
      let point = que.shift()  
      // 调用图的接口， 获取所有v的 邻接节点
      this.graph.getAllEdge(point).forEach( nextp => {
        if( ! this.visited[nextp] ){
          que.push(nextp)
          this.visited[nextp] = true
          this.from[nextp] = point
          this.ord[nextp] = this.ord[point] + 1
      }
      })
    }
  }

  // 查询从s点到w点是否有路径
  hasPath(w: number){
    return this.visited[w]
  }

  // 查询从s点到w点的路径, 并显示出来
  showPath(w: number){
    // assert hasPath(w) 
    const stack = []
    let point = w
    // 不等于-1时，说明其被访问过且有来源
    while (point !== -1 ) {
      stack.push(point)
      point = this.from[point]
    }
    // 栈倒序就是 路径查找顺序
    const resPath = [...stack.reverse()].join('->')
    return resPath
  }

  // 查看从s点到w点的最短路径长度;  若从s到w不可达，返回-1
  getShorestLength(w){
    return this.ord[w]
  }
}




// 简单的测试用例
let graph = new DenseGraph(7, false)
// let graph = new SparseGraph(7, false)
graph.addEdge(0, 1)
graph.addEdge(0, 3)
graph.addEdge(1, 2)
graph.addEdge(1, 6)
console.log('dddd', graph.getAllEdge(1))
console.log('dddd2', graph.hasEdge(0, 2))

