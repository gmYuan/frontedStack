
# LeetCode19- 删除链表的倒数第N个结点

## 实现思路

1 实现思路:
  - 1 迭代法：滑动窗口/快慢指针 
  - 2 递归法: 后序递归法


2 参考文档

[01 方法1参考](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/solution/shan-chu-lian-biao-de-dao-shu-di-nge-jie-dian-b-61/)

[02 方法2参考](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/solution/san-chong-fang-fa-shan-chu-dao-shu-di-nge-jie-dian/)

## 代码实现

方法1: 滑动窗口/快慢指针  时间复杂度 O(n)  空间复杂度：O(1)

```ts
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let dummy = new ListNode(-1, head)
  let slow = dummy, fast = dummy
  // 根据n + 快满指针 形成的滑动窗口==> 当fast为null时，slow为待删除节点的 前一个节点
  for (let i = 0; i < n + 1; i++) {
    fast = fast.next
  }
  while (fast) {
    slow = slow.next 
    fast = fast.next
  }
  // 删除节点
  slow.next = slow.next.next
  return dummy.next
};
```

方法2: 后序递归法   时间复杂度 O(n)  空间复杂度：O(n)

```ts
let count: number
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  if (!head)  {
    count = 0
    return head
  }
  head.next = removeNthFromEnd(head.next, n)
  count += 1
  return count === n ? head.next : head
};
```

