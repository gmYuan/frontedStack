/**

基于链表的API, 实现Set
**/

export {};

import { LinkedList } from "../K6.1-链表/1.1-链表实现";

class LinkListSet<E> {
  private list: LinkedList<E>;

  constructor() {
    this.list = new LinkedList();
  }

  getSize() {
    return this.list.getSize();
  }

  isEmpty() {
    return this.list.isEmpty();
  }

  // Set不可以有重复元素
  add(e: E) {
    if (!this.list.contains(e)) {
      this.list.addFirst(e);
    }
  }

  contains(e: E) {
    return this.list.contains(e);
  }

  remove(e: E) {
    const idx = this.list.find(e);
    if (idx !== -1) {
      this.list.delNode(idx);
    }
  }
}
