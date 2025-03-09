# LeetCode92- 反转链表II

## 实现思路

1 思维关键词: 
  S1 迭代法: dummy; 头插法(anchor/ preMove/ willMove变量含义)

2 参考文章

[01 迭代法官方实现，流程图比较清晰](https://leetcode.cn/problems/reverse-linked-list-ii/solution/fan-zhuan-lian-biao-ii-by-leetcode-solut-teyq/)

[02 递归解法理解-有助于深入理解递归](https://leetcode.cn/problems/reverse-linked-list-ii/solution/yi-bu-yi-bu-jiao-ni-ru-he-yong-di-gui-si-lowt/)


## 代码实现

1 方法1: 迭代法: dummy+头插法   时间复杂度: O(n);  空间复杂度(1)
```ts
function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
  // 技巧1: 虚拟头节点，避免如果要反转头部的复杂情况讨论
  let dummy = new ListNode(-1)
  dummy.next = head
  let anchor = dummy, preMove = dummy.next
  for (let i = 1; i < left; i++) {
    // anchor: 始终指向 left的前一个节点
    anchor = anchor.next
    // preMove: 始终指向 每轮循环中待移动节点的前一个节点
    preMove = preMove.next
  }

  // 技巧2: 反转技巧==> 头插入法
  for (let i = left; i < right; i++) {
    //S1 本轮待移动节点，它在本轮循环移动后，必然是anchor节点的 下一个节点
    let willMove = preMove.next
    //S2 让本轮移动的前一个节点，指向下一轮待移动的节点，以保持变量含义
    preMove.next = willMove.next
    //S3 让本轮移动节点的下一个，必然指向上一轮的头节点
    willMove.next = anchor.next
    //S4 让锚点指向 本轮移动/头插的节点
    anchor.next = willMove
  }
  return dummy.next
};
```

2 方法2: 递归法  时间复杂度: O(n);  空间复杂度(n)

```ts
let successor = null
function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
  //S3 递归终止条件：相当于是 反转了链表的前n个节点，返回最新的头节点
  if (left === 1) {
    return reverseTopN(head, right)
  }
  //S1 递归含义：反转一个链表的部分节点，返回反转后的新头节点
  let newHead = reverseBetween(head.next, left-1, right-1)
  //S2.1 本轮操作：反转了部分节点后，让当前节点连接已经反转好的新链表头即可
  head.next = newHead
  //S2.2 返回拼接了本轮head的全规模链表，就是最终结果
  return head
};

// 反转了链表的前n个节点，返回最新的头节点
function reverseTopN(head: ListNode, n: number) {
  // S3 处理递归中止条件
  if (n === 1) {
    successor = head.next
    return head
  }
  //S1 缩小为 子规模
  let orginLast = reverseTopN(head.next, n-1)
  //S2 本轮数据处理
  head.next.next = head
  head.next = successor
  return orginLast
}
```