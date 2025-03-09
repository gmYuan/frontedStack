# LeetCode234- 回文链表

## 实现思路

1 思维关键词: 

  1 迭代法1: 快慢指针 + 反转左侧节点 + 比较左右节点

  2 迭代法2: getMid() + newH2 = reverse(h2) + compare(left1, right1)

  3 递归法: 全局curLeft + helper(head.next)递归


2 参考文章:

[01 方法1参考](https://leetcode.cn/problems/palindrome-linked-list/solution/wo-de-kuai-man-zhi-zhen-du-cong-tou-kai-shi-gan-ju/)

[02 方法2参考](https://leetcode.cn/problems/palindrome-linked-list/solution/hui-wen-lian-biao-by-leetcode-solution/)

[03 方法3参考](https://leetcode.cn/problems/palindrome-linked-list/solution/234-hui-wen-lian-biao-by-jue-qiang-zha-z-2x29/)


## 代码实现

1 方法1: 快慢指针 + 反转左侧节点 + 比较左右节点  时间复杂度 O(n)  空间复杂度：O(1)

```ts
function isPalindrome(head: ListNode | null): boolean {
  if(!head || !head.next) return true;
  let slow = head, fast = head
  let pre = null, prepre = null
  while (fast && fast.next) {
    //S1 移动快慢指针 + 移动慢指针的前一个节点pre
    pre = slow;
    slow = slow.next;
    fast = fast.next.next;
    //S2 反转慢指针（即反转左半部分节点）
    pre.next = prepre;
    prepre = pre;
  }
  //S3 存在fast,则链表个数为偶数，这时slow指向的是中间节点
  // 为了让slow指向右侧头节点，所以需要后移一位
  // 反之 不存fast,则链表个数为奇数，此时slow已经指向右侧头节点
  if(fast) {
    slow = slow.next
  }
  //S4 此时slow同时也是 右半部分的头节点
  while(pre && slow) {
    if(pre.val != slow.val) return false;
    pre = pre.next;
    slow = slow.next;
  }
  return true;
};
```

2 方法2: 中点反转法  时间复杂度 O(n)  空间复杂度：O(1)

```ts
function isPalindrome(head: ListNode | null): boolean {
  if (!head || !head.next) return true
  // S1  获取到中点链表节点 + 右侧部分头节点
  const mid = getMid(head)
  let h2 = mid.next
  // S2 断开链表
  mid.next = null

  // S3 反转右侧链表
  let newH2 = reverse(h2)
  // S4 逐个比较左边链表 和 右边链表 每个节点是否相等
  while (head && newH2) {
    if (head.val !== newH2.val) return false
    head = head.next
    newH2 = newH2.next
  }
  return true
};

// 获取链表中间节点
function getMid(head: ListNode) {
  let slow = head, fast = head.next
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  return slow
}

// 反转链表节点
function reverse(head: ListNode) {
  if (!head || !head.next) return head;
  let newHead = reverse(head.next)
  head.next.next = head
  head.next = null
  return newHead
}
```

3 方法3: 递归回溯法  时间复杂度 O(n)  空间复杂度：O(n)

```ts
let curLeft: ListNode

function isPalindrome(head: ListNode | null): boolean {
  curLeft = head
  return helper(head)
};

function helper(head) {
  // 递归定义： 判断是否是 回文链表
  // 递归终止条件
  if (!head) return true
  // 递阶段： 更新head值; 归阶段：比较head和curLeft是否相等 + 更新curLeft值
  let res = helper(head.next)
  if (curLeft.val !== head.val) return false
  curLeft = curLeft.next
  // 返回单次 递归的结果
  return res
}
```

4 方法4: Hash法，没看懂，留做备份

[Hash法](https://leetcode.cn/problems/palindrome-linked-list/solution/ha-xi-bian-li-yi-ci-jiu-xing-by-tcan1993/)

