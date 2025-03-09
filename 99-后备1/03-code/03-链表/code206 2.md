# LeetCode206- 反转链表

## 实现思路

1 思维关键词: 
  S1 迭代法: 前后指针 + nextNode变量
  S2 递归法: fn(n) = fn(n-1) + 某项操作

2 参考文档 

[01 对递归的理解很好](https://leetcode.cn/problems/reverse-linked-list/solution/fan-zhuan-lian-biao-liang-chong-shi-xian-sk9y/)


## 代码实现

1 方法1: 迭代法  时间复杂度: O(n);  空间复杂度(1)
```ts
function reverseList(head: ListNode | null): ListNode | null {
  let pre = null, cur = head
  while (cur) {
    // 需要先暂存nextNode，因为下一步反转节点时就会断开对nextNode的指向
    let nextNode = cur.next
    // 让当前节点指向前一个节点
    cur.next = pre
  // 更新 pre和cur节点的指向
    pre = cur
    cur = temp
  }
  // 运行到此，cur必然为null, pre必然为原链表的尾节点，即反转后的新头结点
  return pre
};
```

2 方法2: 递归法  时间复杂度: O(n);  空间复杂度(1)
```ts
function reverseList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  // 函数功能语义: 反转了以head为头节点的链表，并返回了反转后的新头节点newHead
  const newHead = reverseList(head.next)
  // 注意此时head.next，还指向着 反转后的尾节点， 即 curHead--> newTail <--yyy <-- newHead
  // 所以想要反转包含curHead的整个链表，通过newTail(即 head.next)就很简单了
  head.next.next = head
  // 让curHead的next断开指向newTail，从而避免循环链表
  head.next = null
  // 返回整个链表的 新的头结点即可
  return newHead
};
```