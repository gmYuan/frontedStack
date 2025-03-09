
# LeetCode143- 重排链表

## 实现思路

1 思维关键词: 
  - 1 迭代法: 获取中点 + 反转右侧链表 + 合并左右链表
  - 2 递归法1: inDeep(head, tail) + 递归后回溯处理法
  - 3 递归法2: mid递归法 + 尾插入法（推荐）
  - 4 递归法3: 后续递归法（推荐）

2 参考文章:

[01 方法1-迭代参考](https://leetcode.cn/problems/reorder-list/solution/dong-hua-yan-shi-kuai-man-zhi-zhen-143-z-4kmk/)

[02 方法2-递归1参考](https://leetcode.cn/problems/reorder-list/solution/yi-ci-di-gui-by-chinatom-k2pr/)

[03 方法3-递归2参考](https://leetcode.cn/problems/reorder-list/solution/di-gui-by-tangming-2-gn0e/)

[04 方法4-递归3参考](https://leetcode.cn/problems/reorder-list/solution/hou-xu-bian-li-by-arima-x-n7tl/)


## 代码实现

1 方法1: 中点反转法  时间复杂度 O(n)  空间复杂度：O(1)

```ts
function reorderList(head: ListNode | null): void {
  // S1 获取中点
  let mid = getMid(head)
  let rightHead = mid.next
  mid.next = null
  // S2 反转右侧链表
  let newRightHead = reverse(rightHead)
  // S3 合并2个链表
  merge(head, newRightHead)
};

function getMid(head) {
  let slow = head, fast = head.next
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  return slow
}

function reverse(head) {
  if (!head || !head.next) return head;
  let pre = null, cur = head
  while (cur) {
    let temp = cur.next
    cur.next = pre
    pre = cur
    cur = temp
  }
  return pre
}

function merge(l1, l2) {
  let dummy = new ListNode(-1)
  let p1 = l1, p2 = l2, cur = dummy, isEven = true
  while (p1 && p2) {
    if (isEven) {
      cur.next = p1
      p1 = p1.next
    } else {
      cur.next = p2
      p2 = p2.next
    }
    cur = cur.next
    isEven = !isEven
  }
  cur.next = p1 ? p1 : p2
  return dummy.next
}
```

2 方法2 inDeep(head, tail) + 递归后回溯处理法   时间复杂度 O(n)  空间复杂度：O(n)

```ts
function reorderList(head: ListNode | null): void {
  inDeep(head, head);
};

function inDeep(head: ListNode| null, tail: ListNode| null): ListNode| null {
  // 如果tail为null，说明已deep到链表尾部，此时需重新连接头节点和尾节点，故返回head
  if (!tail) return head;
  // 一直递归到尾部
  let returnHead = inDeep(head, tail.next);

  // 回溯/归阶段: returnHead即为与tail对应的 正向访问节点
  // 如果returnHead是null，说明整个链表已处理完成，直接返回
  if (!returnHead) return null;

  // 奇数情况：returnHead === tail;  偶数情况: returnHead.next === tail
  // 如果returnHead/returnHead的后继等于tail，说明链表已经调整完成
  // 注意此时 tail就是最终链表的尾节点，next需要为null, 以避免形成环
  if (returnHead === tail || returnHead.next === tail) {
    tail.next = null;
    // 易错点: 需要显式返回null，作为回溯节点returnHead的值，从而表明 链表都被处理了
    return null;
  }

  // 正向头节点指向对应尾部节点 + 尾部节点指向对应的头节点的后一个节点
  let temp = returnHead.next;
  returnHead.next = tail;
  tail.next = temp;
  // 返回当前正向头部的 下一节点
  return temp;
}
```

3 方法3: mid递归法 + 尾插入法   时间复杂度 O(n)  空间复杂度：O(n)

```ts
function reorderList(head: ListNode | null): void {
  slove(head, head.next);
}

function slove(slow, fast) {
  // 链表个数为奇数，处理到达中点
  if (fast == null) {
    let rightHead = slow.next;
    slow.next = null;
    return rightHead;
  } else if (fast.next == null) {
    // 链表个数为偶数，处理到达中点
    let rightHead = slow.next.next;
    slow.next.next = null;
    return rightHead;
  }
  // 把链表拆分为左右2部分，左侧链表节点 依次记作a1/a2/a3, 右侧节点依次记作 b1/b2/b3...
  // 注意在经过递归后，此时[a1,b1]是相对mid对称的，即 a2-a1-mid-b1-b2
  let b1 = slove(slow.next, fast.next.next);
  let a1 = slow, b2 = b1.next;
  b1.next = a1.next;
  a1.next = b1;
  return b2;
}
```