
# LeetCode23- 合并K个升序链表

## 实现思路

1 思维关键词: 
  - 1 归并分治-递归法: mid + midMerge() + mergeTwoLink()
  - 3 归并分治-迭代法: needMergeLen(lok减少) + mergedIndex + mergeTwoLink()

  - 2 优先队列： todo
  

2 参考文章:

[01 归并分治-递归法](https://leetcode.cn/problems/merge-k-sorted-lists/solution/he-bing-k-ge-pai-xu-lian-biao-by-user9827r/)



## 代码实现

1 方法1: 分治合并-递归实现 时间复杂度 O(nk * logk)  空间复杂度O(logk)

```ts
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (!lists || !lists.length) return null
  return midMerge(lists, 0, lists.length - 1)
};

// 合并(排序) [left, right]范围内的 多个已排序链表
function midMerge(lists: Array<ListNode | null>, left: number, right:number): ListNode {
  // 递归定义: 合并 [left, right]范围内的 多个已排序链表(火车)

  // S1 递归中止条件：只有1条链表，直接返回该排序链表即可
  if (left === right) return lists[left];

  // S2.1 本轮操作1：不断二分减少 要合并的火车个数，并返回已经 合并好的火车
  let mid = (left + right) >> 1
  const leftPart = midMerge(lists, left, mid)
  const rightPart = midMerge(lists, mid+1, right)
  // S2.2 本轮操作2：合并2个有序链表，并返回新的头结点
  return mergeTwoLink(leftPart, rightPart)
}

// 合并2个有序链表
function mergeTwoLink(l1: ListNode | null, l2: ListNode | null) {
  if (!l1 || !l2) return l1 || l2;
  if (l1.val <= l2.val) {
    l1.next = mergeTwoLink(l1.next, l2)
    return l1
  } else {
    l2.next = mergeTwoLink(l1, l2.next)
    return l2
  }
}
```

方法2: todo 优先队列




方法3: 分治合并-迭代实现 时间复杂度 O(kn * logk)  空间复杂度O(logk)

```ts
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (!lists || !lists.length) return null
  // 自底向上分治合并：每2个为单位（步长）进行合并，每次合并都把后一个链表，合并到前一个链表中
  
  // 当前待合并处理的 链表个数，随着自底向上合并，needMergeLen会以每次logk 减小
  let needMergeLen = lists.length

  // 待合并处理的链表数量大于1条时
  while (needMergeLen > 1) {
    // 每轮归并时，已经归并后的链表个数，它同时也是下一轮归并时，待处理的链表个数
    let mergedIndex = 0
    for (let i = 0; i < needMergeLen; i+=2) {
      // 每轮分治如果 最后剩余1个单独链表，作为单独的1组链表 返回即可
      if (i === needMergeLen - 1) {
        lists[mergedIndex] = lists[i]
        mergedIndex++
      } else {
        lists[mergedIndex] = mergeTwoLink(lists[i], lists[i+1])
        mergedIndex++
      }
    }
    needMergeLen = mergedIndex
  }
  // 最后归并的结果，都在第1个链表里
  return lists[0]
};

function mergeTwoLists(l1: ListNode, l2: ListNode): ListNode {
  let dummy = new ListNode();
  let pre = dummy
  while (l1 && l2) {
    if (l1.val < l2.val) {
      pre.next = l1;
      l1 = l1.next;
    } else {
      pre.next = l2;
      l2 = l2.next;
    }
    pre = pre.next;
  }
  pre.next = l1 ? l1 : l2;
  return dummy.next;
}
```