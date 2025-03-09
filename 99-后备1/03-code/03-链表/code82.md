
# LeetCode82- 删除排序链表中的重复元素II

## 实现思路

1 思维关键词: 

  S1 迭代法: dummy + pre + cur && cur.next

  S2 递归法: 先序递归 + head && head.next + while-move节点

2 参考文章

[01 方法1-官方实现](https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/solution/shan-chu-pai-xu-lian-biao-zhong-de-zhong-oayn/)

[02 方法2-递归实现图解](https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/solution/fu-xue-ming-zhu-di-gui-die-dai-yi-pian-t-wy0h/)


## 代码实现

1 方法1: 虚拟头节点，时间复杂度 O(n)  空间复杂度O(1)

```ts
function deleteDuplicates(head: ListNode | null): ListNode | null {
  let dummy = new ListNode(-1, head)
  let pre = dummy // 指向当前处理节点的前1个节点
  let cur = head
  // 易错点1：依赖cur和cur.next进行取值判断，以保证pre.next不会包含cur本身
  while (cur && cur.next) {
    // 更新pre和cur的指向即可
    if (cur.val !== cur.next.val) {
      pre = cur
      cur = cur.next   
    } else {  
      const val = cur.val
      // 易错点2: 当链表内都是重复元素时，此时cur可能会被更新到null
      while (cur?.val === val) {
        cur = cur.next
      }
      pre.next = cur
    }
  }
  return dummy.next
};
```

2 方法2: 递归实现  时间复杂度 O(n)  空间复杂度O(n)
```ts
function deleteDuplicates(head: ListNode | null): ListNode | null {
  // S1 递归定义： 返回排好序+去重后的新链表 头节点
  // 如果一开始就是重复元素，需要在一开始就进行去重，所以是先序递归
  // 先序递归，就不能依赖newHead，而是只能依靠head和head.next

  // S3 递归中止条件
  if (!head || !head.next)  return head;

  if (head.val !== head.next.val) {
    //S2.1 本轮操作：保留当前head节点必须 + 继续去重head.next节点开头的链表
    head.next = deleteDuplicates(head.next)
    return head
  } else {
    //S2.2 一直移动到当前重复值的下一个节点位置，然后再尝试去重
    let val = head.val
    let move = head.next
    // 易错点: move由于是当前head.next，当都是重复节点情况下，move可能是null
    while (move?.val === val) {
      move = move.next
    }
    return deleteDuplicates(move)
  }
};

```
