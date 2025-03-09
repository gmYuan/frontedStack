# LeetCode237- 删除链表中的节点

## 实现思路

1 思维关键词: 
  - 1 复制伪造：后值复制 + 后节点跳过

2 参考文章:

[01 方法1参考](https://leetcode.cn/problems/delete-node-in-a-linked-list/solution/shan-chu-lian-biao-zhong-de-jie-dian-by-x656s/)


## 代码实现

1 方法1: 复制伪造  时间复杂度 O(1)  空间复杂度：O(1)

```ts
function deleteNode(node: ListNode | null): void {
  // 让当前节点值等于下一个节点值，这样就有2个相同值节点
  node.val = node.next.val
  // 跳过 当前节点的 下一个重复值节点，这样就相当于删除了旧的本节点
  node.next = node.next.next
};
```