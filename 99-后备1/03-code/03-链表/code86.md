
# LeetCode86- 分隔链表

1 思维关键词: 

S1 迭代法: 双dummy + 最后一个节点置为null

2 参考文档

[01 官方参考实现](https://leetcode.cn/problems/partition-list/solution/fen-ge-lian-biao-by-leetcode-solution-7ade/)

[02 递归实现参考](https://leetcode.cn/problems/partition-list/solution/java-di-gui-100-by-programmery-jvai/)

## 代码实现

1 方法1: 双dummy + 最后一个节点置为null  时间复杂度: O(n);  空间复杂度: O(1)

```ts
function partition(head: ListNode | null, x: number): ListNode | null {
   // 虚拟头节点
  let dummyLess = new ListNode(), dummyMore = new ListNode()
  let curLess = dummyLess, curMore = dummyMore
  // 易错点1: 如果是 head && head.next，就会遗漏最后一个节点
  while (head) {
    if (head.val < x) {
      curLess.next = head
      curLess = head
    } else {
      curMore.next = head
      curMore = head
    }
    head = head.next
  }
  // 易错点2: 需要把最后一个大于等于的节点置未空，以防有多余的循环节点 
  curMore.next = null
  curLess.next = dummyMore.next
  return dummyLess.next
}
```

