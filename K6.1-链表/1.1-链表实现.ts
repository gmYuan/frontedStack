/** 
S1 LinkNode: val + next
S2 LinkedList: dummy + size

S3 addNode(增):
  - 容错判断 + 获取到pre + 更新pre.next 和 size值
  - 时间复杂度：addLast(val): O(n)/  addFirst(val): O(1)/  add(index, e):  O(n/2)  
  - 整体添加 操作复杂度:  O(n)

S4 delNode(删):
  - 容错判断 + 循环获取到preNode + 更新preNode.next 和 willDel值 + size值
  - 时间复杂度：delLast(): O(n)/  delFirst(val): O(1)/  del(index): O(n/2)  
  - 整体删除 操作复杂度:  O(n)

S5 setNode(改):
  - curNode，其他基本同addNode
  - 时间复杂度：set(index, e):  O(n/2)  
  - 整体修改 操作复杂度:  O(n)


S6 getNode/contains(查):
  - curNode，其他基本同addNode
  - 时间复杂度：get(index):  O(n/2)  
  - 整体查询 操作复杂度:  O(n)

由上可以看出，链表的增删改查操作时间复杂度都是 O(n)的；
但是，其中对链表头的操作，其时间复杂度都是 O(1)的

*/

class LinkNode<E> {
  val: E;
  next: LinkNode<E>;
  constructor(val = null, next = null) {
    this.val = val;
    this.next = next;
  }
}

export class LinkedList<E> {
  dummy: LinkNode<E>;
  size: number;
  constructor() {
    this.dummy = new LinkNode();
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  getSize() {
    return this.size;
  }

  // 在index前 插入节点
  addNode(index: number, val: E) {
    if (index < 0 || index > this.size) {
      throw new Error("index非法");
    }
    let pre = this.dummy;
    for (let i = 0; i < index; i++) {
      pre = pre.next;
    }
    //即 let node = new LinkNode(val) + node.next = pre.next +  pre.next = node
    pre.next = new LinkNode(val, pre.next);
    this.size++;
  }

  addFirst(val: E) {
    this.addNode(0, val);
  }

  addLast(val: E) {
    this.addNode(this.size, val);
  }

  // 查询index位置的节点值
  getNode(index: number) {
    if (index < 0 || index > this.size) {
      throw new Error("index值违法");
    }
    let cur = this.dummy.next;
    for (let i = 0; i < index; i++) {
      cur = cur.next;
    }
    return cur.val;
  }

  getFirst() {
    this.getNode(0);
  }

  getLast() {
    this.getNode(this.size - 1);
  }

  // 设置index位置的节点值
  setNode(index: number, val: E) {
    if (index < 0 || index > this.size) {
      throw new Error("index非法");
    }
    let curNode = this.dummy.next;
    for (let i = 0; i < index; i++) {
      curNode = curNode.next;
    }
    curNode.val = val;
  }

  // 查询链表中是否含有 data值
  contains(val: E) {
    let curNode = this.dummy.next;
    while (curNode) {
      if (val === curNode.val) return true;
      curNode = curNode.next;
    }
    return false;
  }

  // 查找值为val的节点的索引，不存在返回-1
  find(val: E): number {
    let curNode = this.dummy.next;
    let index = 0;
    while (curNode) {
      if (val === curNode.val) return index;
      curNode = curNode.next;
      index++;
    }
    return -1;
  }

  // 删除index位置的Node, 返回被删除节点的值
  delNode(index: number) {
    if (index < 0 || index > this.size) throw new Error("index非法");
    let preNode = this.dummy;
    for (let i = 0; i < index; i++) {
      preNode = preNode.next;
    }

    let willDel = preNode.next;
    // 更新preNode的next指向
    preNode.next = willDel.next;
    willDel.next = null;
    // 更新size值
    this.size--;
    return willDel.val;
  }

  delFirst() {
    return this.delNode(0);
  }
  // size-1 才是当前链表中的最后一个元素
  delLast() {
    return this.delNode(this.size - 1);
  }
}
