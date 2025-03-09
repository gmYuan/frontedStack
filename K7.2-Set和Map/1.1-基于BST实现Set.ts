/**

基于BST的API, 实现Set
**/

export {};
import { BST } from "../K7.1-二分搜索树/1.1-BST实现";

class BSTSet {
  private bst: BST;
  constructor() {
    this.bst = new BST();
  }

  getSize() {
    return this.bst.getSize();
  }

  isEmpty() {
    return this.bst.isEmpty();
  }

  add(e: number) {
    this.bst.addNode(e);
  }

  contains(e: number) {
    return this.bst.contains(e);
  }

  remove(e: number) {
    this.bst.remove(e);
  }
}
