
# LeetCode24- 两两交换链表中的节点

1 思维关键词: 

S1 迭代法: dummy + pre + (a,b)==> 易错点是 pre + 指针的移动 

S2 递归法: 1次处理2个节点 + f(head.next.next)

2 参考文档

[01 官方参考](https://leetcode.cn/problems/swap-nodes-in-pairs/solution/liang-liang-jiao-huan-lian-biao-zhong-de-jie-di-91/)


## 代码实现

1 方法1: dummy + pre + (a,b)  时间复杂度 O(n)  空间复杂度O(1)

```ts
function swapPairs(head: ListNode | null): ListNode | null {
  let dummy = new ListNode(-1, head)
  // pre: 指向当前一对待交换车厢(a,b)中a的前一个节点;  p1/p2: (a,b)中的a/b
  // 易错点1: 由于a可能为null, 所以需要判断b车厢的存在性
  let pre = dummy, p1 = dummy.next, p2 = p1?.next
  while (p1 && p2) {
    // 由于p2可能为null, 所以temp更需要判断存在性
    let temp = p2?.next
    pre.next = p2
    p2.next = p1
    p1.next = temp
    // 更新pre、p1、p2
    pre = p1
    p1 = temp
    p2 = p1?.next
  }
  return dummy.next
};
```

2 方法2: 递归实现，时间复杂度 O(n)  空间复杂度O(n)

```ts
function swapPairs(head: ListNode | null): ListNode | null {
  // 递归定义：返回 两两交换了位置的新链表的头节点
  if (!head || !head.next) return head;
  // 指向待交换的第1个节点, 这里只是为了便于理解，其实是个冗余变量

  // (a1, b1)--> (a2, b2)
  let a1 = head, b1 = head.next
  // 易错点：传入的是 b1.next，这样就可让递归单次处理对象是成对的 a2 + b2
  // 递归的本轮操作，完全可以是一次处理N个节点，而非只是1个节点
  a1.next = swapPairs(b1.next)
  b1.next = a1
  return b1
};
```