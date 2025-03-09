
# LeetCode25- K个一组翻转链表

## 实现思路

1 思维关键词: 
  S1 迭代法: 
    - 1 dummy + pre & a1Head 
    - 2 a1Tail = getLinkTail()
    - 3 a2Head
    - 4 [a1NewHead, a1NewTail] = reverseBetween(a1Head, a1Tail)
    - 5 分别使用pre + a1newTail, 拼接反转后的链表
    - 6 更新pre + 当前车厢头结点==> 以保持循环不变量含义

  S2 递归法: a2Head + reverseBetween(head, a2Head) + reverseKGroup(a2Head, k)


2 参考文章

[01 方法官方实现](https://leetcode.cn/problems/reverse-nodes-in-k-group/solution/k-ge-yi-zu-fan-zhuan-lian-biao-by-leetcode-solutio/)

[02 方法2参考](https://leetcode.cn/problems/reverse-nodes-in-k-group/solution/di-gui-java-by-reedfan-2/)


## 代码实现

1 方法1: 虚拟头节点，时间复杂度 O(n)  空间复杂度O(1)

```ts
function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  let dummy = new ListNode(-1, head)
  // pre: 固定指向 每节车厢[a1Head, a1Tail]中 a1Head的前一个节点
  // a1Head: 固定指向 每节车厢[a1Head, a1Tail]中的 a1Head
  let pre = dummy, a1Head = head
  // 易错点1: 翻转前，要保证每节车厢的头结点有值 
  while (a1Head) {
    // S1 根据k 获取每节车厢[a1Head, a1Tail]中的 a1Tail
    let a1Tail = getLinkTail(a1Head, k)
    // 易错点2: 如果a1Tail为null，说明当前车厢不满足K个长度，直接返回不用翻转
    if (!a1Tail) {
      return dummy.next
    }
    // S2 暂存下一节车厢的头结点a2(即后继节点)
    let a2Head = a1Tail.next
    // S3 反转[a1Head, a1Tail]间的链表,返回反转后的头尾节点 [a1newHead, a1newTail]
    let [a1NewHead, a1NewTail] = reverseBetween(a1Head, a1Tail)
    // S4 分别使用pre + a1newTail, 拼接反转后的链表
    pre.next = a1NewHead
    a1NewTail.next = a2Head
    // S5 更新pre + 当前车厢头结点，以保持循环不变量含义
    pre = a1NewTail
    a1Head = a2Head
  }
  return dummy.next

};

function getLinkTail(head: ListNode | null, k: Number): ListNode | null {
  let tail = head
  // 易错点: 当以head为开始点寻找tail时，k要从1开始计数
  for (let i = 1; i < k; i++) {
    tail = tail.next;
    if (!tail) break;
  }
  return tail
}

function reverseBetween(head: ListNode, tail: ListNode ): Array<ListNode> {
  let pre = null, cur = head
  while (pre !== tail) {
    let temp = cur.next
    cur.next = pre
    // 更新指向节点
    pre = cur
    cur = temp
  }
  return [tail, head]
}
```

2 方法2: 递归实现，时间复杂度 O(n)  空间复杂度O(n)

```ts
function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  // 递归中止条件： 已经是最后一个节点
  if (!head || !head.next) return head;
  // S1 获取下一节车厢(a2Head, a2Tail)中的a2Head
  let a2Head = head
  for (let i = 0; i < k; i++) {
    // 如果在循环过程中a2Head为null了，说明不满足翻转个数，直接返回当前车厢头节点即可
    if (!a2Head) return head
    a2Head = a2Head.next
  }
  
  // 反转[a1Head, a2Head）间节点，返回反转后的新头节点
  let newHead = reverseBetween(head, a2Head)
  // 当前head已经经过反转，变成了尾节点，所以让他指向 下一个翻转车厢的新头节点
  head.next = reverseKGroup(a2Head, k) 
  // 单次处理结果: 返回反转后的新的头节点
  return newHead
};

// 反转[a1Head, a2Head）间节点，返回反转后的新节点
function reverseBetween(a1Head: ListNode, a2Head: ListNode) {
  let pre = null, cur = a1Head
  while (cur !== a2Head) {
    // 反转
    let temp = cur.next
    cur.next = pre
    // 移动指针
    pre = cur
    cur = temp
  }
  return pre
}
```