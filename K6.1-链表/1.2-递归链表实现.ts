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

export class LinkedListR<E> {
  head: LinkNode<E>;
  size: number;
  constructor() {
    this.head = null;
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
    this.head = this.innerAdd(this.head, index, val);
    this.size++;
  }
  private innerAdd(node: LinkNode<E>, index: number, val: E): LinkNode<E> {
    if (index == 0) {
      return new LinkNode(val, node);
    }
    node.next = this.innerAdd(node.next, index - 1, val);
    return node;
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
    return this.innerGet(this.head, index);
  }
  private innerGet(node: LinkNode<E>, index: number) {
    if (index == 0) {
      return node.val;
    }
    return this.innerGet(node.next, index - 1);
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
    this.innerSet(this.head, index, val);
  }
  private innerSet(node: LinkNode<E>, index: number, val: E) {
    if (index == 0) {
      node.val = val;
      return;
    }
    this.innerSet(node.next, index - 1, val);
  }

  // 查询链表中是否含有 data值
  contains(val: E) {
    return this.innerContains(this.head, val);
  }
  private innerContains(node: LinkNode<E>, val: E) {
    if (node == null) {
      return false;
    }
    if (node.val === val) {
      return true;
    }
    return this.innerContains(node.next, val);
  }

  // 删除index位置的Node, 返回被删除节点的值
  delNode(index: number) {
    if (index < 0 || index > this.size) throw new Error("index非法");
    const res = this.innerDel(this.head, index);
    this.size--;
    this.head = res.newHead;
    return res.val;
  }
  // 从以node为头结点的链表中，删除第index位置的元素，递归算法
  // 返回值包含两个元素，删除后的链表头结点和删除的值
  private innerDel(node: LinkNode<E>, index: number) {
    if (index == 0) {
      return { newHead: node.next, val: node.val };
    }
    const res = this.innerDel(node.next, index - 1);
    node.next = res.newHead;
    return { newHead: node, val: res.val };
  }

  delFirst() {
    return this.delNode(0);
  }
  // size-1 才是当前链表中的最后一个元素
  delLast() {
    return this.delNode(this.size - 1);
  }
}
