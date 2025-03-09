
# LeetCode147- 对链表进行插入排序

## 实现思路

1 思维关键词: 
  - 1 迭代法: pre & cur双层循环 + lastSorted更新

2 参考文章:

[01 方法1参考](https://leetcode.cn/problems/insertion-sort-list/solution/dui-lian-biao-jin-xing-cha-ru-pai-xu-by-leetcode-s/)


## 代码实现

1 方法1: 虚拟头节点，时间复杂度 O(n^2)  空间复杂度O(1)

```ts
function insertionSortList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head

  let dummy = new ListNode(null, head)
  // lastSorted指向 当前已排好序链表[left, right]的 right节点
  // cur指向 当前正在处理的节点，每轮排序开始时 它一定是lastSorted的 后一个节点
  let lastSorted = head, cur = head.next;

  // 处理当前节点的排序
  while (cur) {
    // S1 定位lastSorted到已排序的最后一个节点
    if (lastSorted.val <= cur.val) {
      lastSorted = lastSorted.next
    } else {
      // pre 表示已排好序的链表中, cur节点的 前一个节点
      let pre = dummy
      while (pre.next.val <= cur.val) {
        pre = pre.next
      }
      // S2 在原链表中 删掉这个待插入节点
      lastSorted.next = cur.next
      // S4 插入这个节点到正确的排序位置
      cur.next = pre.next
      pre.next = cur
      
    }
    cur = lastSorted.next;
  }
  return dummy.next
};
```