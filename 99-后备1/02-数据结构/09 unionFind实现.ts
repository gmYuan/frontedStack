/**
 * UnionFind
 *  解决问题：网络节点之间的 连接问题
 *  
 *  S1 union(p, q)：把2个业务/元素Id 合并到一个共同的 集合Id中 ==> private find(p)
 *  S2 isConnected(p, q)： 查询 业务Id 是否属于 同一个集合中
 * 
 * 
 *  Quick Find：用数组来表示元素 所属关系
 *  Quick Union：
 *    S1.1 初始化时 业务Id == 数组Index === ParentId；
 *    S1.2 特殊的，当业务Id === ParentId时，此时ParentId也就是所属集合的groupId
 * 
 *    S2 find(p)实现理解：当业务Id不等于ParentId(即arr[index/p]，因为index ==p)，说明此时 所属groupId被修改了；
 *         所以需要一直循环更新，继续查找其父节点Id，直到找到所属的GroupId（此时 p === arr[p]）
 *   
 *    S3 isConnetced(p, q)：调用 find(p/q), 查看所属groupId是否相等即可
 *    S4.1 union(p, q)：找到p/q所属的groupId， 然后修改 pgroupId(通过arr[pGroupId]即可)为 qGroupId即可
 *    S4.2 arr[pGroupId] 可以拿到pGroupId的原因是，默认情况 业务Id === index === pGroupId
 * 
 *  Quick Union优化性能：
 *    S1 新增childSize数组：根据childSize[i],来让子元素个数少的根节点 挂在 子元素个数多的下面，以减少树的 深度；
 *        注意，childSize的Index 是和 arr的index/业务Id 是一一对应的
 *   
 *    S2 新增Rank数组，根据rank[i], 来让树的高度浅的根节点 挂在 树的高度多的下面，以减少树的 深度；
 * 
 *    S3 路径压缩- 非递归实现：减少树的高度
 *    S4 路径压缩- 递归实现：减少树的高度
 */

// quickFind的实现
class UnionFInd1{
	arr: any[];
	constructor(size) {
		this.arr = new Array(size)
		this.arr.forEach((item, index) => {
			item.groupId = index
		})
	}

	getSIze() {
		return this.arr.length
	}

	// 获取元素所属的 集合Id
	private find(p) {
		if (p < 0 || p >= this.arr.length) {
			throw new Error('元素p违法')
		}
		return p.groupId
	}

	isConnected(p, q) {
		return this.find(p) == this.find(q)
	}

	union(p, q) {
		//S1 获取pId 和 qId
		const pGroupId = this.find(p)
		const qGroupId = this.find(q)
		if (pGroupId == qGroupId)  return
		//S2 遍历数组内容，要把所有之前属于p分组的，都变成属于q
		this.arr.forEach(item => {
			if (item.groupId == pGroupId) {
				item.groupId = qGroupId
			}
		})
	}
  
}

// quickUnion的实现 + size优化
class UnionFind2{
	arr: any[];
	childSize: any[];

	constructor(size) {
		this.arr = new Array(size)
		this.childSize = new Array(size)
		for(let i = 0; i < size;  i++){
			this.arr[i] = i
			this.childSize[i] = 1
  	}
  }
	getSize() {
		return this.arr.length
	}

	// 获取p所属的groupId
	find(p) {
		//S1 此时， p === 业务Id === Index === groupId,其中 业务ID/p === Index是一直保持不变的
		if (p < 0 || p >= this.arr.length) {
			throw new Error('index违法')
		}
    //S2 当不满足业务Id === parentId时，继续查找其父节点Id，直到找到所属的GroupId
		while( p != this.arr[p]) {
			// 在默认情况下，pGroupId === Index === 业务Id
			p = this.arr[p]
		}
		return p
	}

	isConnected(p , q) {
		return this.find(p) == this.find(q)
	}

	union(p, q) {
		// 说明在默认情况下，pGroupId === Index === 业务Id
		const pIndex = this.find(p)
		const pGroupId = this.find(p)
		const qGroupId = this.find(q)

		if (pGroupId == qGroupId) return
		// 让元素个数小的节点， 挂在元素个数多的 节点下面
		if ( this.childSize[pIndex] < this.childSize[qGroupId] ) {
			this.arr[pIndex] = qGroupId
			this.childSize[qGroupId] += this.childSize[pIndex]
		} else {
			this.arr[qGroupId] = pIndex
			this.childSize[pIndex] += this.childSize[qGroupId]
		}
	}
	
}

// quickUnion的实现 + rank优化
class UnionFind3{
	arr: any[];
	rank: any[];

	constructor(size) {
		this.arr = new Array(size)
		this.rank = new Array(size)
		for(let i = 0; i < size;  i++){
			this.arr[i] = i
			this.rank[i] = 1
  	}
  }
	getSize() {
		return this.arr.length
	}

