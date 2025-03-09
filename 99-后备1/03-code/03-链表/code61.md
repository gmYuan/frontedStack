# LeetCode61- 旋转链表

## 实现思路

1 实现思路:
  - 1 迭代法1：mod + 环链表 + 步长切断
  - 2 迭代法2：mod + 滑动窗口/快慢指针 

2 参考文档

[01 方法1参考](https://leetcode.cn/problems/rotate-list/solution/bi-he-wei-huan-xuan-zhuan-lian-biao-by-d-3wj1/)

[02 方法2参考](https://leetcode.cn/problems/rotate-list/solution/shou-hui-man-hua-tu-jie-leetcodezhi-xuan-zhuan-lia/)

## 代码实现

方法1: 转化为环 + 步长切断  时间复杂度 O(n)  空间复杂度：O(1)

```ts
function rotateRight(head: ListNode | null, k: number): ListNode | null {
  if (!head || !head.next) return head
  let [len, cur] = getTailAndLen(head)
  // 形成环
  cur.next = head
  // 易错点: 确定截取的步长
  let step = len - (k % len)
  // 获取返回链表头节点的 前一个节点 + 同时切断了环
  while (step--) {
    cur = cur.next
  }
  let res = cur.next
  cur.next = null
  return res
};

function getTailAndLen(head: ListNode): [number, ListNode] {
  let cur = head
  let len = 1
  while (cur.next) {
    cur = cur.next
    len++
  }
  return [len, cur]
}
```

方法2: 快慢指针 + 连环切断  时间复杂度: O(n)  空间复杂度: O(1)

```ts
// 输入：head = [0,1,2], k = 4
// 输出：[2,0,1]
// 即 0,1,2==>  2,0,1==> 1,2,0==> 0,1,2==> 2,0,1

function rotateRight(head: ListNode | null, k: number): ListNode | null {
  // 题目含义: 把 倒数第k%len个节点 移动到原链表头部，返回新的链表头==> 整体思路类似于code19

  if (!head || !head.next) return head
  let slow = head, fast = head
  // S1 获取链表长度
  let len = getLen(head)
  // S2 获取滑动窗口长度 + 设置快慢指针滑动窗口
  let slideN = k % len
  while (slideN) {
    fast = fast.next
    slideN--
  }
  // S3 让fast移动到最后一个节点, slow移动到新的头节点的 前一个节点
  while (fast.next) {
    slow = slow.next
    fast = fast.next
  }
  // S4 变化指针连接，生成新的链表
  fast.next = head
  head = slow.next
  slow.next = null
  // 返回新的头节点
  return head
};

function getLen(head: ListNode) {
  let len = 1
  while (head.next) {
    head = head.next
    len++
  }
  return len
}
```