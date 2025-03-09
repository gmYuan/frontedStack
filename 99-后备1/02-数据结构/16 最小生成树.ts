/**
 * 有权图
 * 
 * 1 边Edge：v/w/weight
 * 2 稀疏图/稠密图：内部每个元素都是 一条边
 * 
 * 3 最小生成树- Lazy Prim
 * 
 * 最小生成树： 在一个有V个顶点的有权图中，找到V-1条边，使得总权值最小
 * 横切边：如果一条边的2个端点，分别属于2个不同的切分，这条边则称为横切边
 * 切分定理：给定【任意】切分，横切边中权值最小的边，必然属于 最小生成树
 * 
 * 
 * 
 * 
 * S1 记录/更新 节点是否被访问过： visited = [false, false ....]
 * S2 加入 当前访问节点A的 所有横切边 到 最小堆中 
 * S3 找到节点A中 权值最小的横切边edge1，记录到最小生成树minSpanTree中
 * S4 找到edge1中 另一个未被访问过的节点B,  循环执行以上步骤
 * 
 * ![切分定理](https://gitee.com/ygming/blog-img/raw/master/img/mst1.jpeg)
 * ![Lazy Prim-1](https://gitee.com/ygming/blog-img/raw/master/img/mst2.jpeg)
 * ![Lazy Prim-2](https://gitee.com/ygming/blog-img/raw/master/img/mst3.jpeg)
 * 
 * ![prim-数组优化](https://gitee.com/ygming/blog-img/raw/master/img/mst4.jpeg)
 * 
 * 
 **/


// 边
class Edge{
  a: number
  b: number
  weight: any
  constructor(e?: any,  a = 0, b = 0, weight = 0) {
    if (e) {
      this.a = e.a
      this.b = e.b
      this.weight = e.weight
    } else if (a) { 
      this.a = a
      this.b = b
      this.weight = weight
    }
  }
  // 返回第一个顶点
  v() { 
    return this.a
  } 
  // 返回第二个顶点
  w() { 
    return this.b
  } 
  // 返回权值
  wt() { 
    return this.weight
  }   
  // 给定一个顶点, 返回另一个顶点
  other(x: number){
    // assert x == a || x == b;
    return x == this.a ? this.b : this.a
  }

}

// 稀疏图 - 邻接表
class SparseWeightedGraph {
  n: number                     // 节点数
  m: number                   // 边数
  directed: boolean         // 是否为有向图
  g: any[]                        // 图的具体数据
  constructor(n: number, directed: boolean) {    
    // assert n >= 0
    this.n = n
    this.m = 0
    this.directed = directed
    //每一个g[i]都为空, 即没有任和边
    this.g = new Array(n).fill(0).map( () => new Array() )
  }
  // 返回节点个数
  V() { 
    return this.n
  } 
  // 返回边的个数
  E() { 
    return this.m
  } 
  
  // 向图中添加一个边, 权值为weight
  addEdge(e: Edge){
    // assert e.v() >= 0 && e.v() < n ;
    // assert e.w() >= 0 && e.w() < n ;

    // 注意, 由于在邻接表的情况, 查找是否有重边需要遍历整个链表 ==> 我们的程序允许重边的出现
    this.g[e.v()].push(new Edge(e))
    if( e.v() != e.w() && !this.directed ) {
      this.g[e.w()].push( new Edge(null, e.w(), e.v(), e.wt() ) )
    }
    this.m++
  }

  // 验证图中是否有从v到w的边
  hasEdge(v: number, w: number){
    // assert v >= 0 && v < this.n
    // assert w >= 0 && w < this.n
    return  this.g[v].some( (edge) => {
      return edge.other(v) === w
    })
  }

  // 返回图中一个顶点的所有邻边
  adj(v) {
    // assert v >= 0 && v < this.n
    return this.g[v]
  }
}


// 稠密图 - 邻接矩阵
class DenseWeightedGraph {
  n: number                   // 节点数
  m: number;                // 边数
  directed: boolean;     // 是否为有向图
  g: any[];                  // 图的具体数据
  
  // 构造函数
  constructor(n : number , directed : boolean){
    // assert n >= 0;
    this.n = n
    this.m = 0   // 初始化没有任何边
    this.directed = directed
    this.g = new Array(n).fill(0).map( () => new Array(n).fill(null) )
  }

  // 返回节点个数
  V() { 
    return this.n
  } 
  // 返回边的个数
  E() { 
    return this.m
  } 
  // 向图中添加一个边
  addEdge(e : Edge){
    // assert e.v() >= 0 && e.v() < n 
    // assert e.w() >= 0 && e.w() < n
    if( this.hasEdge( e.v() , e.w() ) ) {
      return
    }
    this.g[e.v()][e.w()] = new Edge(e)
    if( e.v() != e.w() && !this.directed ) {
      this.g[e.w()][e.v()] = new Edge(e.w(), e.v(), e.wt())
    }
    this.m ++
  }

  // 验证图中是否有从v到w的边
  hasEdge(v: number , w: number ){
    // assert v >= 0 && v < n
    // assert w >= 0 && w < n
    return this.g[v][w] != null
  }
  
  // 返回图中一个顶点的所有邻边
  adj(v: number) {
    // assert v >= 0 && v < n
    return this.g[v].filter( (edgeObj) => {
      return edgeObj
    })
  }

}


// 使用Prim算法求图的 最小生成树
class LazyPrimMST {
  g: any                            // 图的引用
  minHeap: any                // 最小堆, 算法辅助数据结构
  visited: boolean[]           // 标记数组, 在运行过程中标记节点i是否被访问
  mst: any[]                    // 最小生成树 所包含的所有边
  mstWeight: number      // 最小生成树的权值

  constructor(graph: any){
    this.g = graph
    // 最小堆的容量，是图里所有的边数
    this.minHeap =  new MinHeap(this.g.E())
    // 图的g.V() 返回的节点个数
    this.visited = new Array[this.g.V()].fill(false)
    // 最小生成树默认是空数组
    this.mst = []

    // 从0开始处理节点
    this.visit(0)

    while( !this.minHeap.isEmpty() ){
      // 使用最小堆 找出 已经访问的边中 权值最小的边
      const e = this.minHeap.extractMin()

      // 如果这条边的两端都已经访问过了, 则扔掉这条边
      if ( this.visited[e.v()] === this.visited[e.w()] ) {
        continue
      }
      // 否则, 这条边则应该存在在最小生成树中
      this.mst.push(e)
      
      // 访问和这条边连接的还没有被访问过的节点
      if ( !this.visited[e.v()] ) {
        this.visit( e.v() )
      } else {
        this.visit( e.w() )
      }
    }

    // 计算最小生成树的权值
    let mstWeight = 0
    this.mst.forEach(edge => {
       mstWeight +=edge.wt()
    })
    this.mstWeight = mstWeight
  }

  // 访问节点v
  visit(v : any){
    // assert !this.visited[v]
    this.visited[v] = true
    // 将和节点v相连接的所有未访问的边 放入最小堆中
    this.g.adj(v).forEach( (e: any) => {
      if ( !this.visited[e.other(v)] ) {
        this.minHeap.insert(e)
      }
    })
  }

  // 返回最小生成树的所有边
  mstEdges() {
    return this.mst
  }

  // 返回最小生成树的权值
  result() {
    return this.mstWeight
  }
}