	// 获取p所属的groupId
	find(p) {
		//S1 此时， p === 业务Id === Index === groupId,其中 业务ID/p === Index是一直保持不变的
		if (p < 0 || p >= this.arr.length) {
			throw new Error('index违法')
		}
    //S2 当不满足业务Id === parentId时，继续查找其父节点Id，直到找到所属的GroupId
		while( p != this.arr[p]) {
			// 在默认情况下，pGroupId === Index === 业务Id
			p = this.arr[p]
		}
		return p
	}

	isConnected(p , q) {
		return this.find(p) == this.find(q)
	}

	union(p, q) {
		// 说明在默认情况下，pGroupId === Index === 业务Id
		const pIndex = this.find(p)
		const pGroupId = this.find(p)
		const qGroupId = this.find(q)

		if (pGroupId == qGroupId) return
		// 终止条件：高度相等时，任意让p 挂在到q下面
		if (this.rank[pIndex] == this.rank[qGroupId]) {
			this.arr[pIndex] = this.arr[qGroupId]
			this.arr[qGroupId] += 1
		// 让矮树挂在 深树下面
		} else if (this.rank[pIndex] < this.rank[qGroupId]) {
			this.arr[pIndex] = this.arr[qGroupId]
		} else {
			this.arr[qGroupId] = this.arr[pIndex]
		}
	}
	
}


// quickUnion的实现 + 路径压缩非递归实现
class UnionFind4{
	arr: any[];
	rank: any[];

	constructor(size) {
		this.arr = new Array(size)
		this.rank = new Array(size)
		for(let i = 0; i < size;  i++){
			this.arr[i] = i
			this.rank[i] = 1
  	}
  }
	getSize() {
		return this.arr.length
	}

	// 获取p所属的groupId
	find(p) {
		//S1 此时， p === 业务Id === Index === groupId,其中 业务ID/p === Index是一直保持不变的
		if (p < 0 || p >= this.arr.length) {
			throw new Error('index违法')
		}
    //S2 当不满足业务Id === parentId时，继续查找其父节点Id，直到找到所属的GroupId
		while( p != this.arr[p]) {
			// 先进行一下路径压缩优化
			this.arr[p] = this.arr[ this.arr[p] ]

			// 在默认情况下，pGroupId === Index
			p = this.arr[p]
		}
		return p
	}

	isConnected(p , q) {
		return this.find(p) == this.find(q)
	}

	union(p, q) {
		// 说明在默认情况下，pGroupId === Index === 业务Id
		const pIndex = this.find(p)
		const pGroupId = this.find(p)
		const qGroupId = this.find(q)

		if (pGroupId == qGroupId) return
		// 终止条件：高度相等时，任意让p 挂在到q下面
		if (this.rank[pIndex] == this.rank[qGroupId]) {
			this.arr[pIndex] = this.arr[qGroupId]
			this.arr[qGroupId] += 1
		// 让矮树挂在 深树下面
		} else if (this.rank[pIndex] < this.rank[qGroupId]) {
			this.arr[pIndex] = this.arr[qGroupId]
		} else {
			this.arr[qGroupId] = this.arr[pIndex]
		}
	}
	
}


// quickUnion的实现 + 路径压缩递归实现
class UnionFind5{
	arr: any[];
	rank: any[];

	constructor(size) {
		this.arr = new Array(size)
		this.rank = new Array(size)
		for(let i = 0; i < size;  i++){
			this.arr[i] = i
			this.rank[i] = 1
  	}
  }
	getSize() {
		return this.arr.length
	}

	// 获取p所属的groupId
	find(p) {
		//S1 此时， p === 业务Id === Index === groupId, 其中 业务ID/p === Index是一直保持不变的
		if (p < 0 || p >= this.arr.length) {
			throw new Error('index违法')
		}
    //S2 当不满足业务Id === parentId时，继续查找其父节点Id，直到找到所属的GroupId
		// 路径压缩，递归实现
		if (p == this.arr[p]) {
			return this.arr[p]
		}
		// 每次都会把经过的子节点，其parentId 设置为 groupId
		this.arr[p] = this.find(this.arr[p])
	}

	isConnected(p , q) {
		return this.find(p) == this.find(q)
	}

	union(p, q) {
		// 说明在默认情况下，pGroupId === Index === 业务Id
		const pIndex = this.find(p)
		const pGroupId = this.find(p)
		const qGroupId = this.find(q)

		if (pGroupId == qGroupId) return
		// 终止条件：高度相等时，任意让p 挂在到q下面
		if (this.rank[pIndex] == this.rank[qGroupId]) {
			this.arr[pIndex] = this.arr[qGroupId]
			this.arr[qGroupId] += 1
		// 让矮树挂在 深树下面
		} else if (this.rank[pIndex] < this.rank[qGroupId]) {
			this.arr[pIndex] = this.arr[qGroupId]
		} else {
			this.arr[qGroupId] = this.arr[pIndex]
		}
	}
	
}