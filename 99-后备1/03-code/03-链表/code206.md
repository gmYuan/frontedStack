# LeetCode206- 反转链表

## 实现思路

1 思维关键词: 
  S1 迭代法: 前后指针 + temp变量
  S2 递归法: fn(n) = fn(n-1) + 某项操作

2 参考文档 

[01 对递归的理解很好](https://leetcode.cn/problems/reverse-linked-list/solution/fan-zhuan-lian-biao-liang-chong-shi-xian-sk9y/)


## 代码实现

1 方法1: 迭代法  时间复杂度: O(n);  空间复杂度(1)
```ts
function reverseList(head: ListNode | null): ListNode | null {
  let pre = null, cur = head
  while (cur) {
    let temp = cur.next
    // 修改当前指针指向前一个
    cur.next = pre
    // 移动pre和cur到下一个节点
    pre = cur
    cur = temp
  }
  // 到最后pre指向的就是原链表的最后一个节点
  return pre
};
```

2 方法2: 递归法  时间复杂度: O(n);  空间复杂度(1)
```ts
function reverseList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  let newHead = reverseList(head.next)
  // 易错点: 如果是让newHead.next指向head，会导致中间节点的丢失
  // 让当前node的下一node，其next指向当前node
  head.next.next = head
  // 让当前node的next断开旧有指向，从而避免循环链表
  head.next = null
  return newHead
};
```