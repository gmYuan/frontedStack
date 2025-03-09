# LeetCode2- 两数相加

## 实现思路

1 思维关键词: %求余 + math.floor求carry + 虚拟头节点

2 参考文档

[01 方法1参考](https://leetcode.cn/problems/add-two-numbers/solution/hua-jie-suan-fa-2-liang-shu-xiang-jia-by-guanpengc/)

[02 方法2参考](https://leetcode.cn/problems/add-two-numbers/solution/di-gui-si-lu-jian-dan-dai-ma-duan-by-dnanki/)


## 代码实现

1 方法1: 迭代  时间复杂度: O(n);  空间复杂度(1)

```ts
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  let dummy = new ListNode(0)
  let curNode = dummy
  let carry = 0
  while (l1 || l2 || carry) {
    // 计算值
    const total = (l1?.val || 0) + (l2?.val || 0) + carry
    carry = Math.floor(total / 10)
    // 更新当前节点值，由于有一个虚拟头节点，所以当前真实节点是 curNode.next
    curNode.next = new ListNode(total % 10)
    // 移动节点
    curNode = curNode.next
    l1 = l1?.next
    l2 = l2?.next
  }
  return dummy.next
};
```

2 方法2: 递归法  时间复杂度: O(n);  空间复杂度(n)

```ts
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  return getNodeVal(l1, l2, 0)
};

// 递归含义：计算了和并返回了当前节点
function getNodeVal (node1: ListNode, node2: ListNode, carry: number) {
  if (!node1 && !node2 && !carry) return null
  let total = (node1?.val || 0) + (node2?.val || 0) + carry
  const curNode = new ListNode(total % 10)
  carry = Math.floor(total / 10)
  curNode.next = getNodeVal(node1?.next, node2?.next, carry)
  return curNode
}
```