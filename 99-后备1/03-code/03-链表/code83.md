
# LeetCode83- 删除排序链表中的重复元素

## 实现思路

1 思维关键词: 

  S1 迭代法: dummy + pre + cur && cur.next

  S2 递归法: head && head.next + deleteDuplicates(head.next)

2 参考文章:

[01 所有方法参考](https://leetcode.cn/problems/remove-duplicates-from-sorted-list/solution/83-shan-chu-pai-xu-lian-biao-zhong-de-zhong-fu-21/)


## 代码实现

1 方法1: 迭代法  时间复杂度: O(n) 空间复杂度: O(1)

```ts
function deleteDuplicates(head: ListNode | null): ListNode | null {
  let dummy = new ListNode(-1, head)
  let pre = dummy
  let cur = head
  // 易错点1: 如果是 cur && cur.next，那么就不会处理最后1个重复元素
  while (cur) {
    // 易错点2: 由于cur.next可能是null，所以需要?.val
    if (cur.val === cur.next?.val) {
      cur = cur.next
    } else {
      pre.next = cur
      // 易错点3: 需要同时更新pre 和 cur
      pre = cur  
      cur = cur.next
    }
  }
  return dummy.next 
};
```

2 方法2: 递归法  时间复杂度: O(n)  空间复杂度: O(n)

```ts
function deleteDuplicates(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head   
    // 递归定义：删除了重复节点后的链表，并返回了头节点
    head.next = deleteDuplicates(head.next)
    // 比较当前head的值和删除重复后的链接头值是否相等
    return head.val === head.next.val ? head.next : head
};
```