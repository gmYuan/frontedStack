
# LeetCode203- 移除链表元素

1 思维关键词: 

S1 迭代法: dummy + tmep.next

S2 递归法: 是否连接本轮head

2 参考文档

[01 方法参考](https://leetcode.cn/problems/remove-linked-list-elements/solution/203yi-chu-lian-biao-yuan-su-by-lewis-dxstabdzew/)


## 代码实现

1 方法1: 虚拟头节点，时间复杂度 O(n)  空间复杂度O(1)

```ts
function removeElements(head: ListNode | null, val: number): ListNode | null {
  let dummy = new ListNode(-1, head)
  let pre = dummy
  // 注意点1: 由于pre每次只会后移1位，所以必然会保证pre有值
  // 只需要看pre.next是否存在，即可判断是否到达 最后一个节点了
  while (pre.next) {
    // 删除链表节点的关键，是找到待删除节点的前一个节点，所以需要判断pre.next值
    if (pre.next.val === val) {
      pre.next = pre.next.next
    } else {
      // 易错点1: 只有下一个节点值v1不等于val时，pre的下一个节点才应该是保留的，此时pre才应该向后移动；
      // 如果v1和val相等，在断开v1的连接后，当前pre节点不应该后移，否则pre的指针就会指向等于val的值， 如 [7,7,7,7]的情况
      pre = pre.next
    }
  }
  return dummy.next
};
```

2 方法2: 递归法  时间复杂度 O(n)  空间复杂度O(n)

```ts
function removeElements(head: ListNode | null, val: number): ListNode | null {
  if (!head) return null
  // 递归定义：返回了节点值不为val的新链表的 头节点
  if (head.val === val) {
    return removeElements(head.next, val)
  } else {
    head.next = removeElements(head.next, val)
  }
  return head
};
```