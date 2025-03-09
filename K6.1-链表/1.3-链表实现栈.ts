import { LinkedList } from "./1.1-链表实现";

// 用链表实现栈: 链表头进，链表头出即可，复杂度为O(1)
class LinkedListStack<E> {
  list: LinkedList<E>;

  constructor() {
    this.list = new LinkedList();
  }

  getSize() {
    return this.list.getSize();
  }
  isEmpty() {
    return this.list.isEmpty();
  }

  push(val: E) {
    return this.list.addFirst(val);
  }
  pop() {
    return this.list.delFirst();
  }
  peek() {
    return this.list.getFirst();
  }
}
