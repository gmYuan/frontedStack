
# LeetCode21- 合并两个有序链表

## 实现思路

1 思维关键词: 
  S1 迭代法: dummy + move
  S2 递归法: 递归也区分为前序中序后序，所以在定义递归含义时，需要结合本轮循环一起考虑

2 参考文章

[01 方法1-官方实现](https://leetcode.cn/problems/merge-two-sorted-lists/solution/he-bing-liang-ge-you-xu-lian-biao-by-leetcode-solu/)

[02 方法2图解](https://leetcode.cn/problems/merge-two-sorted-lists/solution/chao-xiang-xi-tu-jie-di-gui-zhi-xing-guo-cheng-21h/)

## 代码实现

1 方法1: 虚拟头节点  时间复杂度 O(m+n)  空间复杂度O(1)

```ts
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  let dummy = new ListNode()
  let move = dummy
  while (list1 && list2) {
    let curNode
    if (list1.val <= list2.val) {
      curNode = list1
      list1 = list1.next
    } else {
      curNode = list2
      list2 = list2.next
    }
    move.next = curNode
    move = move.next
  }
  move.next = list1 ? list1 : list2
  return dummy.next
};
```

2 方法2: 递归实现，时间复杂度 O(m+n)  空间复杂度O(m+n)
```ts
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  // S3 递归中止条件：返回还有节点的子链表头节点即可
  if (!list1 || !list2) {
    return list1 ? list1 : list2
  }

  // S1 递归定义: 合并了2个有序子链表
  // S2 本轮操作: 让2个链表中的当前值较小的节点，指向排好序的子链表即可
  //    注意：本轮操作的子链表，需要排除掉当前节点
  if (list1.val <= list2.val){
    list1.next = mergeTwoLists(list1.next, list2)
    return list1
  } else {
    list2.next = mergeTwoLists(list1, list2.next)
    return list2
  }
}
```