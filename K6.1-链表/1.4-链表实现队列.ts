/**
 * S1 LinkNode: val + next
 * S2 LinkedListQueue: 双指针head + tail (因为队列必然是从一头入队，另一头出队) 和 size
 * S3 enqueue入队：queue为空时的特殊处理(赋值tail和head) + 更新tail值 + 更新 size值
 * S4 dequeue入队：queue为空时的容错处理 + 更新head值 + 处理最后一个节点出队的特殊情况 + 更新size值
 *
 * 1 链表的性能问题
 *   - 虽然看上去，如果我们只在链表头添加元素，时间复杂度是 O(1)的。
 *     同时，因为使用链表不需要 ressize，所以，凭直觉，链表的性能应该更好
 *
 *   - 但实际上，当数据量达到一定程度，链表的性能是更差的。
 *     这是因为，对于链表来说，每添加一个元素，都需要重新创建一个 Node 类的对象，
 *     也就是都需要进行一次 new的内存操作。而对内存的操作，是非常慢的
 *
 * 2 为什么即使有 resize，对于大规模数据，动态数组还是会快于链表
 *  - 因为对于动态数组来说，一方面 每次resize容量都增倍，
 *    对于大规模数据，实际上触发resize 的次数是非常少的
 *
 *  - 更重要的是，resize的过程，是一次申请一大片内存空间；
 *    但是对于链表来说，每次只是申请一个空间；
 *    申请一次10万的空间，是远远快于申请10万次1的空间的
 *
 */

class LinkNode<E> {
  val: E;
  next: LinkNode<E>;
  constructor(val = null, next = null) {
    this.val = val;
    this.next = next;
  }
}

class LinkedListQueue<E> {
  head: LinkNode<E> | null;
  tail: LinkNode<E> | null;
  size: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.size === 0;
  }

  enqueue(val: E) {
    // 表示是空链表情况，特殊处理head和tail
    if (this.tail == null) {
      this.tail = new LinkNode(val);
      this.head = this.tail;
    } else {
      this.tail.next = new LinkNode(val);
      this.tail = this.tail.next;
    }
    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("队列已经为空");
    }
    let retNode = this.head;
    this.head = this.head.next;
    // 断开出队的 节点连接
    retNode.next = null;

    // 处理特殊情况: 当前队列只有一个节点且出队后，此时更新后的head为null：
    // 此时也需要 更新tail指向，否则tail不会释放已出队节点
    if (this.head == null) {
      this.tail = null;
    }
    this.size--;
    return retNode.val;
  }

  getFront() {
    if (this.isEmpty()) {
      throw new Error("队列已经为空");
    }
    return this.head.val;
  }
}
