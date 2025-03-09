/**
 * 并查集 UnionFind
 * 
 * 功能：
 * S1 合并2个元素 union(p,q)
 * S2 查找 元素所属集合的 根节点 find(p)
 * S3 检测 2个元素是否相连 isConnected(p, q)
 *
 * 实现步骤：
 * 使用数组构建 一棵指向父节点的树 +  parent[i] 表示 元素所指向的父节点
 * 
 * S1 初始化, 每一个parent[i]指向自己, 表示 每一个元素自己自成一个集合
 *     可以理解为：elementList =  [{value: index, parent: index} ......]
 * 
 * S2 find(p)：查找元素值p 所属的集合编号；
 *                  查询自己的父亲节点, 直到到达根节点  +  根节点的特点: parent[p] === p (即 p.value === p.parent)；
 *                  O(h)复杂度, h为树的高度
 * 
 * S3 isConnected(p, q)： 查看 元素p和元素q 是否所属一个集合；
 *                                   直接调用find，对比是否相同 即可；
 *                                   O(h)复杂度, h为树的高度
 * 
 * S4 union(p, q) ：合并元素p和元素q所属的集合；
 *                         parent[p] = q (即 p.parent = q.value，其中q.value === q值/index值)
 *                         O(h)复杂度, h为树的高度
 *
 * S5 union优化1：
 *    引入并记录 每个集合树的高度：rank，初始每个集合树的高度都是1
 *    根据p/q根节点所属集合树的高度，让高度低的根节点 属于高度高的节点下
 *    当高度相等时，则 让pRoot.parent = qRoot.parent，且更新qRoot的高度值
 * 
 * S6 union优化2:
 *   每次find(p)时，都顺带进行一下路径压缩的优化，从而减少节点关联的高度/深度
 *   即 4-->3 --> 2 --> 1，压缩为 4/3 --> 2 --> 1
 *   即 p.parent = p.parent.parent +   p = p.parent
 *   即  4-->2 & p =2；   2-->1 (1.parent = 1)& p = 1
 * 
 *   被路径压缩后的树的高度，趋向为1，所以其操作的时间复杂度,近似为O(1)
 *   注意，rank的值在路径压缩的过程中, 有可能不再是树的 层数值
 * 
 * ![并查集-路径压缩](https://gitee.com/ygming/blog-img/raw/master/img/unionFind1.jpeg)
 *        
 **/

class unionFInd {
  parent : any[]
  count: number
  rank: number[]

  constructor(cap) {
    this.parent = new Array(cap)
    this.rank = new Array(cap)
    this.count = cap
    this.parent.forEach((item, index) => {
      item = index  
    })
    this.rank.forEach((item) => {
      item= 1
    })
  }

  find(p) {
    if (p < 0 || p > this.count) {
      throw new Error('输入值不存在')
    }
    while (p !== this.parent[p]) {
      this.parent[p] = this.parent[this.parent[p]]
      p = this.parent[p]
    }
    return p
  }

  isConnected(p, q) {
    return this.find(p) === this.find(q)
  }


  union(p, q) {
    let pRoot = this.find(p)
    let qRoot = this.find(q)
    if (pRoot === qRoot)  return

    //S5 高度低的 放到高度高度下面，避免高度再次增高
    if (this.rank[pRoot] < this.rank[qRoot]) {
      // 根节点时，pRoot === 对应index === this.parent[pRoot]
      this.parent[pRoot] = qRoot
    } else if (this.rank[qRoot] < this.rank[pRoot]) {
      this.parent[qRoot] = pRoot
    // 高度一样时，默认 p挂在q下 + q高度增加1  
    } else {
      this.parent[pRoot] = qRoot
      this.rank[qRoot] += 1
    }
  }

}
